var Homework = /** @class */ (function () {
    function Homework() {
        var _this = this;
        this.puntos = 0;
        this.VIDAS_INICIALES = 5;
        this.vidas = this.VIDAS_INICIALES;
        this.resultado = 0;
        this.zonaCalculo = document.getElementById('zona-calculo');
        this.actualizarPuntos();
        this.actualizarVidas();
        // TODO añadir record personal usando storage
        // Manejo de la tecla enter
        addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                _this.calcular();
            }
        });
    }
    Homework.prototype.actualizarPuntos = function () {
        document.getElementById('puntos').innerText = this.puntos.toString();
    };
    Homework.prototype.actualizarVidas = function () {
        document.getElementById('vidas').innerHTML = '';
        for (var i = 1; i <= this.vidas; i++) {
            document.getElementById('vidas').innerHTML += '&#9733';
        }
        for (var i = 1; i <= this.VIDAS_INICIALES - this.vidas; i++) {
            document.getElementById('vidas').innerHTML += '&#9734';
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
        var operacion;
        var operacionAzar = this.randomNumber(2);
        var valor_a = this.randomNumber(11);
        var valor_b;
        if (operacionAzar === 0) {
            operacion = "+";
            valor_b = this.randomNumber(11);
        }
        else {
            operacion = "-";
            valor_b = this.randomNumber(valor_a);
        }
        this.zonaCalculo.innerHTML = "\n        <form id=\"calculo\">\n            <span id=\"cifra-a\" class=\"cifra\">".concat(valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
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
        alert('BRAVO');
        this.puntos++;
        this.actualizarPuntos();
        this.crearOperacion();
    };
    Homework.prototype.fallar = function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.add('error');
        alert('MAL, prueba otra vez.');
        this.vidas--;
        this.actualizarVidas();
    };
    Homework.prototype.gameOver = function () {
        alert('GAME OVER');
        document.getElementById("calcularBoton").disabled = true;
        this.mostrar('empezar');
        this.zonaCalculo.innerHTML += "<p>La respuesta correcta es <span class=\"resultado-number\">".concat(this.resultado, "</span>.</p>");
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
// Create an instance of the MathGame class
var homeWork = new Homework();
