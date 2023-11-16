export enum Genero {
    masculino, femenino
}

export interface Cosa {
    nombre_singular: string,
    nombre_plural: string,
    genero: Genero
}