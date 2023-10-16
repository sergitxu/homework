class Homework {
    puntos: number = 0;
    VIDAS_INICIALES: number = 5;
    vidas: number = this.VIDAS_INICIALES;
    resultado: number = 0;
    zonaCalculo = document.getElementById('zona-calculo');
    valor_a: number = this.randomNumber(11);
    valor_b: number;
    operacion: string;
    gameOverDialog = (<HTMLDialogElement>document.getElementById('game-over'));
    vidasNumero = document.getElementById('vidas-numero');
    puntosNumero = document.getElementById('puntos-numero');

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();

        // TODO añadir record personal usando storage
        // TODO añadir juego igual / distinto

        addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calcular();
            }
        });
    }


    actualizarPuntos() {
        this.puntosNumero!.innerText = this.puntos.toString();
    }

    actualizarVidas() {

        this.vidasNumero!.innerHTML = '';

        for (let i = 1; i <= this.vidas; i++) {
            this.vidasNumero!.innerHTML += '&#9733';
        }
        for (let i = 1; i <= this.VIDAS_INICIALES - this.vidas; i++) {
            this.vidasNumero!.innerHTML += '&#9734';
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
        let operacionAzar: number = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_b = this.randomNumber(this.valor_a);
        }

        this.zonaCalculo!.innerHTML = `
        <form id="calculo">
            <span id="cifra-a" class="cifra">${this.valor_a}</span>
            <span id="operacion" class="operacion">${this.operacion}</span>
            <span id="cifra-b" class="cifra">${this.valor_b}</span>
            <span class="cifra"> = </span>
            <br>
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="homeWork.calcular()" class="boton-calcular">&#9166;</button>
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
        this.puntos++;
        this.actualizarPuntos();
        this.animar(this.puntosNumero);
        this.sonar('acierto');
        this.crearOperacion();
    }

    fallar() {
        document.getElementById(`respuesta`)?.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        this.animar(this.vidasNumero);
        this.sonar('error');
    }

    gameOver() {
        (<HTMLButtonElement>document.getElementById('calcularBoton'))!.disabled = true;
        this.gameOverDialog?.showModal();
        this.gameOverDialog!.innerHTML = `
        <h1>¡ENHORABUENA!</h1>
        <p>Has conseguido <span class="puntos-numero">${this.puntos}</span> puntos.</p>
        <p>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</p>
        <button id="empezar-de-nuevo" class="empezar"
        onclick="homeWork.crearOperacion();homeWork.resetearVidasPuntos();homeWork.esconder('empezar');homeWork.gameOverDialog.close()">¡Otra vez!</button>
        `
    }

    animar(animado) {
        animado?.classList.add('animar');
        setTimeout(() => {
            animado?.classList.remove('animar');
        }, 1000);

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

    sonar(evento) {
        let random = this.randomNumber(6);
        let audio = new Audio(`sound/${evento}/0${random}.mp3`);
        audio.play();
    }
};

const homeWork = new Homework();
