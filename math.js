var resultado;
function crearOperaciones(numOperaciones) {
    var ul = document.getElementById('operaciones');
    for (var i = 1; i <= numOperaciones; i++) {
        ul.innerHTML += "\n        <li>\n            <form id=\"calculo".concat(i, "\">\n                <span id=\"cifra").concat(i, "a\" class=\"cifra\">").concat(randomNumber(10), "</span>\n                <span id=\"operacion").concat(i, "\" class=\"operacion\">+</span>\n                <span id=\"cifra").concat(i, "b\" class=\"cifra\">").concat(randomNumber(10), "</span>\n                <span class=\"cifra\"> = </span>\n                <input type=\"number\" id=\"respuesta").concat(i, "\" name=\"respuesta1\" class=\"respuesta\">\n                <button type=\"button\" id=\"calcular").concat(i, "\" onclick=\"calcular(").concat(i, ")\">Comprobar</button>\n            </form>\n        </li>\n        ");
    }
}
function calcular(numOperacion) {
    var _a;
    var a = document.getElementById("cifra".concat(numOperacion, "a")).innerText;
    var b = document.getElementById("cifra".concat(numOperacion, "b")).innerText;
    var operacion = (_a = document.getElementById("operacion".concat(numOperacion))) === null || _a === void 0 ? void 0 : _a.innerText;
    var botonCalcular = document.getElementById("calcular".concat(numOperacion));
    var respuesta = document.getElementById("respuesta".concat(numOperacion)).value;
    a = parseInt(a);
    b = parseInt(b);
    respuesta = parseInt(respuesta);
    if (operacion === '+') {
        this.resultado = a + b;
    }
    // else if(operacion === '-') {
    //     resultado = a - b;
    // }
    else
        (console.error('No sé que operación es esa.'));
    if (respuesta === this.resultado) {
        alert('BRAVO');
        botonCalcular.disabled = true;
    }
    else {
        alert('MAL, prueba otra vez.');
    }
}
function randomNumber(lessThan) {
    return Math.floor(Math.random() * lessThan);
}
