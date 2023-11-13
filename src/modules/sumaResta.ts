import { homeWork, Juego } from "../main";
import { mostrar, randomNumber } from "./generic";
import { calcular } from "./math";

export let valor_a_sumaresta: number = 0;
export let valor_b_sumaresta: number;
export let operacion_sumaresta: string = "+";

export function crearOperacion() {
    homeWork.juegoActual = Juego.SumaResta;
    homeWork.mostrarRecord();
    mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
    let operacionAzar: number = randomNumber(2);
    valor_a_sumaresta = randomNumber(11);

    addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && homeWork.juegoActual === Juego.SumaResta) {
            e.preventDefault();
            calcular(valor_a_sumaresta, valor_b_sumaresta, operacion_sumaresta);
        }
    });

    if (operacionAzar === 0) {
        operacion_sumaresta = "+";
        valor_b_sumaresta = randomNumber(11);
    } else {
        operacion_sumaresta = "-";
        valor_a_sumaresta = randomNumber(11, 2);
        valor_b_sumaresta = randomNumber(valor_a_sumaresta);
    }

    homeWork.zonaJuego!.innerHTML = `
    <form id="calculo">
        <span id="cifra-a" class="cifra">${valor_a_sumaresta}</span>
        <span id="operacion" class="operacion">${operacion_sumaresta}</span>
        <span id="cifra-b" class="cifra">${valor_b_sumaresta}</span>
        <span class="cifra"> = </span>
        <br>
        <input type="number" id="input-respuesta" name="respuesta" class="respuesta">
        <button type="button" id="boton-calcular" class="boton-calcular">&#9166;</button>
    </form>
    `;

    document.getElementById(`boton-calcular`)?.addEventListener("click", () => {
        calcular(valor_a_sumaresta, valor_b_sumaresta, operacion_sumaresta);
    });

    (<HTMLInputElement>document.getElementById(`input-respuesta`))?.focus();
}