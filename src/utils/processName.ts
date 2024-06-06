export function processName(name: string) {
    const splitName = name.split(" ");
    if (splitName.length === 1) {
        return splitName[0].charAt(0).toUpperCase();
    } else {
        return splitName[0].charAt(0).toUpperCase() + splitName[splitName.length - 1].charAt(0).toUpperCase();
    }
}
