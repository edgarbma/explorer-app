import type { Country } from "../types/country";
import { renderCountryCard } from "./countryCard";

export function renderCountryGrid(countries: Country[]): string {
    if (countries.length === 0) {
        return `<p class="col-span-full text-center text-text-secondary py-8">No countries found.</p>`;
    }

    return countries
    .map((country: Country) => renderCountryCard(country))
        .join("");
}