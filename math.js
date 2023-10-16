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
        this.actualizarPuntos();
        this.actualizarVidas();
        // TODO añadir record personal usando storage
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
        var _a;
        var respuesta = document.getElementById("respuesta").value;
        if (this.vidas > 0 && respuesta) {
            var a = document.getElementById("cifra-a").innerText;
            var b = document.getElementById("cifra-b").innerText;
            var operacion = (_a = document.getElementById("operacion")) === null || _a === void 0 ? void 0 : _a.innerText;
            a = parseInt(a);
            b = parseInt(b);
            respuesta = parseInt(respuesta);
            if (operacion === '+') {
                this.resultado = a + b;
            }
            else if (operacion === '-') {
                this.resultado = a - b;
            }
            else
                (console.error('No sé que operación es esa.'));
            if (respuesta === this.resultado) {
                this.acertar();
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
        this.crearOperacion();
    };
    Homework.prototype.fallar = function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.add('error');
        this.vidas--;
        this.animar(this.vidasNumero);
        this.actualizarVidas();
    };
    Homework.prototype.gameOver = function () {
        var _a;
        document.getElementById('calcularBoton').disabled = true;
        (_a = this.gameOverDialog) === null || _a === void 0 ? void 0 : _a.showModal();
        this.gameOverDialog.innerHTML = "\n        <h1>\u00A1ENHORABUENA!</h1>\n        <p>Has conseguido <span class=\"puntos-numero\">".concat(this.puntos, "</span> puntos.</p>\n        <p>La respuesta correcta a ").concat(this.valor_a, " ").concat(this.operacion, " ").concat(this.valor_b, " era <span class=\"resultado-number\">").concat(this.resultado, "</span>.</p>\n        <button id=\"empezar-de-nuevo\" class=\"empezar\"\n        onclick=\"homeWork.crearOperacion();homeWork.resetearVidasPuntos();homeWork.esconder('empezar');homeWork.gameOverDialog.close()\">\u00A1Otra vez!</button>\n        ");
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
    return Homework;
}());
;
var homeWork = new Homework();
