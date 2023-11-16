export enum WordTipo {
    colegio, juguetes, colores, numeros, dias, adjetivos, familia, otros
}

export interface EnglishWord {
    tipo: WordTipo,
    texto: string,
    textoEspañol: string,
    imagen?: string,
}
