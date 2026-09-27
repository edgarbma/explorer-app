import './style.css';
import type { Country } from "./types/country";
import { fetchCountries } from './api/countries';
import { renderCountryGrid } from "./render/countryGrid";
import { filterCountries } from "./utils/filter";
import { debounce } from './utils/format';
import { renderEmpty, renderError, renderLoading } from "./render/states";

const INITIAL_VISIBLE_COUNTRIES = 8;   

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
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
});

const countriesContainer: HTMLElement | null =
    document.querySelector<HTMLElement>("#countries-container");

    const countrySearch: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
        "#country-search",
    );

    const regionFilter: HTMLInputElement | null = 
    document.querySelector<HTMLInputElement>(
        "#region-filter",
    );

    let allCountries: Country[] = [];

    const debouncedApplyFilter = debounce(applyFilter, 300);
    countrySearch?.addEventListener("input", debouncedApplyFilter);
    regionFilter?.addEventListener("change", applyFilter);

async function loadCountries(): Promise<void> {
    if (!countriesContainer) {
        console.error("#countries-container not found.");
        return;
    }

    countriesContainer.innerHTML = renderLoading();

    try {
        allCountries = await fetchCountries();

        if (allCountries.length === 0) {
            countriesContainer.innerHTML = renderEmpty("");
            return;
        }

        const initialCountries: Country[] = allCountries.slice(
            0,
            INITIAL_VISIBLE_COUNTRIES
        );
        countriesContainer.innerHTML = renderCountryGrid(initialCountries);

    } catch (error: unknown) {
        const message: string =
            error instanceof Error
                ? error.message
                : "Unknown error.";

        console.error("Error loading the country:", message);

        countriesContainer.innerHTML = renderError(
            "Check your conection and try again."
        );

        const retryButton: HTMLButtonElement | null =
            document.querySelector<HTMLButtonElement>("#retry-button");

        retryButton?.addEventListener("click", (): void => {
            void loadCountries();
        });
    }
}
function applyFilter(): void {
    if (!countriesContainer) return;

    const query: string = countrySearch?.value ?? "";
    const selectedRegion: string = regionFilter?.value ?? "";

    const filteredCountries: Country[] = filterCountries(
        allCountries,
        query,
        selectedRegion
    );

    if (filteredCountries.length === 0) {
        countriesContainer.innerHTML = renderEmpty(query);
        return;
    }

    countriesContainer.innerHTML = renderCountryGrid(filteredCountries);
}

void loadCountries();
