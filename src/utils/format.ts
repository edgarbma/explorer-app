import type { Country } from "../types/country";

export function getCapital(country: Country): string {
    if (!country.capitals || country.capitals.length === 0) {
        return "N/A";
    }

    // Si capitals es un arreglo de objetos { name: string }
    const firstCapital = country.capitals[0];
    if (typeof firstCapital === "object" && firstCapital !== null && "name" in firstCapital) {
        return (firstCapital as { name: string }).name;
    }

    // Si en algunos países viene como string directo
    if (typeof firstCapital === "string") {
        return country.capitals.join(", ");
    }

    return "N/A";
}

export function formatPopulation(population?: number): string {
    if (population === undefined || population === null) return "N/A";
    return new Intl.NumberFormat().format(population);
}

export function getFlagDescription(country: Country): string {
    if (country.flag?.description) return country.flag.description;
    return `Flag of ${country.names?.common ?? "country"}`;
}

export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}