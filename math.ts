let resultado:number;

function crearOperaciones(numOperaciones) {
    var ul = document.getElementById('operaciones');

    for (let i = 1; i<=numOperaciones; i++) {
    ul!.innerHTML += `
        <li>
            <form id="calculo${i}">
                <span id="cifra${i}a" class="cifra">${randomNumber(10)}</span>
                <span id="operacion${i}" class="operacion">+</span>
                <span id="cifra${i}b" class="cifra">${randomNumber(10)}</span>
                <span class="cifra"> = </span>
                <input type="number" id="respuesta${i}" name="respuesta1" class="respuesta">
                <button type="button" id="calcular${i}" onclick="calcular(${i})">Comprobar</button>
            </form>
        </li>
        `;
    }
}

function calcular(numOperacion) {
    let a: string|number = document.getElementById(`cifra${numOperacion}a`)!.innerText;
    let b: string|number = document.getElementById(`cifra${numOperacion}b`)!.innerText;
    let operacion = document.getElementById(`operacion${numOperacion}`)?.innerText;
    let botonCalcular = (<HTMLInputElement>document.getElementById(`calcular${numOperacion}`))!;
    let respuesta:string|number = (<HTMLInputElement>document.getElementById(`respuesta${numOperacion}`)).value;

    a = parseInt(a);
    b = parseInt(b);
    respuesta = parseInt(respuesta);

    if (operacion === '+') {
        this.resultado = a + b;
    }
    // else if(operacion === '-') {
    //     resultado = a - b;
    // }
    else (
        console.error('No sé que operación es esa.')
    )
    
    if (respuesta === this.resultado) {
        alert('BRAVO');
        botonCalcular.disabled = true;
    } else {
        alert('MAL, prueba otra vez.')
    }
}

function randomNumber(lessThan) {    
    return Math.floor(Math.random()*lessThan);
}
