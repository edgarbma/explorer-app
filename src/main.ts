import './style.css';
import type { Country } from "./types/country";
import { fetchCountries } from './api/countries';
import { renderCountryGrid } from "./render/countryGrid";

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

async function loadCountries(): Promise<void> {
    if (!countriesContainer) {
        console.error("No se encontró #countries-container.");
        return;

    } try {
        const countries: Country[] = await fetchCountries();
        countriesContainer.innerHTML = renderCountryGrid(countries);
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
console.error(error);
}}
void loadCountries();