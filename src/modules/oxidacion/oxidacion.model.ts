export enum ElementoTipo {
    'metal', 'no metal'
}

export interface Elemento {
    tipo: ElementoTipo,
    nombre: string,
    simbolo?: string,
    num_oxidacion: string
}