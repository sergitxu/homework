// TODO añadir juego igual / distinto
// TODO separar código en módulos
// TODO Añadir tests
import * as genericos from "./genericos";
var Juego;
(function (Juego) {
    Juego[Juego["Reto"] = 0] = "Reto";
    Juego[Juego["SumaResta"] = 1] = "SumaResta";
})(Juego || (Juego = {}));
var Genero;
(function (Genero) {
    Genero[Genero["masculino"] = 0] = "masculino";
    Genero[Genero["femenino"] = 1] = "femenino";
})(Genero || (Genero = {}));
class Homework {
    constructor() {
        this.juegoActual = Juego.Reto;
        this.puntos = 0;
        this.VIDAS_INICIALES = 3;
        this.AUDIO_CANTIDAD = 7;
        this.vidas = this.VIDAS_INICIALES;
        this.resultado = 0;
        this.zonaCalculo = document.getElementById('zona-calculo');
        this.valor_a = genericos.randomNumber(11);
        this.valor_b = 0;
        this.operacion = '+';
        this.gameOverDialog = document.getElementById('game-over');
        this.vidasNumero = document.getElementById('vidas-numero');
        this.puntosNumero = document.getElementById('puntos-numero');
        this.hayNuevoRecordPersonal = false;
        this.recordPersonal = localStorage.getItem('record');
        this.actualizarPuntos();
        this.actualizarVidas();
        genericos.preloadMP3();
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
        this.puntosNumero.innerText = this.puntos.toString();
    }
    actualizarVidas() {
        this.vidasNumero.innerHTML = '';
        for (let i = 1; i <= this.vidas; i++) {
            this.vidasNumero.innerHTML += '&#9733';
        }
        for (let i = 1; i <= this.VIDAS_INICIALES - this.vidas; i++) {
            this.vidasNumero.innerHTML += '&#9734';
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
        genericos.esconder('zona-calculo');
        genericos.mostrar('empezar');
        this.mostrarRecord();
    }
    mostrarRecord() {
        if (this.recordPersonal) {
            document.getElementById('puntos-record').innerText = this.recordPersonal;
            genericos.mostrar('record');
        }
    }
    calcular() {
        let respuesta = document.getElementById(`respuesta`).value;
        if (this.vidas > 0 && respuesta) {
            respuesta = parseInt(respuesta);
            if (this.operacion === '+') {
                this.resultado = this.valor_a + this.valor_b;
            }
            else if (this.operacion === '-') {
                this.resultado = this.valor_a - this.valor_b;
            }
            else
                (console.error('No sé que operación es esa.'));
            if (respuesta === this.resultado) {
                this.acertar();
                if (this.juegoActual === Juego.SumaResta) {
                    this.crearOperacion();
                }
                else {
                    this.crearReto();
                }
            }
            else {
                this.fallar();
            }
        }
    }
    acertar() {
        this.puntos++;
        this.actualizarPuntos();
        genericos.animar(this.puntosNumero);
        genericos.sonar('acierto');
    }
    fallar() {
        var _a;
        (_a = document.getElementById(`respuesta`)) === null || _a === void 0 ? void 0 : _a.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        genericos.animar(this.vidasNumero);
        genericos.sonar('error');
    }
    gameOver() {
        var _a;
        this.manejarRecord();
        document.getElementById('calcularBoton').disabled = true;
        (_a = this.gameOverDialog) === null || _a === void 0 ? void 0 : _a.showModal();
        this.gameOverDialog.innerHTML = `<h1>¡ENHORABUENA!</h1>`;
        if (this.puntos === 1) {
            this.gameOverDialog.innerHTML += `<p>Has conseguido <span class="puntos-numero">${this.puntos}</span> punto.</p>`;
        }
        else {
            this.gameOverDialog.innerHTML += `<p>Has conseguido <span class="puntos-numero">${this.puntos}</span> puntos.</p>`;
        }
        if (this.hayNuevoRecordPersonal) {
            this.gameOverDialog.innerHTML += `
            <h2>¡¡Has mejorado tu record personal!!</h2>
            `;
        }
        this.gameOverDialog.innerHTML += `
        <small>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</small><br>
        <form method="dialog">
            <button class="empezar">OK</button>
        </form>
        `;
    }
    manejarRecord() {
        if (!this.recordPersonal || this.puntos > Number(this.recordPersonal)) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
            this.recordPersonal = this.puntos.toString();
        }
        else {
            this.hayNuevoRecordPersonal = false;
        }
    }
    // Retos
    crearReto() {
        var _a;
        this.juegoActual = Juego.Reto;
        let nombres = ['Jon', 'Adri', 'Yago', 'Jacob', 'Asher', 'Enzo', 'Ginebra', 'Eva', 'Daniela', 'Antonio', 'Maria',
            'Xabi', 'Alba', 'Sophie', 'Valentina', 'Carla', 'Salomé', 'Jaime', 'Nicholas', 'Eva', 'Boris', 'Diana', 'Marina', 'Alex',
            'Sergio', 'David', 'Leonor', 'Bruna', 'Alaia', 'Sofía', 'Ángela', 'Nor', 'Sarah', 'Valeria', 'David', 'Manuel', 'Paula',
            'Fiorella', 'Martín', 'Noha', 'Samuel', 'Gabriel', 'Alicia', 'Sebastián', 'Noa', 'Ignacio', 'Emma'];
        let cosas = [
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
        let nombre_a = nombres[genericos.randomNumber(nombres.length)];
        let nombres_salvo_nombre_a = nombres.filter(nombre => nombre !== nombre_a);
        let nombre_b = nombres_salvo_nombre_a[genericos.randomNumber(nombres_salvo_nombre_a.length)];
        let cosa_x = cosas[genericos.randomNumber(cosas.length)];
        let operacionAzar = genericos.randomNumber(2);
        this.valor_a = genericos.randomNumber(11);
        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = genericos.randomNumber(11);
        }
        else {
            this.operacion = "-";
            this.valor_a = genericos.randomNumber(11, 2);
            this.valor_b = genericos.randomNumber(this.valor_a, 1);
        }
        genericos.mostrar('zona-calculo');
        this.zonaCalculo.innerHTML = `
        ${nombre_a} tiene <span class="puntos-numero">${this.valor_a}</span> 
        `;
        if (this.valor_a === 1) {
            this.zonaCalculo.innerHTML += `
            ${cosa_x.nombre_singular}.
            `;
        }
        else {
            this.zonaCalculo.innerHTML += `
            ${cosa_x.nombre_plural}.
            `;
        }
        if (this.operacion === '+') {
            this.zonaCalculo.innerHTML += `
            <br>
            ${nombre_b} le da <span class="puntos-numero">${this.valor_b}</span>.
            `;
        }
        else if (this.operacion === '-') {
            this.zonaCalculo.innerHTML += `
            <br>
            Pierde <span class="puntos-numero">${this.valor_b}</span>.
            `;
        }
        else
            (console.error('No sé que operación es esa.'));
        if (cosa_x.genero === Genero.masculino) {
            this.zonaCalculo.innerHTML += `<br>¿Cuántos`;
        }
        else {
            this.zonaCalculo.innerHTML += `<br>¿Cuántas`;
        }
        this.zonaCalculo.innerHTML += `
        ${cosa_x.nombre_plural} tiene ahora ${nombre_a}?
        
        <form id="calculo">
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="homeWork.calcular()" class="boton-calcular">&#9166;</button>
        </form>
        `;
        (_a = document.getElementById(`respuesta`)) === null || _a === void 0 ? void 0 : _a.focus();
    }
    // Operacion de sumas y restas
    crearOperacion() {
        var _a;
        this.juegoActual = Juego.SumaResta;
        let operacionAzar = genericos.randomNumber(2);
        this.valor_a = genericos.randomNumber(11);
        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = genericos.randomNumber(11);
        }
        else {
            this.operacion = "-";
            this.valor_a = genericos.randomNumber(11, 2);
            this.valor_b = genericos.randomNumber(this.valor_a);
        }
        genericos.mostrar('zona-calculo');
        this.zonaCalculo.innerHTML = `
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
        (_a = document.getElementById(`respuesta`)) === null || _a === void 0 ? void 0 : _a.focus();
    }
}
;
const homeWork = new Homework();
