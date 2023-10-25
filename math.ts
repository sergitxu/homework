// TODO añadir juego igual / distinto
// TODO separar código en módulos
// TODO Añadir tests

enum Juego {
    Reto, SumaResta
}
enum Genero {
    masculino, femenino
}

interface Cosa {
    nombre_singular: string,
    nombre_plural: string,
    genero: Genero
}

class Homework {
    juegoActual: Juego;
    puntos: number = 0;
    VIDAS_INICIALES: number = 3;
    AUDIO_CANTIDAD: number = 7;
    vidas: number = this.VIDAS_INICIALES;
    resultado: number = 0;
    zonaCalculo = document.getElementById('zona-calculo');
    valor_a: number = this.randomNumber(11);
    valor_b: number;
    operacion: string;
    gameOverDialog: HTMLDialogElement = (<HTMLDialogElement>document.getElementById('game-over'));
    vidasNumero: HTMLElement | null = document.getElementById('vidas-numero');
    puntosNumero: HTMLElement | null = document.getElementById('puntos-numero');
    hayNuevoRecordPersonal: boolean = false;
    recordPersonal = localStorage.getItem('record');

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();
        this.preloadMP3();
        this.mostrarRecord();

        addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calcular();
            }
        });

        this.gameOverDialog.addEventListener("close", (event) => {
            this.reiniciarJuego();
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

    reiniciarJuego() {
        this.resetearVidasPuntos();
        this.esconder('zona-calculo');
        this.mostrar('empezar');
        this.mostrarRecord();
    }

    mostrarRecord() {
        if (this.recordPersonal) {
            document.getElementById('puntos-record')!.innerText = this.recordPersonal;
            this.mostrar('record');
        }
    }

    calcular() {
        let respuesta: string | number = (<HTMLInputElement>document.getElementById(`respuesta`)).value;

        if (this.vidas > 0 && respuesta) {

            respuesta = parseInt(respuesta);

            if (this.operacion === '+') {
                this.resultado = this.valor_a + this.valor_b;
            } else if (this.operacion === '-') {
                this.resultado = this.valor_a - this.valor_b;
            } else (
                console.error('No sé que operación es esa.')
            )

            if (respuesta === this.resultado) {
                this.acertar();
                if (this.juegoActual === Juego.SumaResta) {
                    this.crearOperacion();
                } else {
                    this.crearReto();
                }
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
    }

    fallar() {
        document.getElementById(`respuesta`)?.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        this.animar(this.vidasNumero);
        this.sonar('error');
    }

    gameOver() {
        this.manejarRecord();
        (<HTMLButtonElement>document.getElementById('calcularBoton'))!.disabled = true;
        this.gameOverDialog?.showModal();
        this.gameOverDialog!.innerHTML = `<h1>¡ENHORABUENA!</h1>`;
        if (this.puntos === 1) {
            this.gameOverDialog!.innerHTML += `<p>Has conseguido <span class="puntos-numero">${this.puntos}</span> punto.</p>`;
        } else {
            this.gameOverDialog!.innerHTML += `<p>Has conseguido <span class="puntos-numero">${this.puntos}</span> puntos.</p>`;
        }
        if (this.hayNuevoRecordPersonal) {
            this.gameOverDialog!.innerHTML += `
            <h2>¡¡Has mejorado tu record personal!!</h2>
            `
        }
        this.gameOverDialog!.innerHTML += `
        <small>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</small><br>
        <form method="dialog">
            <button class="empezar">OK</button>
        </form>
        `
    }

    manejarRecord() {
        if (!this.recordPersonal || this.puntos > Number(this.recordPersonal)) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
            this.recordPersonal = this.puntos.toString();
        } else {
            this.hayNuevoRecordPersonal = false;
        }
    }

    // Retos
    crearReto() {
        this.juegoActual = Juego.Reto;

        let nombres: string[] = ['Jon', 'Adri', 'Yago', 'Jacob', 'Asher', 'Enzo', 'Ginebra', 'Eva', 'Daniela', 'Antonio', 'Maria',
            'Xabi', 'Alba', 'Sophie', 'Valentina', 'Carla', 'Salomé', 'Jaime', 'Nicholas', 'Eva', 'Boris', 'Diana', 'Marina', 'Alex',
            'Sergio', 'David', 'Leonor', 'Bruna', 'Alaia', 'Sofía', 'Ángela', 'Nor', 'Sarah', 'Valeria', 'David', 'Manuel', 'Paula',
            'Fiorella', 'Martín', 'Noha', 'Samuel', 'Gabriel', 'Alicia', 'Sebastián', 'Noa', 'Ignacio', 'Emma'];

        let cosas: Cosa[] = [
            {
                nombre_singular: 'carta pokemon',
                nombre_plural: 'cartas pokemon',
                genero: Genero.femenino
            },
            {
                nombre_singular: 'balón',
                nombre_plural: 'balones',
                genero: Genero.masculino
            },
            {
                nombre_singular: 'Bakugan',
                nombre_plural: 'Bakugans',
                genero: Genero.masculino
            },
            {
                nombre_singular: 'cubo de Rubik',
                nombre_plural: 'cubos de Rubik',
                genero: Genero.masculino
            },
            {
                nombre_singular: 'Superthing',
                nombre_plural: 'Superthings',
                genero: Genero.masculino
            },
            {
                nombre_singular: 'Pokeball',
                nombre_plural: 'Pokeballs',
                genero: Genero.femenino
            },
            {
                nombre_singular: 'muñeca',
                nombre_plural: 'muñecas',
                genero: Genero.femenino
            },
            {
                nombre_singular: 'Bungee',
                nombre_plural: 'Bungees',
                genero: Genero.masculino
            }
        ];

        let nombre_a = nombres[this.randomNumber(nombres.length)];
        let nombres_salvo_nombre_a = nombres.filter(nombre => nombre !== nombre_a);
        let nombre_b = nombres_salvo_nombre_a[this.randomNumber(nombres_salvo_nombre_a.length)];
        let cosa_x = cosas[this.randomNumber(cosas.length)];

        let operacionAzar: number = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a, 1);
        }

        this.mostrar('zona-calculo');

        this.zonaCalculo!.innerHTML = `
        ${nombre_a} tiene <span class="puntos-numero">${this.valor_a}</span> 
        `
        if (this.valor_a === 1) {
            this.zonaCalculo!.innerHTML += `
            ${cosa_x.nombre_singular}.
            `
        } else {
            this.zonaCalculo!.innerHTML += `
            ${cosa_x.nombre_plural}.
            `
        }

        if (this.operacion === '+') {
            this.zonaCalculo!.innerHTML += `
            <br>
            ${nombre_b} le da <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else if (this.operacion === '-') {
            this.zonaCalculo!.innerHTML += `
            <br>
            Pierde <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else (
            console.error('No sé que operación es esa.')
        )

        if (cosa_x.genero === Genero.masculino) {
            this.zonaCalculo!.innerHTML += `<br>¿Cuántos`
        } else {
            this.zonaCalculo!.innerHTML += `<br>¿Cuántas`
        }

        this.zonaCalculo!.innerHTML += `
        ${cosa_x.nombre_plural} tiene ahora ${nombre_a}?
        
        <form id="calculo">
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="homeWork.calcular()" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`respuesta`)?.focus();
    }

    // Operacion de sumas y restas
    crearOperacion() {
        this.juegoActual = Juego.SumaResta;
        let operacionAzar: number = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a);
        }

        this.mostrar('zona-calculo');

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

    // Métodos genéricos
    animar(animado) {
        animado?.classList.add('animar');
        setTimeout(() => {
            animado?.classList.remove('animar');
        }, 1000);

    }

    quitarError() {
        document.getElementById(`respuesta`)?.classList.remove('error');
    }

    randomNumber(lessThan, min = 0) {
        return Math.floor(Math.random() * (lessThan - min)) + min;
    }

    esconder(paraEsconder) {
        document.getElementById(paraEsconder)!.style.display = 'none';
    }

    mostrar(paraMostrar) {
        document.getElementById(paraMostrar)!.style.display = 'block';
    }

    sonar(evento) {
        let random = this.randomNumber(this.AUDIO_CANTIDAD);
        let audio = new Audio(`sound/${evento}/0${random}.mp3`);
        audio.play();
    }

    preloadMP3() {
        let audioFiles: HTMLAudioElement[] = [];

        for (let i = 0; i <= this.AUDIO_CANTIDAD - 1; i++) {
            let fileName: string = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
            let audioAcierto: HTMLAudioElement = new Audio("sound/acierto/" + fileName);
            let audioError: HTMLAudioElement = new Audio("sound/error/" + fileName);
            audioAcierto.preload = "auto";
            audioError.preload = "auto";
            audioFiles.push(audioAcierto);
            audioFiles.push(audioError);
        }
    }

    borrarHTML(elementoHTML) {
        elementoHTML!.innerHTML = '';
    }
};

const homeWork = new Homework();
