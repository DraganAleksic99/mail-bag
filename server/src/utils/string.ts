export function capitalizeString([firstLetter, ...rest]: string) {
    return firstLetter.toUpperCase() + rest.join("");
}