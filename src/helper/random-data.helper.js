export function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

export function getRandomInt(max) {
    return parseInt(Math.floor(Math.random() * max));
}