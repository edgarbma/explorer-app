import type { Country } from "../types/country";

const populationFormatter: Intl.NumberFormat =
        new Intl.NumberFormat("es-SV");

export function formatPopulation(
    population: number
): string {
    return populationFormatter.format(population);
}

export function getCapital(
    country: Country
): string {
    return country.capitals[0]?.name ??
    "Sin capital registrada"
}

export function getFlagDescription(
    country: Country
): string {
    return country.flag.description ||
    `Bandera de ${country.names.common}`;
}

export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
