function zeroPad(num: number): string {
    return String(num).padStart(2, '0');
}

function timeConverter(timeInSec: number): { h: string, m: string, s: string } {
    const hours = Math.floor(timeInSec / 3600);
    const minutes = Math.floor((timeInSec % 3600) / 60);
    const seconds = timeInSec % 60;

    const formattedHours = zeroPad(hours);
    const formattedMinutes = zeroPad(minutes);
    const formattedSeconds = zeroPad(seconds);

    return {
        h: formattedHours,
        m: formattedMinutes,
        s: formattedSeconds
    };
}

function toKebabCase(str: string) {
    return str
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2') // Add hyphen before uppercase letters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase(); // Convert the entire string to lowercase
}

const playAlarm = (url: string, onEnded?: () => void) => {
    const audio = new Audio(url);
    audio.loop = false;
    audio.volume = 1;
    if (onEnded) {
        audio.addEventListener("ended", onEnded);
    }

    audio.play()
        .then(() => {
            console.log("Sound is playing...");
        })
        .catch((error) => {
            console.error("Cannot play sound:", error);
        });
};


export { timeConverter, toKebabCase, zeroPad, playAlarm }