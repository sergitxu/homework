import { Juego, homeWork } from '../../main'
import { mostrar, randomNumber } from '../generic';
import { elementos } from './oxidacionElements';
import { Elemento, ElementoTipo } from './oxidacionEnums';

export let elementoPregunta: Elemento = {
    tipo: ElementoTipo.metal,
    simbolo: '',
    nombre: '',
    num_oxidacion: ''
}

export function oxidacion() {
    homeWork.juegoActual = Juego.Oxidacion;
    homeWork.mostrarRecord();
    mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);

    elementoPregunta = elementos[randomNumber(elementos.length)];

    homeWork.zonaJuego!.innerHTML = `
    <p>¿Cuál es número de oxidación del <span class="puntos-numero">${elementoPregunta.nombre} - ${elementoPregunta.simbolo}</span>?</p>
    `
    homeWork.zonaJuego!.innerHTML += `
    <form id="calculo">
        <input type="text" id="input-respuesta" name="respuesta" class="respuesta respuesta-larga">
        <button type="button" id="boton-calcular-oxidacion" class="boton-calcular">&#9166;</button>
    </form>
    `;

    (<HTMLInputElement>document.getElementById(`boton-calcular-oxidacion`))?.addEventListener("click", () => {
        resolverOxidacion();
    });

    (<HTMLInputElement>document.getElementById(`input-respuesta`))?.addEventListener("input", () => {
        homeWork.quitarError();
    });

    (<HTMLInputElement>document.getElementById(`input-respuesta`))?.focus();
}

export function resolverOxidacion() {
    let respuestaOxidacion: string | number = (<HTMLInputElement>document.getElementById(`input-respuesta`)).value;

    if (homeWork.vidas > 0 && respuestaOxidacion) {
        if (respuestaOxidacion === elementoPregunta.num_oxidacion) {
            homeWork.acertar();
            oxidacion();
        } else {
            homeWork.fallar();
        }
    }
}