import './style.css';
import type { Country } from "./types/country";
import { fetchCountries, fetchCountryByCode } from './api/countries';
import { renderCountryGrid } from "./render/countryGrid";
import { filterCountries } from "./utils/filter";
import { debounce } from './utils/format';
import { renderEmpty, renderError, renderLoading } from "./render/states";
import { renderDetail } from "./render/detail";

/* ---------- Menú ---------- */

const menuButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#menu-toggle");

const mainMenu: HTMLElement | null =
    document.querySelector<HTMLElement>("#main-menu");

const openIcon: SVGElement | null =
    document.querySelector<SVGElement>("#menu-open-icon");

const closeIcon: SVGElement | null =
    document.querySelector<SVGElement>("#menu-close-icon");

function setMenuState(isOpen: boolean): void {
    if (!menuButton || !mainMenu || !openIcon || !closeIcon) {
        return;
    }

    mainMenu.classList.toggle("hidden", !isOpen);
    openIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación",
    );
}

menuButton?.addEventListener("click", () => {
    const isExpanded: boolean = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
});

/* ---------- Elementos de la página ---------- */

const countriesContainer: HTMLElement | null =
    document.querySelector<HTMLElement>("#countries-container");

const countrySearch: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>("#country-search");

const regionFilter: HTMLSelectElement | null =
    document.querySelector<HTMLSelectElement>("#region-filter");

const homeView: HTMLElement | null = document.querySelector<HTMLElement>("#home-view");
const detailView: HTMLElement | null = document.querySelector<HTMLElement>("#detail-view");

/* ---------- Estado ---------- */

let allCountries: Country[] = [];
let isLoadingCountries: boolean = false;

/* ---------- Filtros ---------- */

function applyFilter(): void {
    if (!countriesContainer) return;

    const query: string = countrySearch?.value ?? "";
    const selectedRegion: string = regionFilter?.value ?? "";

    const filteredCountries: Country[] = filterCountries(
        allCountries,
        query,
        selectedRegion,
    );

    if (filteredCountries.length === 0) {
        countriesContainer.innerHTML = renderEmpty(query);
        return;
    }

    countriesContainer.innerHTML = renderCountryGrid(filteredCountries);
}

const debouncedApplyFilter = debounce(applyFilter, 300);
countrySearch?.addEventListener("input", debouncedApplyFilter);
regionFilter?.addEventListener("change", applyFilter);

/* ---------- Carga de países sugeridos ---------- */

async function loadCountries(): Promise<void> {
    if (!countriesContainer) {
        console.error("#countries-container not found.");
        return;
    }

    // Evita peticiones duplicadas si ya hay una en curso
    if (isLoadingCountries) return;
    isLoadingCountries = true;

    countriesContainer.innerHTML = renderLoading();

    try {
        allCountries = await fetchCountries();

        if (allCountries.length === 0) {
            countriesContainer.innerHTML = renderEmpty("");
            return;
        }

        if (countrySearch?.value || regionFilter?.value) {
            applyFilter();
            return;
        }

        countriesContainer.innerHTML = renderCountryGrid(allCountries);
    } catch (error: unknown) {
        const message: string =
            error instanceof Error ? error.message : "Unknown error.";

        console.error("Error loading the countries:", message);

        countriesContainer.innerHTML = renderError(
            "Check your connection and try again.",
        );

        const retryButton: HTMLButtonElement | null =
            document.querySelector<HTMLButtonElement>("#retry-button");

        retryButton?.addEventListener("click", (): void => {
            void loadCountries();
        });
    } finally {
        isLoadingCountries = false;
    }
}

/* ---------- Router (#/ y #/country/XX) ---------- */

async function router(): Promise<void> {
    if (!homeView || !detailView) {
        console.error("Missing #home-view or #detail-view.");
        return;
    }

    const hash: string = window.location.hash;
    
    // Normalizar hash inicial si está vacío o es solo "#"
    if (hash === "" || hash === "#" || hash === "#home") {
        window.location.hash = "#/";
        return;
    }

    const match: RegExpMatchArray | null = hash.match(/^#\/country\/([A-Za-z0-9_-]+)$/);

    // Vista de inicio
    if (hash === "#/" || !match) {
        homeView.classList.remove("hidden");
        homeView.hidden = false;
        detailView.classList.add("hidden");
        detailView.hidden = true;

        if (allCountries.length === 0) {
            await loadCountries();
        }
        return;
    }

    // Vista de detalle
    const code: string = match[1] ?? "";

    homeView.classList.add("hidden");
    homeView.hidden = true;

    detailView.classList.remove("hidden");
    detailView.hidden = false;

    detailView.innerHTML = renderLoading();

    try {
        const country = await fetchCountryByCode(code);
        if (window.location.hash !== hash) return;
        detailView.innerHTML = renderDetail(country);
    } catch (error: unknown) {
        if (window.location.hash !== hash) return;
        console.error("Error loading the country detail:", error);
        detailView.innerHTML =
            renderError("Country cannot be loaded.") +
            '<div class="mt-6 text-center"><a href="#/" class="text-blue-500 underline font-medium">← Go back to countries</a></div>';
    }
}

window.addEventListener("hashchange", () => {
    void router();
});

window.addEventListener("DOMContentLoaded", () => {
    void router();
});