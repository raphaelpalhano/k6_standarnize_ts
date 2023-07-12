import { crypto } from 'k6/experimental/webcrypto';



export function getRandomArbitrary(min: number, max: number) {
    return  Math.round(Math.random() * (max - min) + min);
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


export function randomUuid() {
  return crypto.randomUUID()
}