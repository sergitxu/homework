// TODO Añadir tests
// TODO organizar juegos por temática / edad.

import { englishWordPregunta, crearEnglishVocabulary } from './modules/english/EnglishVocabulary.ts';
import { esconder, mostrar, preloadMP3, sonar, animar } from './modules/generic.ts';
import { resultado } from './modules/math.ts';
import { elementoPregunta, oxidacion } from './modules/oxidacion/oxidacion.ts';
import { crearReto, operacion_reto, valor_a_reto, valor_b_reto } from './modules/reto/reto.ts';
import { crearOperacion, operacion_sumaresta, valor_a_sumaresta, valor_b_sumaresta } from './modules/sumaResta.ts';

export enum Juego {
    Reto, SumaResta, Oxidacion, EnglishVocabulary
}

class Homework {
    VIDAS_INICIALES: number = 3;
    HOST = 'https://sergitxu.github.io/homework';
    HOSTLOCAL = '.';

    juegoActual: Juego = Juego.Reto;
    puntos: number = 0;
    vidas: number = this.VIDAS_INICIALES;
    zonaJuego = document.getElementById('zona-juego');
    gameOverDialog: HTMLDialogElement = (<HTMLDialogElement>document.getElementById('game-over'));
    vidasNumero: HTMLElement | null = document.getElementById('vidas-numero');
    puntosNumero: HTMLElement | null = document.getElementById('puntos-numero');
    startRetos: HTMLElement | null = document.getElementById('boton-retos');
    startSumasRestas: HTMLElement | null = document.getElementById('boton-sumaResta');
    startEnglishVocabulary: HTMLElement | null = document.getElementById('boton-englishVocabulary');
    startOxidacion: HTMLElement | null = document.getElementById('boton-oxidacion');
    closeButton: HTMLElement | null = document.getElementById('close-button');
    hayNuevoRecordPersonal: boolean = false;
    recordPersonalReto = localStorage.getItem('record-reto');
    recordPersonalSumaResta = localStorage.getItem('record-sumaresta');
    recordPersonalOxidacion = localStorage.getItem('record-oxidacion');
    recordPersonalEnglish = localStorage.getItem('record-english');

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();
        preloadMP3();

        this.gameOverDialog.addEventListener("close", () => {
            this.reiniciarJuego();
        });

        this.startRetos?.addEventListener("click", () => {
            crearReto(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
        });

        this.startSumasRestas?.addEventListener("click", () => {
            crearOperacion(); this.resetearVidasPuntos(); esconder(['empezar']); esconder(['boton-oxidacion']);
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

    acertar() {
        this.puntos++;
        this.actualizarPuntos();
        animar(this.puntosNumero);
        sonar('acierto');
    }

    fallar() {
        document.getElementById(`input-respuesta`)?.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        animar(this.vidasNumero);
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
                <small>La respuesta correcta a ${valor_a_reto} ${operacion_reto} ${valor_b_reto} era <span class="resultado-number">${resultado}</span>.</small><br>
                <form method="dialog">
                    <button class="empezar">OK</button>
                </form>
                `
                break;
            }
            case Juego.SumaResta: {
                this.gameOverDialog!.innerHTML += `
                <small>La respuesta correcta a ${valor_a_sumaresta} ${operacion_sumaresta} ${valor_b_sumaresta} era <span class="resultado-number">${resultado}</span>.</small><br>
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
};

export const homeWork = new Homework();

