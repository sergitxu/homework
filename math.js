var puntos = 0;
var VIDAS_INICIALES = 5;
var vidas = VIDAS_INICIALES;
var formulario = document.getElementById('calculo');
actualizarPuntos();
actualizarVidas();
// Manejo de la tecla enter
formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        calcular();
    }
});
function actualizarPuntos() {
    document.getElementById('puntos').innerText = puntos.toString();
}
function actualizarVidas() {
    document.getElementById('vidas').innerHTML = '';
    for (var i = 1; i <= vidas; i++) {
        document.getElementById('vidas').innerHTML += "&#9733";
    }
    for (var i = 1; i <= VIDAS_INICIALES - vidas; i++) {
        document.getElementById('vidas').innerHTML += "<span class=\"corazon-vacio\">&#9734</span>";
    }
    if (vidas === 0) {
        gameOver();
    }
}
function gameOver() {
    alert('GAME OVER');
    mostrar('empezar');
    // TODO añadir resultado correcto
}
;
function resetearVidasPuntos() {
    vidas = VIDAS_INICIALES;
    puntos = 0;
    actualizarVidas();
    actualizarPuntos();
}
function crearOperacion() {
    var _a;
    var operacion;
    var operacionAzar = randomNumber(2);
    var valor_a = randomNumber(11);
    var valor_b;
    if (operacionAzar === 0) {
        operacion = "+";
        valor_b = randomNumber(11);
    }
    else {
        operacion = "-";
        valor_b = randomNumber(valor_a);
    }
    formulario.innerHTML = "\n            <span id=\"cifra-a\" class=\"cifra\">".concat(valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"calcular()\" class=\"boton-calcular\">&#9166;</button>\n        ");
    (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
}
function calcular() {
    var _a;
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
        acertar();
    }
    else {
        fallar();
    }
}
function acertar() {
    alert('BRAVO');
    puntos++;
    actualizarPuntos();
    crearOperacion();
}
function fallar() {
    var _a;
    (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.add('error');
    alert('MAL, prueba otra vez.');
    vidas--;
    actualizarVidas();
}
function quitarError() {
    var _a;
    (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.classList.remove('error');
}
function randomNumber(lessThan) {
    return Math.floor(Math.random() * lessThan);
}
function esconder(paraEsconder) {
    document.getElementById("".concat(paraEsconder)).style.display = 'none';
}
function mostrar(paraMostrar) {
    document.getElementById("".concat(paraMostrar)).style.display = 'block';
}
