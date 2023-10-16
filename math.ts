let puntos: number = 0;
let VIDAS_INICIALES: number = 5;
let vidas: number = VIDAS_INICIALES;

const formulario = document.getElementById('calculo');

actualizarPuntos();
actualizarVidas();

// TODO añadir record personal usando storage

// Manejo de la tecla enter
formulario?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        calcular();
    }
});

function actualizarPuntos() {
    document.getElementById('puntos')!.innerText = puntos.toString();
}

function actualizarVidas() {

    document.getElementById('vidas')!.innerHTML = '';

    for (let i = 1; i <= vidas; i++) {
        document.getElementById('vidas')!.innerHTML += '&#9733';
    }
    for (let i = 1; i <= VIDAS_INICIALES - vidas; i++) {
        document.getElementById('vidas')!.innerHTML += '&#9734';
    }

    if (vidas === 0) {
        gameOver();
    }
}

function resetearVidasPuntos() {
    vidas = VIDAS_INICIALES;
    puntos = 0;
    actualizarVidas();
    actualizarPuntos();
}

function crearOperacion() {
    let operacion: string;
    let operacionAzar: number = randomNumber(2);
    let valor_a: number = randomNumber(11);
    let valor_b: number;

    if (operacionAzar === 0) {
        operacion = "+";
        valor_b = randomNumber(11);
    } else {
        operacion = "-";
        valor_b = randomNumber(valor_a);
    }

    formulario!.innerHTML = `
            <span id="cifra-a" class="cifra">${valor_a}</span>
            <span id="operacion" class="operacion">${operacion}</span>
            <span id="cifra-b" class="cifra">${valor_b}</span>
            <span class="cifra"> = </span>
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="quitarError()">
            <button type="button" id="calcularBoton" onclick="calcular()" class="boton-calcular">&#9166;</button>
        `;
    document.getElementById(`respuesta`)?.focus();
}

function calcular() {
    if (vidas > 0) {
        let a: string | number = document.getElementById(`cifra-a`)!.innerText;
        let b: string | number = document.getElementById(`cifra-b`)!.innerText;
        let operacion = document.getElementById(`operacion`)?.innerText;
        let respuesta: string | number = (<HTMLInputElement>document.getElementById(`respuesta`)).value;
        let resultado: number = 0;

        a = parseInt(a);
        b = parseInt(b);
        respuesta = parseInt(respuesta);

        if (operacion === '+') {
            resultado = a + b;
        }
        else if (operacion === '-') {
            resultado = a - b;
        }
        else (
            console.error('No sé que operación es esa.')
        )

        if (respuesta === resultado) {
            acertar();
        } else {
            fallar();
        }
    }
}

function acertar() {
    alert('BRAVO');
    puntos++;
    actualizarPuntos();
    crearOperacion();
}

function fallar() {
    document.getElementById(`respuesta`)?.classList.add('error');
    alert('MAL, prueba otra vez.');
    vidas--;
    actualizarVidas();
}

function gameOver() {
    alert('GAME OVER');
    (<HTMLInputElement>document.getElementById(`calcularBoton`))!.disabled = true;
    mostrar('empezar');
    // TODO añadir resultado correcto
};

function quitarError() {
    document.getElementById(`respuesta`)?.classList.remove('error');
}

function randomNumber(lessThan) {
    return Math.floor(Math.random() * lessThan);
}

function esconder(paraEsconder) {
    document.getElementById(`${paraEsconder}`)!.style.display = 'none';
}

function mostrar(paraMostrar) {
    document.getElementById(`${paraMostrar}`)!.style.display = 'block';
}
