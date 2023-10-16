class Homework {
    puntos: number = 0;
    VIDAS_INICIALES: number = 5;
    vidas: number = this.VIDAS_INICIALES;
    resultado: number = 0;
    zonaCalculo = document.getElementById('zona-calculo');

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();

        // TODO añadir record personal usando storage

        // Manejo de la tecla enter
        addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calcular();
            }
        });
    }


    actualizarPuntos() {
        document.getElementById('puntos')!.innerText = this.puntos.toString();
    }

    actualizarVidas() {

        document.getElementById('vidas')!.innerHTML = '';

        for (let i = 1; i <= this.vidas; i++) {
            document.getElementById('vidas')!.innerHTML += '&#9733';
        }
        for (let i = 1; i <= this.VIDAS_INICIALES - this.vidas; i++) {
            document.getElementById('vidas')!.innerHTML += '&#9734';
        }

        if (this.vidas === 0) {
            this.gameOver();
        }
    }

    resetearVidasPuntos() {
        this.vidas = this.VIDAS_INICIALES;
        this.puntos = 0;
        this.actualizarVidas();
        this.actualizarPuntos();
    }

    crearOperacion() {
        let operacion: string;
        let operacionAzar: number = this.randomNumber(2);
        let valor_a: number = this.randomNumber(11);
        let valor_b: number;

        if (operacionAzar === 0) {
            operacion = "+";
            valor_b = this.randomNumber(11);
        } else {
            operacion = "-";
            valor_b = this.randomNumber(valor_a);
        }

        this.zonaCalculo!.innerHTML = `
        <form id="calculo">
            <span id="cifra-a" class="cifra">${valor_a}</span>
            <span id="operacion" class="operacion">${operacion}</span>
            <span id="cifra-b" class="cifra">${valor_b}</span>
            <span class="cifra"> = </span>
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="calcular()" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`respuesta`)?.focus();
    }

    calcular() {
        let respuesta: string | number = (<HTMLInputElement>document.getElementById(`respuesta`)).value;

        if (this.vidas > 0 && respuesta) {
            let a: string | number = document.getElementById(`cifra-a`)!.innerText;
            let b: string | number = document.getElementById(`cifra-b`)!.innerText;
            let operacion = document.getElementById(`operacion`)?.innerText;

            a = parseInt(a);
            b = parseInt(b);
            respuesta = parseInt(respuesta);

            if (operacion === '+') {
                this.resultado = a + b;
            }
            else if (operacion === '-') {
                this.resultado = a - b;
            }
            else (
                console.error('No sé que operación es esa.')
            )

            if (respuesta === this.resultado) {
                this.acertar();
            } else {
                this.fallar();
            }
        }
    }

    acertar() {
        alert('BRAVO');
        this.puntos++;
        this.actualizarPuntos();
        this.crearOperacion();
    }

    fallar() {
        document.getElementById(`respuesta`)?.classList.add('error');
        alert('MAL, prueba otra vez.');
        this.vidas--;
        this.actualizarVidas();
    }

    gameOver() {
        alert('GAME OVER');
        (<HTMLInputElement>document.getElementById(`calcularBoton`))!.disabled = true;
        this.mostrar('empezar');
        this.zonaCalculo!.innerHTML += `<p>La respuesta correcta es <span class="resultado-number">${this.resultado}</span>.</p>`
    }

    quitarError() {
        document.getElementById(`respuesta`)?.classList.remove('error');
    }

    randomNumber(lessThan) {
        return Math.floor(Math.random() * lessThan);
    }

    esconder(paraEsconder) {
        document.getElementById(paraEsconder)!.style.display = 'none';
    }

    mostrar(paraMostrar) {
        document.getElementById(paraMostrar)!.style.display = 'inline-block';
    }
};

// Create an instance of the MathGame class
const homeWork = new Homework();
