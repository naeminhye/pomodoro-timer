function zeroPad(num: number): string {
    const numString = String(num);
    return numString.padStart(2, '0');
}

function timeConverter(timeInSec: number): { m: number, s: number } {
    return {
        m: Math.floor(timeInSec / 60),
        s: timeInSec % 60
    }
}

function toKebabCase(str: string) {
    return str
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2') // Add hyphen before uppercase letters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase(); // Convert the entire string to lowercase
}

export { timeConverter, toKebabCase, zeroPad }