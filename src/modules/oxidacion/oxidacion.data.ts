import { Elemento, ElementoTipo } from "./oxidacion.model";

export let elementos: Elemento[] = [
    {
        tipo: ElementoTipo.metal,
        nombre: 'Litio',
        simbolo: 'Li',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Sodio',
        simbolo: 'Na',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Potasio',
        simbolo: 'K',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Rubidio',
        simbolo: 'Rb',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cesio',
        simbolo: 'Cs',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Francio',
        simbolo: 'Fr',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Plata',
        simbolo: 'Ag',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Amonio',
        simbolo: 'NH4',
        num_oxidacion: '1'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Berilio',
        simbolo: 'Be',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Magnesio',
        simbolo: 'Mg',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Calcio',
        simbolo: 'Ca',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Estroncio',
        simbolo: 'Sr',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Bario',
        simbolo: 'Ba',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Radio',
        simbolo: 'Ra',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cinc',
        simbolo: 'Zn',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cadmio',
        simbolo: 'Cd',
        num_oxidacion: '2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Aluminio',
        simbolo: 'Al',
        num_oxidacion: '3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cobre',
        simbolo: 'CU',
        num_oxidacion: '1 2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Mercurio',
        simbolo: 'Hg',
        num_oxidacion: '1 2'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Oro',
        simbolo: 'AU',
        num_oxidacion: '1 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cromo',
        simbolo: 'Cr',
        num_oxidacion: '2 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Manganeso',
        simbolo: 'Mn',
        num_oxidacion: '2 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Hierro',
        simbolo: 'Fe',
        num_oxidacion: '2 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Cobalto',
        simbolo: 'Co',
        num_oxidacion: '2 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Níquel',
        simbolo: 'Ni',
        num_oxidacion: '2 3'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Estaño',
        simbolo: 'Sn',
        num_oxidacion: '2 4'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Plomo',
        simbolo: 'Pb',
        num_oxidacion: '2 4'
    },
    {
        tipo: ElementoTipo.metal,
        nombre: 'Platino',
        simbolo: 'Pt',
        num_oxidacion: '2 4'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Hidrógeno',
        simbolo: 'H',
        num_oxidacion: '1 -1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Flúor',
        simbolo: 'F',
        num_oxidacion: '-1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Cloro',
        simbolo: 'Cl',
        num_oxidacion: '1 3 5 7 -1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Bromo',
        simbolo: 'Br',
        num_oxidacion: '1 3 5 7 -1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Yodo',
        simbolo: 'I',
        num_oxidacion: '1 3 5 7 -1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Oxígeno',
        simbolo: 'O',
        num_oxidacion: '-2 -1'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Azufre',
        simbolo: 'S',
        num_oxidacion: '2 4 6 -2'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Selenio',
        simbolo: 'Se',
        num_oxidacion: '2 4 6 -2'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Teluro',
        simbolo: 'Te',
        num_oxidacion: '2 4 6 -2'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Nitrógeno',
        simbolo: 'N',
        num_oxidacion: '1 2 3 4 5 -3'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Fósforo',
        simbolo: 'P',
        num_oxidacion: '1 3 5 -3'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Arsénico',
        simbolo: 'As',
        num_oxidacion: '3 5 -3'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Antimonio',
        simbolo: 'Sb',
        num_oxidacion: '3 5 -3'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Boro',
        simbolo: 'B',
        num_oxidacion: '3 -3'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Bismuto',
        simbolo: 'Bi',
        num_oxidacion: '3 5'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Carbono',
        simbolo: 'C',
        num_oxidacion: '2 4 -4'
    },
    {
        tipo: ElementoTipo["no metal"],
        nombre: 'Silicio',
        simbolo: 'Si',
        num_oxidacion: '4 -4'
    }
];