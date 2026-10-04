import type { Country } from "../types/country";
import { formatPopulation, getCapital, getFlagDescription } from "../utils/format";

export function renderCountryCard(country: Country): string {
    const capital: string = getCapital(country);
    const flagDescription: string = getFlagDescription(country);
    const formattedPopulation: string = formatPopulation(country.population);
//country.flag?.url_svg || "/placeholder.svg"
    
    return `
        <article class="@container group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-orange-500">        
            <div class="flex flex-col @min-[20rem]:flex-col w-full">
                <div class="h-48 w-full shrink-0 overflow-hidden bg-gray-100">
                    <img 
                        src="${country.flag?.url_svg || '/placeholder.png'}"
                        alt="${flagDescription}" 
                        class="h-full w-full object-cover"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='/placeholder.png';">
                </div>                
                <div class="flex min-w-0 flex-1 flex-col justify-between p-5 text-center">
                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <h3 class="mb-1 w-full text-(length:--font-country-name) font-bold text-text-primary">
                            ${country.names?.common ?? "Unknown"}
                        </h3>

                        <dl class="flex flex-col gap-1 text-sm text-text-secondary">
                            <div class="flex gap-1">
                                <dt class="font-medium">Region:</dt>
                                <dd>${country.region ?? "N/A"}</dd>
                            </div>
                            <div class="flex gap-1">
                                <dt class="font-medium">Capital:</dt>
                                <dd>${capital}</dd>
                            </div>
                            <div class="flex gap-1">
                                <dt class="font-medium">Population:</dt>
                                <dd>${formattedPopulation}</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="mt-6 flex justify-center @min-[20rem]:center-start">
                        <a href="#/country/${country.codes?.alpha_2 || 'unknown'}" class="flex h-11 w-full items-center justify-center rounded-full bg-orange-500 font-medium text-white transition-all duration-200 hover:bg-orange-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 sm:w-32">
                            See more
                        </a>
                    </div>
                </div>
            </div>
        </article>
    `;
}