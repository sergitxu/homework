var MyHomework = {
    puntos: 0,
    VIDAS_INICIALES: 5,
    vidas: this.VIDAS_INICIALES,
    formulario: document.getElementById('calculo'),
    // TODO añadir record personal usando storage
    init: function () {
        var _a;
        this.actualizarPuntos();
        this.actualizarVidas();
        // Manejo de la tecla enter
        (_a = this.formulario) === null || _a === void 0 ? void 0 : _a.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calcular();
            }
        });
    },
    actualizarPuntos: function () {
        document.getElementById('puntos').innerText = this.puntos.toString();
    },
    actualizarVidas: function () {
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
    },
    resetearVidasPuntos: function () {
        this.vidas = this.VIDAS_INICIALES;
        this.puntos = 0;
        this.actualizarVidas();
        this.actualizarPuntos();
    },
    crearOperacion: function () {
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
        this.formulario.innerHTML = "\n            <span id=\"cifra-a\" class=\"cifra\">".concat(valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"calcular()\" class=\"boton-calcular\">&#9166;</button>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    },
    calcular: function () {
        var _a;
        if (this.vidas > 0) {
            var a = document.getElementById("cifra-a").innerText;
            var b = document.getElementById("cifra-b").innerText;
            var operacion = (_a = document.getElementById("operacion")) === null || _a === void 0 ? void 0 : _a.innerText;
            var respuesta = document.getElementById("respuesta").value;
            var resultado = 0;
            a = parseInt(a);
            b = parseInt(b);
            respuesta = parseInt(respuesta);
            if (operacion === '+') {
                resultado = a + b;
            }
            else if (operacion === '-') {
                resultado = a - b;
            }
            else
                (console.error('No sé que operación es esa.'));
            if (respuesta === resultado) {
                this.acertar();
            }
            else {
                this.fallar();
            }
        }
    },
    acertar: function () {
        alert('BRAVO');
        this.puntos++;
        this.actualizarPuntos();
        this.crearOperacion();
    },
    fallar: function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.add('error');
        alert('MAL, prueba otra vez.');
        this.vidas--;
        this.actualizarVidas();
    },
    gameOver: function () {
        alert('GAME OVER');
        document.getElementById("calcularBoton").disabled = true;
        this.mostrar('empezar');
        this.formulario.innerHTML = "<p>La respuesta correcta era: ".concat(this.resultado, "</p>");
        // TODO añadir resultado correcto
    },
    quitarError: function () {
        var _a;
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.remove('error');
    },
    randomNumber: function (lessThan) {
        return Math.floor(Math.random() * lessThan);
    },
    esconder: function (paraEsconder) {
        document.getElementById("".concat(paraEsconder)).style.display = 'none';
    },
    mostrar: function (paraMostrar) {
        document.getElementById("".concat(paraMostrar)).style.display = 'block';
    }
};
this.init();
