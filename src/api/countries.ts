import type {
    Country,
    CountriesResponse,
} from "../types/country";

const API_KEY: string =
    import.meta.env.VITE_REST_COUNTRIES_API_KEY;

    if (!API_KEY) {
        throw new Error(
            "No se encontró la API key de REST Countries."
        );
    }

const BASE_URL: string =
    "https://api.restcountries.com/countries/v5";

const FIELDS: string =
    "names.common,codes.alpha_2,flag.url_svg,flag.description,population,region,capitals";

export async function fetchCountries(): Promise<Country[]> {
    let allCountries: Country[] = [];
    let offset: number = 0;
    const limit: number = 50;
    let hasMore: boolean = true;

    while (hasMore) {
        const url: string =
            `${BASE_URL}?response_fields=${FIELDS}&limit=${limit}&offset=${offset}`;

        const response: Response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(
                `No fue posible obtener los países. Código HTTP: ${response.status}`
            );
        }

        const result: CountriesResponse =
            (await response.json()) as CountriesResponse;

        allCountries = allCountries.concat(result.data.objects);
        hasMore = result.data.meta.more;
        offset += limit;
    }
    return allCountries;
}

