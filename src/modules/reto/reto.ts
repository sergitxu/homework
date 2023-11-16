import { Juego, homeWork } from "../../main";
import { getRandomElements, mostrar, randomNumber } from "../generic";
import { calcular } from "../math";
import { cosas } from "./retoData";
import { Genero } from "./retoEnum";

export let valor_a_reto: number;
export let valor_b_reto: number;
export let operacion_reto: string = "+";

export function crearReto() {
    homeWork.juegoActual = Juego.Reto;
    mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);

    addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && homeWork.juegoActual === Juego.Reto) {
            e.preventDefault();
            calcular(valor_a_reto, valor_b_reto, operacion_reto);
        }
    });

    homeWork.mostrarRecord();

    let nombres: string[] = ['Jon', 'Adri', 'Yago', 'Jacob', 'Asher', 'Enzo', 'Ginebra', 'Eva', 'Daniela', 'Antonio', 'Maria',
        'Xabi', 'Alba', 'Sophie', 'Valentina', 'Carla', 'Salomé', 'Jaime', 'Nicholas', 'Eva', 'Boris', 'Diana', 'Marina', 'Alex',
        'Sergio', 'David', 'Leonor', 'Bruna', 'Alaia', 'Sofía', 'Ángela', 'Nor', 'Sarah', 'Valeria', 'David', 'Manuel', 'Paula',
        'Fiorella', 'Martín', 'Noha', 'Samuel', 'Gabriel', 'Alicia', 'Sebastián', 'Noa', 'Ignacio', 'Emma'];

    let nombres_elegidos = getRandomElements(nombres, 2);

    let nombre_a = nombres_elegidos[0];
    let nombre_b = nombres_elegidos[1];

    let cosa_x = cosas[randomNumber(cosas.length)];

    let operacionAzar: number = randomNumber(2);
    valor_a_reto = randomNumber(11);

    if (operacionAzar === 0) {
        operacion_reto = "+";
        valor_b_reto = randomNumber(11);
    } else {
        operacion_reto = "-";
        valor_a_reto = randomNumber(11, 2);
        valor_b_reto = randomNumber(valor_a_reto, 1);
    }

    homeWork.zonaJuego!.innerHTML = `
    ${nombre_a} tiene <span class="puntos-numero">${valor_a_reto}</span> 
    `
    if (valor_a_reto === 1) {
        homeWork.zonaJuego!.innerHTML += `
        ${cosa_x.nombre_singular}.
        `
    } else {
        homeWork.zonaJuego!.innerHTML += `
        ${cosa_x.nombre_plural}.
        `
    }

    if (operacion_reto === '+') {
        homeWork.zonaJuego!.innerHTML += `
        <br>
        ${nombre_b} le da <span class="puntos-numero">${valor_b_reto}</span>.
        `
    } else if (operacion_reto === '-') {
        homeWork.zonaJuego!.innerHTML += `
        <br>
        Pierde <span class="puntos-numero">${valor_b_reto}</span>.
        `
    } else (
        console.error('No sé que operación es esa.')
    )

    if (cosa_x.genero === Genero.masculino) {
        homeWork.zonaJuego!.innerHTML += `<br>¿Cuántos`
    } else {
        homeWork.zonaJuego!.innerHTML += `<br>¿Cuántas`
    }

    homeWork.zonaJuego!.innerHTML += `
    ${cosa_x.nombre_plural} tiene ahora ${nombre_a}?
    
    <form id="calculo">
        <input type="number" id="input-respuesta" name="respuesta" class="respuesta">
        <button type="button" id="boton-calcular" class="boton-calcular">&#9166;</button>
    </form>
    `;

    document.getElementById(`boton-calcular`)?.addEventListener("click", () => {
        calcular(valor_a_reto, valor_b_reto, operacion_reto);
    });

    document.getElementById(`input-respuesta`)?.focus();
}
