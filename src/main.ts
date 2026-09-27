import './style.css';
import type { Country } from "./types/country";
import { fetchAllCountries } from './api/countries';
import { renderCountryGrid } from "./render/countryGrid";
import { filterCountries } from "./utils/filter";
import { debounce } from './utils/format';

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

    function applyFilter():void {
    if (
        !countrySearch ||
        !regionFilter ||
        !countriesContainer
    ) {
        return;
    }

    const query: string =
    countrySearch.value;

    const region: string =
    regionFilter.value;

    const filteredCountries: Country[]=
    filterCountries(
        allCountries,
        query,
        region,
    );

    countriesContainer.innerHTML =
    renderCountryGrid(filteredCountries);
}

    const debouncedApplyFilter = debounce(applyFilter, 300);
    countrySearch?.addEventListener("input", debouncedApplyFilter);
    regionFilter?.addEventListener("change", applyFilter);

async function loadCountries(): Promise<void> {
    if (!countriesContainer) {
        console.error("No se encontró #countries-container.");
        return;

    } try {
        allCountries = await fetchAllCountries();
        countriesContainer.innerHTML =
        renderCountryGrid(allCountries);

    } catch (error: unknown) {
        const message: string =
            error instanceof Error
            ? error.message
            : "Ocurrio un error desconocido.";
    
        countriesContainer.innerHTML = `
        <p
            class="col-span-full text-center text-red-600"
            role="alert"
        >
            ${message}
        </p>
        `;
    }
}

void loadCountries();