import type { Country } from "../types/country";

export function filterCountries(
    countries: Country[],
    query: string,
    region: string,
): Country[] {
    
    const normalizedQuery: string = query
    .trim()
    .toLowerCase();
    const normalizedRegion: string = region
    .trim()
    .toLowerCase()

    return countries.filter(
        (country: Country): boolean => {

            const countryName: string =
            country.names.common.toLowerCase();

            const matchesName: boolean =
            countryName.includes(normalizedQuery);

            const countryRegion: string =
            country.region.toLowerCase();

            const matchesRegion: boolean = 
            normalizedRegion === "" || countryRegion === normalizedRegion;

            return matchesName && matchesRegion 
        }
    )
}