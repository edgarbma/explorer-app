import type {  
    Country,
    CountriesResponse,
} from "../types/country";

import { 
    formatPopulation,
    getCapital,
    getFlagDescription,
} from "../utils/format";

export function renderCountryCard(
    country: Country
): string {
    const capital: string =
    getCapital(country);

    const flagDescription: string =
    getFlagDescription(country);

    const formattedPopulation: string =
    formatPopulation(country.population);

    return `
            <article class="group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-orange-500">        
                <div class="h-48 w-full overflow-hidden bg-blue-500 transition-colors duration-300 group-hover:bg-blue-600">           
                    <img 
                        src="${country.flag.url_svg || "/placeholder.svg"}"
                        alt="${flagDescription}" 
                        class="h-full w-full object-cover"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='/placeholder.png';">
                </div>
                <div class="flex flex-col items-center gap-6 p-5 text-center">
                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <h3 class="mb-1 w-full text-lg font-bold text-text-primary">${country.names.common}</h3>

                        <dl class="flex flex-col gap-1 text-sm text-text-secondary">
                            <div class="flex justify-center gap-1">
                                <dt class="font-medium">Region:</dt>
                                <dd>${country.region}</dd>
                            </div>
                            <div class="flex justify-center gap-1">
                                <dt class="font-medium">Capital:</dt>
                                <dd>${capital}</dd>
                            </div>
                            <div class="flex justify-center gap-1">
                                <dt class="font-medium">Population:</dt>
                                <dd>${formattedPopulation}</dd>
                            </div>
                        </dl>
                    </div>
                    <button class="min-h-11 w-full rounded-full bg-orange-500 font-medium text-white transition-all duration-200 hover:bg-orange-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-32">
                        See more
                    </button>
                </div>
            </article>
        `;

}