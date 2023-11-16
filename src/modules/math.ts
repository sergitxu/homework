import { quitarError } from "./generic";
import { Juego, homeWork } from "../main";
import { crearReto } from "./reto/reto";
import { crearOperacion } from "./sumaResta";

export let resultado: number = 0;

export function calcular(valor_a: number, valor_b: number, operacion: string) {
    (<HTMLInputElement>document.getElementById(`input-respuesta`)).addEventListener("input", () => {
        quitarError();
    });

    let respuesta: string | number = (<HTMLInputElement>document.getElementById(`input-respuesta`)).value;

    if (homeWork.vidas > 0 && respuesta) {

        respuesta = parseInt(respuesta);

        if (operacion === '+') {
            resultado = valor_a + valor_b;
        } else if (operacion === '-') {
            resultado = valor_a - valor_b;
        } else (
            console.error('No sé que operación es esa.')
        )

        if (respuesta === resultado) {
            homeWork.acertar();
            if (homeWork.juegoActual === Juego.SumaResta) {
                crearOperacion();
            } else {
                crearReto();
            }
        } else {
            homeWork.fallar();
        }
    }
}