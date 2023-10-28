// TODO añadir juego igual / distinto
// TODO separar código en módulos
// TODO Añadir tests

enum Juego {
    Reto, SumaResta, Oxidacion
}
enum Genero {
    masculino, femenino
}

interface Cosa {
    nombre_singular: string,
    nombre_plural: string,
    genero: Genero
}

enum ElementoTipo {
    'metal', 'no metal'
}

interface Elemento {
    tipo: ElementoTipo,
    nombre: string,
    simbolo?: string,
    num_oxidacion: string
}

class Homework {
    juegoActual: Juego = Juego.Reto;
    puntos: number = 0;
    VIDAS_INICIALES: number = 3;
    AUDIO_CANTIDAD: number = 7;
    vidas: number = this.VIDAS_INICIALES;
    resultado: number = 0;
    zonaCalculo = document.getElementById('zona-calculo');
    valor_a: number = this.randomNumber(11);
    valor_b: number = 0;
    operacion: string = '+';
    gameOverDialog: HTMLDialogElement = (<HTMLDialogElement>document.getElementById('game-over'));
    vidasNumero: HTMLElement | null = document.getElementById('vidas-numero');
    puntosNumero: HTMLElement | null = document.getElementById('puntos-numero');
    hayNuevoRecordPersonal: boolean = false;
    recordPersonal = localStorage.getItem('record');

    elementoPregunta: Elemento = {
        tipo: ElementoTipo.metal,
        simbolo: '',
        nombre: '',
        num_oxidacion: ''
    }

    constructor() {
        this.actualizarPuntos();
        this.actualizarVidas();
        this.preloadMP3();
        this.mostrarRecord();

        addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.juegoActual !== Juego.Oxidacion) {
                e.preventDefault();
                this.calcular();
            } else if (e.key === 'Enter' && this.juegoActual === Juego.Oxidacion) {
                e.preventDefault();
                this.resolverOxidacion();
            }
        });

        this.gameOverDialog.addEventListener("close", (event) => {
            this.reiniciarJuego();
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
        this.esconder('zona-calculo');
        this.mostrar('empezar');
        this.mostrarRecord();
    }

    mostrarRecord() {
        if (this.recordPersonal) {
            document.getElementById('puntos-record')!.innerText = this.recordPersonal;
            this.mostrar('record');
        }
    }

    calcular() {
        let respuesta: string | number = (<HTMLInputElement>document.getElementById(`respuesta`)).value;

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
        this.sonar('acierto');
    }

    fallar() {
        document.getElementById(`respuesta`)?.classList.add('error');
        this.vidas--;
        this.actualizarVidas();
        this.animar(this.vidasNumero);
        this.sonar('error');
    }

    gameOver() {
        this.manejarRecord();
        (<HTMLButtonElement>document.getElementById('calcularBoton'))!.disabled = true;
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
        if (this.juegoActual === Juego.Oxidacion) {
            this.gameOverDialog!.innerHTML += `
            <small>El número de oxidación del ${this.elementoPregunta.nombre} - ${this.elementoPregunta.simbolo} era <span class="resultado-number">${this.elementoPregunta.num_oxidacion}</span>.</small><br>
            <form method="dialog">
                <button class="empezar">OK</button>
            </form>
            `
        } else {
            this.gameOverDialog!.innerHTML += `
            <small>La respuesta correcta a ${this.valor_a} ${this.operacion} ${this.valor_b} era <span class="resultado-number">${this.resultado}</span>.</small><br>
            <form method="dialog">
                <button class="empezar">OK</button>
            </form>
            `
        }
    }

    manejarRecord() {
        if (!this.recordPersonal || this.puntos > Number(this.recordPersonal)) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
            this.recordPersonal = this.puntos.toString();
        } else {
            this.hayNuevoRecordPersonal = false;
        }
    }

    // Retos
    crearReto() {
        this.juegoActual = Juego.Reto;

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

        let nombre_a = nombres[this.randomNumber(nombres.length)];
        let nombres_salvo_nombre_a = nombres.filter(nombre => nombre !== nombre_a);
        let nombre_b = nombres_salvo_nombre_a[this.randomNumber(nombres_salvo_nombre_a.length)];
        let cosa_x = cosas[this.randomNumber(cosas.length)];

        let operacionAzar: number = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a, 1);
        }

        this.mostrar('zona-calculo');

        this.zonaCalculo!.innerHTML = `
        ${nombre_a} tiene <span class="puntos-numero">${this.valor_a}</span> 
        `
        if (this.valor_a === 1) {
            this.zonaCalculo!.innerHTML += `
            ${cosa_x.nombre_singular}.
            `
        } else {
            this.zonaCalculo!.innerHTML += `
            ${cosa_x.nombre_plural}.
            `
        }

        if (this.operacion === '+') {
            this.zonaCalculo!.innerHTML += `
            <br>
            ${nombre_b} le da <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else if (this.operacion === '-') {
            this.zonaCalculo!.innerHTML += `
            <br>
            Pierde <span class="puntos-numero">${this.valor_b}</span>.
            `
        } else (
            console.error('No sé que operación es esa.')
        )

        if (cosa_x.genero === Genero.masculino) {
            this.zonaCalculo!.innerHTML += `<br>¿Cuántos`
        } else {
            this.zonaCalculo!.innerHTML += `<br>¿Cuántas`
        }

        this.zonaCalculo!.innerHTML += `
        ${cosa_x.nombre_plural} tiene ahora ${nombre_a}?
        
        <form id="calculo">
            <input type="number" id="respuesta" name="respuesta" class="respuesta" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="homeWork.calcular()" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`respuesta`)?.focus();
    }

    // Operacion de sumas y restas
    crearOperacion() {
        this.juegoActual = Juego.SumaResta;
        let operacionAzar: number = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);

        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        } else {
            this.operacion = "-";
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a);
        }

        this.mostrar('zona-calculo');

        this.zonaCalculo!.innerHTML = `
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

        document.getElementById(`respuesta`)?.focus();
    }

    // oxidacion

    elementos: Elemento[] = [
        {
            tipo: ElementoTipo.metal,
            nombre: 'Litio',
            simbolo: 'Li',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Sodio',
            simbolo: 'Na',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Potasio',
            simbolo: 'K',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Rubidio',
            simbolo: 'Rb',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cesio',
            simbolo: 'Cs',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Francio',
            simbolo: 'Fr',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Plata',
            simbolo: 'Ag',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Amonio',
            simbolo: 'NH4',
            num_oxidacion: '1'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Berilio',
            simbolo: 'Be',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Magnesio',
            simbolo: 'Mg',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Calcio',
            simbolo: 'Ca',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Estroncio',
            simbolo: 'Sr',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Bario',
            simbolo: 'Ba',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Radio',
            simbolo: 'Ra',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cinc',
            simbolo: 'Zn',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cadmio',
            simbolo: 'Cd',
            num_oxidacion: '2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Aluminio',
            simbolo: 'Al',
            num_oxidacion: '3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cobre',
            simbolo: 'CU',
            num_oxidacion: '1 2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Mercurio',
            simbolo: 'Hg',
            num_oxidacion: '1 2'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Oro',
            simbolo: 'AU',
            num_oxidacion: '1 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cromo',
            simbolo: 'Cr',
            num_oxidacion: '2 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Magnaneso',
            simbolo: 'Mn',
            num_oxidacion: '2 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Hierro',
            simbolo: 'Fe',
            num_oxidacion: '2 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Cobalto',
            simbolo: 'Co',
            num_oxidacion: '2 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Níquel',
            simbolo: 'Ni',
            num_oxidacion: '2 3'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Estaño',
            simbolo: 'Sn',
            num_oxidacion: '2 4'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Plomo',
            simbolo: 'Pb',
            num_oxidacion: '2 4'
        },
        {
            tipo: ElementoTipo.metal,
            nombre: 'Platino',
            simbolo: 'Pt',
            num_oxidacion: '2 4'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Hidrógeno',
            simbolo: 'H',
            num_oxidacion: '1 -1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Flúor',
            simbolo: 'F',
            num_oxidacion: '-1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Cloro',
            simbolo: 'Cl',
            num_oxidacion: '1 3 5 7 -1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Bromo',
            simbolo: 'Br',
            num_oxidacion: '1 3 5 7 -1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Yodo',
            simbolo: 'I',
            num_oxidacion: '1 3 5 7 -1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Oxígeno',
            simbolo: 'O',
            num_oxidacion: '-2 -1'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Azufre',
            simbolo: 'S',
            num_oxidacion: '2 4 6 -2'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Selenio',
            simbolo: 'Se',
            num_oxidacion: '2 4 6 -2'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Teluro',
            simbolo: 'Te',
            num_oxidacion: '2 4 6 -2'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Nitrógeno',
            simbolo: 'N',
            num_oxidacion: '1 2 3 4 5 -3'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Fósforo',
            simbolo: 'P',
            num_oxidacion: '1 3 5 -3'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Arsénico',
            simbolo: 'As',
            num_oxidacion: '3 5 -3'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Antimonio',
            simbolo: 'Sb',
            num_oxidacion: '3 5 -3'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Boro',
            simbolo: 'B',
            num_oxidacion: '3 -3'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Bismuto',
            simbolo: 'Bi',
            num_oxidacion: '3 5'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Carbono',
            simbolo: 'C',
            num_oxidacion: '2 4 -4'
        },
        {
            tipo: ElementoTipo["no metal"],
            nombre: 'Silicio',
            simbolo: 'Si',
            num_oxidacion: '4 -4'
        }
    ];

    Oxidacion() {
        this.juegoActual = Juego.Oxidacion;

        this.mostrar('zona-calculo');

        this.elementoPregunta = this.elementos[this.randomNumber(this.elementos.length)];

        this.zonaCalculo!.innerHTML = `
        <p>¿Cuál es número de oxidación del ${this.elementoPregunta.nombre} - ${this.elementoPregunta.simbolo}?</p>
        `
        this.zonaCalculo!.innerHTML += `
        <form id="calculo">
            <input type="text" id="respuesta" name="respuesta" class="respuesta respuesta-larga" oninput="homeWork.quitarError()">
            <button type="button" id="calcularBoton" onclick="homeWork.resolverOxidacion()" class="boton-calcular">&#9166;</button>
        </form>
        `;

        document.getElementById(`respuesta`)?.focus();
    }

    resolverOxidacion() {
        let respuestaOxidacion: string | number = (<HTMLInputElement>document.getElementById(`respuesta`)).value;

        if (this.vidas > 0 && respuestaOxidacion) {
            if (respuestaOxidacion === this.elementoPregunta.num_oxidacion) {
                this.acertar();
                this.Oxidacion();
            } else {
                console.log('FALLO');
                this.fallar();
            }
        }
    }

    // Métodos genéricos
    animar(animado: HTMLElement | null) {
        animado?.classList.add('animar');
        setTimeout(() => {
            animado?.classList.remove('animar');
        }, 1000);

    }

    quitarError() {
        document.getElementById(`respuesta`)?.classList.remove('error');
    }

    randomNumber(lessThan: number, min = 0) {
        return Math.floor(Math.random() * (lessThan - min)) + min;
    }

    esconder(paraEsconder: string) {
        document.getElementById(paraEsconder)!.style.display = 'none';
    }

    mostrar(paraMostrar: string) {
        document.getElementById(paraMostrar)!.style.display = 'block';
    }

    sonar(evento: string) {
        let random = this.randomNumber(this.AUDIO_CANTIDAD);
        let audio = new Audio(`sound/${evento}/0${random}.mp3`);
        audio.play();
    }

    preloadMP3() {
        let audioFiles: HTMLAudioElement[] = [];

        for (let i = 0; i <= this.AUDIO_CANTIDAD - 1; i++) {
            let fileName: string = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
            let audioAcierto: HTMLAudioElement = new Audio("sound/acierto/" + fileName);
            let audioError: HTMLAudioElement = new Audio("sound/error/" + fileName);
            audioAcierto.preload = "auto";
            audioError.preload = "auto";
            audioFiles.push(audioAcierto);
            audioFiles.push(audioError);
        }
    }

    borrarHTML(elementoHTML: HTMLElement) {
        elementoHTML!.innerHTML = '';
    }
};

const homeWork = new Homework();
