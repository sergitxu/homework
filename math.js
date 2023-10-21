var Juego;
(function (Juego) {
    Juego["Reto"] = "reto";
    Juego["SumaResta"] = "sumaResta";
})(Juego || (Juego = {}));
var Homework = /** @class */ (function () {
    function Homework() {
        var _this = this;
        this.puntos = 0;
        this.VIDAS_INICIALES = 5;
        this.vidas = this.VIDAS_INICIALES;
        this.resultado = 0;
        this.zonaCalculo = document.getElementById('zona-calculo');
        this.valor_a = this.randomNumber(11);
        this.gameOverDialog = document.getElementById('game-over');
        this.vidasNumero = document.getElementById('vidas-numero');
        this.puntosNumero = document.getElementById('puntos-numero');
        this.hayNuevoRecordPersonal = false;
        this.actualizarPuntos();
        this.actualizarVidas();
        this.preloadMP3();
        // TODO añadir juego igual / distinto
        addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                _this.calcular();
            }
        });
    }
    Homework.prototype.actualizarPuntos = function () {
        this.puntosNumero.innerText = this.puntos.toString();
    };
    Homework.prototype.actualizarVidas = function () {
        this.vidasNumero.innerHTML = '';
        for (var i = 1; i <= this.vidas; i++) {
            this.vidasNumero.innerHTML += '&#9733';
        }
        for (var i = 1; i <= this.VIDAS_INICIALES - this.vidas; i++) {
            this.vidasNumero.innerHTML += '&#9734';
        }
        if (this.vidas === 0) {
            this.gameOver();
        }
    };
    Homework.prototype.resetearVidasPuntos = function () {
        this.vidas = this.VIDAS_INICIALES;
        this.puntos = 0;
        this.actualizarVidas();
        this.actualizarPuntos();
    };
    Homework.prototype.crearOperacion = function () {
        var _a;
        this.juegoActual = Juego.SumaResta;
        var operacionAzar = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);
        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        }
        else {
            this.operacion = "-";
            this.valor_b = this.randomNumber(this.valor_a);
        }
        this.zonaCalculo.innerHTML = "\n        <form id=\"calculo\">\n            <span id=\"cifra-a\" class=\"cifra\">".concat(this.valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(this.operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(this.valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <br>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    Homework.prototype.calcular = function () {
        var respuesta = document.getElementById("respuesta").value;
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
    };
    Homework.prototype.acertar = function () {
        this.puntos++;
        this.actualizarPuntos();
        this.animar(this.puntosNumero);
        this.sonar('acierto');
    };
    Homework.prototype.fallar = function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        this.animar(this.vidasNumero);
        this.sonar('error');
    };
    Homework.prototype.gameOver = function () {
        var _a;
        this.manejarRecord();
        document.getElementById('calcularBoton').disabled = true;
        (_a = this.gameOverDialog) === null || _a === void 0 ? void 0 : _a.showModal();
        this.gameOverDialog.innerHTML = "\n        <h1>\u00A1ENHORABUENA!</h1>\n        <p>Has conseguido <span class=\"puntos-numero\">".concat(this.puntos, "</span> puntos.</p>");
        if (this.hayNuevoRecordPersonal) {
            this.gameOverDialog.innerHTML += "\n            <h2>\u00A1\u00A1Has mejorado tu record personal!!</h2>\n            ";
        }
        this.gameOverDialog.innerHTML += "\n        <small>La respuesta correcta a ".concat(this.valor_a, " ").concat(this.operacion, " ").concat(this.valor_b, " era <span class=\"resultado-number\">").concat(this.resultado, "</span>.</small><br>\n        ");
    };
    Homework.prototype.borrarHTML = function (elementoHTML) {
        elementoHTML.innerHTML = '';
    };
    Homework.prototype.manejarRecord = function () {
        var recordPersonal = localStorage.getItem('record');
        if (!recordPersonal) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
        }
        else if (this.puntos > Number(recordPersonal)) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
        }
        else {
            this.hayNuevoRecordPersonal = false;
        }
    };
    Homework.prototype.animar = function (animado) {
        animado === null || animado === void 0 ? void 0 : animado.classList.add('animar');
        setTimeout(function () {
            animado === null || animado === void 0 ? void 0 : animado.classList.remove('animar');
        }, 1000);
    };
    Homework.prototype.quitarError = function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.remove('error');
    };
    Homework.prototype.randomNumber = function (lessThan) {
        return Math.floor(Math.random() * lessThan);
    };
    Homework.prototype.esconder = function (paraEsconder) {
        document.getElementById(paraEsconder).style.display = 'none';
    };
    Homework.prototype.mostrar = function (paraMostrar) {
        document.getElementById(paraMostrar).style.display = 'inline-block';
    };
    Homework.prototype.sonar = function (evento) {
        var random = this.randomNumber(6);
        var audio = new Audio("sound/".concat(evento, "/0").concat(random, ".mp3"));
        audio.play();
    };
    Homework.prototype.preloadMP3 = function () {
        var audioFiles = [];
        for (var i = 0; i <= 6; i++) {
            var fileName = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
            var audio = new Audio("sound/acierto/" + fileName);
            audio.preload = "auto";
            audioFiles.push(audio);
        }
    };
    // Retos
    Homework.prototype.crearReto = function () {
        this.juegoActual = Juego.Reto;
        var nombres = ['Jon', 'Adri', 'Yago', 'Jacob'];
        var cosas = ['cartas pokemon', 'pelotas', 'bakugan'];
        var nombre_a = nombres[this.randomNumber(nombres.length)];
        var nombres_salvo_nombre_a = nombres.filter(function (nombre) { return nombre !== nombre_a; });
        var nombre_b = nombres_salvo_nombre_a[this.randomNumber(nombres_salvo_nombre_a.length)];
        var cosa_x = cosas[this.randomNumber(cosas.length)];
        var operacionAzar = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);
        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        }
        else {
            this.operacion = "-";
            this.valor_b = this.randomNumber(this.valor_a);
        }
        this.zonaCalculo.innerHTML = "\n        ".concat(nombre_a, " tiene ").concat(this.valor_a, " ").concat(cosa_x, "\n        ");
        if (this.operacion === '+') {
            this.zonaCalculo.innerHTML += "\n            .<br>".concat(nombre_b, " le da ").concat(this.valor_b, " ").concat(cosa_x, ".\n            ");
        }
        else if (this.operacion === '-') {
            this.zonaCalculo.innerHTML += "\n            , le regala ".concat(this.valor_b, " ").concat(cosa_x, " a ").concat(nombre_b, ".\n            ");
        }
        else
            (console.error('No sé que operación es esa.'));
        this.zonaCalculo.innerHTML += "\n        \u00BFqu\u00E9 cantidad de ".concat(cosa_x, " tiene ").concat(nombre_a, " ahora?\n        \n        <form id=\"calculo\">\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
    };
    return Homework;
}());
;
var homeWork = new Homework();
