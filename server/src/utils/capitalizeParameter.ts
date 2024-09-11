export function capitalizeParameter([firstLetter, ...rest]: string):string {
    const restLetters = rest.join("");
    
    if (firstLetter === "[") {
        return "[" + capitalizeParameter(restLetters);
    }

    if (restLetters.trim().includes(" ")) {
        const [first, second] = (firstLetter + restLetters).split(" ");
        return `${capitalizeParameter(first)} ${capitalizeParameter(second)}`;
    }

    return firstLetter.toUpperCase() + restLetters;
}