// TODO Añadir tests
// TODO organizar juegos por temática / edad.

import { englishWordPregunta, crearEnglishVocabulary } from './modules/english/EnglishVocabulary.ts';
import { esconder, getRandomElements, mostrar, preloadMP3, sonar, randomNumber } from './modules/generic.ts';
import { elementoPregunta, oxidacion, resolverOxidacion } from './modules/oxidacion/oxidacion.ts';

export enum Juego {
    Reto, SumaResta, Oxidacion, EnglishVocabulary
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
    VIDAS_INICIALES: number = 3;
    HOST = 'https://sergitxu.github.io/homework';
    HOSTLOCAL = '.';

    juegoActual: Juego = Juego.Reto;
    puntos: number = 0;
    vidas: number = this.VIDAS_INICIALES;
    resultado: number = 0;
    zonaJuego = document.getElementById('zona-juego');
    valor_a: number = randomNumber(11);
    valor_b: number = 0;
    operacion: string = '+';
    gameOverDialog: HTMLDialogElement = (<HTMLDialogElement>document.getElementById('game-over'));
    vidasNumero: HTMLElement | null = document.getElementById('vidas-numero');
    puntosNumero: HTMLElement | null = document.getElementById('puntos-numero');
    startRetos: HTMLElement | null = document.getElementById('boton-retos');
    startSumasRestas: HTMLElement | null = document.getElementById('boton-sumaResta');
    startEnglishVocabulary: HTMLElement | null = document.getElementById('boton-englishVocabulary');
    startOxidacion: HTMLElement | null = document.getElementById('boton-oxidacion');
    closeButton: HTMLElement | null = document.getElementById('close-button');
    inputRespuesta: HTMLElement | null = document.getElementById('input-respuesta');
    hayNuevoRecordPersonal: boolean = false;
    recordPersonalReto = localStorage.getItem('record-reto');
    recordPersonalSumaResta = localStorage.getItem('record-sumaresta');
    recordPersonalOxidacion = localStorage.getItem('record-oxidacion');
    recordPersonalEnglish = localStorage.getItem('record-english');

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();
        preloadMP3();

        addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.juegoActual !== Juego.Oxidacion) {
                e.preventDefault();
                this.calcular();
            } else if (e.key === 'Enter' && this.juegoActual === Juego.Oxidacion) {
                e.preventDefault();
                resolverOxidacion();
            }
        });

        this.gameOverDialog.addEventListener("close", () => {
            this.reiniciarJuego();
        });

        this.startRetos?.addEventListener("click", () => {
            this.crearReto(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
        });

        this.startSumasRestas?.addEventListener("click", () => {
            this.crearOperacion(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
        });

        this.startEnglishVocabulary?.addEventListener("click", () => {
            crearEnglishVocabulary(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
        });

        this.startOxidacion?.addEventListener("click", () => {
            oxidacion(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
        });

        this.closeButton?.addEventListener("click", () => {
            this.gameOver();
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
        esconder(['zona-juego', 'vidas-numero', 'puntos', 'record', 'close-button']);
        mostrar(['empezar', 'boton-oxidacion']);
    }

    mostrarRecord() {
        switch (this.juegoActual) {
            case Juego.Reto: {
                if (this.recordPersonalReto) {
                    document.getElementById('puntos-record')!.innerText = this.recordPersonalReto;
                    mostrar(['record']);
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.SumaResta: {
                if (this.recordPersonalSumaResta) {
                    document.getElementById('puntos-record')!.innerText = this.recordPersonalSumaResta;
                    mostrar(['record']);
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.Oxidacion: {
                if (this.recordPersonalOxidacion) {
                    document.getElementById('puntos-record')!.innerText = this.recordPersonalOxidacion;
                    mostrar(['record']);
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.EnglishVocabulary: {
                if (this.recordPersonalEnglish) {
                    document.getElementById('puntos-record')!.innerText = this.recordPersonalEnglish;
                    mostrar(['record']);
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
        }

    }

    calcular() {
        (<HTMLInputElement>document.getElementById(`input-respuesta`)).addEventListener("input", () => {
            this.quitarError();
        });

        let respuesta: string | number = (<HTMLInputElement>document.getElementById(`input-respuesta`)).value;

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
        sonar('acierto');
    }

    fallar() {
        document.getElementById(`input-respuesta`)?.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        this.animar(this.vidasNumero);
        sonar('error');
    }

    gameOver() {
        this.manejarRecord();
        if ((<HTMLButtonElement>document.getElementById('boton-calcular'))) {
            (<HTMLButtonElement>document.getElementById('boton-calcular')).disabled = true;
        }
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

        switch (this.juegoActual) {
            case Juego.Oxidacion: {
                this.gameOverDialog!.innerHTML += `
                <small>El número de oxidación del ${elementoPregunta.nombre} - ${elementoPregunta.simbolo} era <span class="resultado-number">${elementoPregunta.num_oxidacion}</span>.</small><br>
                <form method="dialog">
                    <button class="empezar">OK</button>
                </form>
                `
                break;
            }
            case Juego.Reto: {
                this.gameOverDialog!.innerHTML += `
                <small>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</small><br>
                <form method="dialog">
                    <button class="empezar">OK</button>
                </form>
                `
                break;
            }
            case Juego.SumaResta: {
                this.gameOverDialog!.innerHTML += `
                <small>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</small><br>
                <form method="dialog">
                    <button class="empezar">OK</button>
                </form>
                `
                break;
            }
            case Juego.EnglishVocabulary: {
                this.gameOverDialog!.innerHTML += `
                <small>La respuesta correcta era <span class="resultado-number">${englishWordPregunta.texto}</span>.</small><br>
                <form method="dialog">
                    <button class="empezar">OK</button>
                </form>
                `
                break;
            }
        }
    }

    manejarRecord() {
        switch (this.juegoActual) {
            case Juego.Reto: {
                if (!this.recordPersonalReto || this.puntos > Number(this.recordPersonalReto)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-reto', this.puntos.toString());
                    this.recordPersonalReto = this.puntos.toString();
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.SumaResta: {
                if (!this.recordPersonalSumaResta || this.puntos > Number(this.recordPersonalSumaResta)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-sumaresta', this.puntos.toString());
                    this.recordPersonalSumaResta = this.puntos.toString();
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.Oxidacion: {
                if (!this.recordPersonalOxidacion || this.puntos > Number(this.recordPersonalOxidacion)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-oxidacion', this.puntos.toString());
                    this.recordPersonalOxidacion = this.puntos.toString();
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.EnglishVocabulary: {
                if (!this.recordPersonalEnglish || this.puntos > Number(this.recordPersonalEnglish)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-english', this.puntos.toString());
                    this.recordPersonalEnglish = this.puntos.toString();
                } else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
        }
    }

    // Retos
    crearReto() {
        this.juegoActual = Juego.Reto;
        mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
        this.mostrarRecord();

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

        let nombres_elegidos = getRandomElements(nombres, 2);

        let nombre_a = nombres_elegidos[0];
        let nombre_b = nombres_elegidos[1];

        let cosa_x = cosas[randomNumber(cosas.length)];

        let operacionAzar: number = randomNumber(2);
        this.valor_a = randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = randomNumber(11, 2);
            this.valor_b = randomNumber(this.valor_a, 1);
        }

        this.zonaJuego!.innerHTML = `
        ${nombre_a} tiene <span class="puntos-numero">${this.valor_a}</span> 
        `
        if (this.valor_a === 1) {
            this.zonaJuego!.innerHTML += `
            ${cosa_x.nombre_singular}.
            `
        } else {
            this.zonaJuego!.innerHTML += `
            ${cosa_x.nombre_plural}.
            `
        }

        if (this.operacion === '+') {
            this.zonaJuego!.innerHTML += `
            <br>
            ${nombre_b} le da <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else if (this.operacion === '-') {
            this.zonaJuego!.innerHTML += `
            <br>
            Pierde <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else (
            console.error('No sé que operación es esa.')
        )

        if (cosa_x.genero === Genero.masculino) {
            this.zonaJuego!.innerHTML += `<br>¿Cuántos`
        } else {
            this.zonaJuego!.innerHTML += `<br>¿Cuántas`
        }

        this.zonaJuego!.innerHTML += `
        ${cosa_x.nombre_plural} tiene ahora ${nombre_a}?
        
        <form id="calculo">
            <input type="number" id="input-respuesta" name="respuesta" class="respuesta">
            <button type="button" id="boton-calcular" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`boton-calcular`)?.addEventListener("click", () => {
            this.calcular();
        });

        document.getElementById(`input-respuesta`)?.focus();
    }

    // Operacion de sumas y restas
    crearOperacion() {
        this.juegoActual = Juego.SumaResta;
        this.mostrarRecord();
        mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
        let operacionAzar: number = randomNumber(2);
        this.valor_a = randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = randomNumber(11, 2);
            this.valor_b = randomNumber(this.valor_a);
        }

        this.zonaJuego!.innerHTML = `
        <form id="calculo">
            <span id="cifra-a" class="cifra">${this.valor_a}</span>
            <span id="operacion" class="operacion">${this.operacion}</span>
            <span id="cifra-b" class="cifra">${this.valor_b}</span>
            <span class="cifra"> = </span>
            <br>
            <input type="number" id="input-respuesta" name="respuesta" class="respuesta">
            <button type="button" id="boton-calcular" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`boton-calcular`)?.addEventListener("click", () => {
            this.calcular();
        });

        (<HTMLInputElement>document.getElementById(`input-respuesta`))?.focus();
    }


    // Métodos genéricos
    animar(animado: HTMLElement | null) {
        animado?.classList.add('animar');
        setTimeout(() => {
            animado?.classList.remove('animar');
        }, 1000);

    }

    quitarError() {
        (<HTMLInputElement>document.getElementById(`input-respuesta`))?.classList.remove('error');
    }
};

export const homeWork = new Homework();

