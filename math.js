// TODO añadir juego igual / distinto
// TODO separar código en módulos
// TODO Añadir tests
// TODO organizar juegos por temática / edad. Mostrar sólo enlaces a juegos sin puntos ni récord.
// TODO asociar record a cada juego
// TODO crear url por edad
// TODO crear English vocabulary
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Juego;
(function (Juego) {
    Juego[Juego["Reto"] = 0] = "Reto";
    Juego[Juego["SumaResta"] = 1] = "SumaResta";
    Juego[Juego["Oxidacion"] = 2] = "Oxidacion";
    Juego[Juego["EnglishVocabulary"] = 3] = "EnglishVocabulary";
})(Juego || (Juego = {}));
var Genero;
(function (Genero) {
    Genero[Genero["masculino"] = 0] = "masculino";
    Genero[Genero["femenino"] = 1] = "femenino";
})(Genero || (Genero = {}));
var ElementoTipo;
(function (ElementoTipo) {
    ElementoTipo[ElementoTipo["metal"] = 0] = "metal";
    ElementoTipo[ElementoTipo["no metal"] = 1] = "no metal";
})(ElementoTipo || (ElementoTipo = {}));
var Homework = /** @class */ (function () {
    function Homework() {
        var _this = this;
        this.juegoActual = Juego.Reto;
        this.puntos = 0;
        this.VIDAS_INICIALES = 3;
        this.AUDIO_CANTIDAD = 7;
        this.vidas = this.VIDAS_INICIALES;
        this.resultado = 0;
        this.zonaCalculo = document.getElementById('zona-calculo');
        this.valor_a = this.randomNumber(11);
        this.valor_b = 0;
        this.operacion = '+';
        this.gameOverDialog = document.getElementById('game-over');
        this.vidasNumero = document.getElementById('vidas-numero');
        this.puntosNumero = document.getElementById('puntos-numero');
        this.hayNuevoRecordPersonal = false;
        this.recordPersonal = localStorage.getItem('record');
        this.host = 'http://sergitxu.github.io/homework';
        this.HOSTLOCAL = '.';
        this.elementoPregunta = {
            tipo: ElementoTipo.metal,
            simbolo: '',
            nombre: '',
            num_oxidacion: ''
        };
        this.englishWordPregunta = {
            texto: '',
            textoEspañol: '',
            imagen: ''
        };
        // English vocabulary
        this.englishWordsSchool = [
            {
                texto: 'Rubber',
                textoEspañol: 'Goma de borrar',
                imagen: 'rubber.jpeg'
            },
            {
                texto: 'Pencil',
                textoEspañol: 'Lápiz',
                imagen: 'pencil.jpeg'
            },
            {
                texto: 'Pencil case',
                textoEspañol: 'Estuche',
                imagen: 'pencil-case.jpeg'
            },
            {
                texto: 'Pencil sharpener',
                textoEspañol: 'Sacapuntas',
                imagen: 'pencil-sharpener.jpeg'
            },
            {
                texto: 'Glue',
                textoEspañol: 'Pegamento',
                imagen: 'glue.jpeg'
            },
            {
                texto: 'Crayonnes',
                textoEspañol: 'Pinturas',
                imagen: 'crayonnes.jpeg'
            },
            {
                texto: 'Cook',
                textoEspañol: 'Cocinero',
                imagen: 'cook.jpeg'
            },
            {
                texto: 'Teacher',
                textoEspañol: 'Profesor',
                imagen: 'teacher.jpeg'
            },
            {
                texto: 'Librarian',
                textoEspañol: 'Bibliotecaria',
                imagen: 'librarian.jpeg'
            },
            {
                texto: 'Care taker',
                textoEspañol: 'Bedel',
                imagen: 'care-taker.jpeg'
            },
            {
                texto: 'Toilets',
                textoEspañol: 'Baños',
                imagen: 'toilets.jpeg'
            },
            {
                texto: 'Library',
                textoEspañol: 'biblioteca',
                imagen: 'library.jpeg'
            },
            {
                texto: 'Classroom',
                textoEspañol: 'Clase',
                imagen: 'class-room.jpeg'
            },
            {
                texto: 'Dining room',
                textoEspañol: 'Comedor',
                imagen: 'dinning-room.jpeg'
            },
            {
                texto: 'Playground',
                textoEspañol: 'Patio de juego',
                imagen: 'playground.jpeg'
            }
        ];
        this.englishWordsToys = [
            {
                texto: 'Doll',
                textoEspañol: 'Muñeca',
                imagen: 'doll.jpeg'
            },
            {
                texto: 'Ball',
                textoEspañol: 'Pelota',
                imagen: 'ball.jpeg'
            },
            {
                texto: 'Kite',
                textoEspañol: 'Cometa',
                imagen: 'kite.jpeg'
            },
            {
                texto: 'Bike',
                textoEspañol: 'Bici',
                imagen: 'bike.jpeg'
            },
            {
                texto: 'Car',
                textoEspañol: 'Coche',
                imagen: 'car.jpeg'
            },
            {
                texto: 'Scooter',
                textoEspañol: 'Patinete',
                imagen: 'scooter.jpeg'
            },
            {
                texto: 'Game',
                textoEspañol: 'Juego',
                imagen: 'game.jpeg'
            },
        ];
        this.englishWordsColors = [
            {
                texto: 'Red',
                textoEspañol: 'Rojo'
            },
            {
                texto: 'Orange',
                textoEspañol: 'Naranja'
            },
            {
                texto: 'Black',
                textoEspañol: 'Negro'
            },
            {
                texto: 'Blue',
                textoEspañol: 'Azul'
            },
            {
                texto: 'Green',
                textoEspañol: 'Verde'
            },
            {
                texto: 'White',
                textoEspañol: 'Blanco'
            },
            {
                texto: 'Pink',
                textoEspañol: 'Rosa'
            }
        ];
        this.englishWordsNumbers = [
            {
                texto: 'One',
                textoEspañol: 'Uno'
            },
            {
                texto: 'Two',
                textoEspañol: 'Dos'
            },
            {
                texto: 'Three',
                textoEspañol: 'Tres'
            },
            {
                texto: 'Four',
                textoEspañol: 'Cuatro'
            },
            {
                texto: 'Five',
                textoEspañol: 'Cinco'
            }
        ];
        this.englishWordsWeekDays = [
            {
                texto: 'Monday',
                textoEspañol: 'Lunes'
            },
            {
                texto: 'Tuesday',
                textoEspañol: 'Martes'
            },
            {
                texto: 'Wednesday',
                textoEspañol: 'Miércoles'
            },
            {
                texto: 'Thursday',
                textoEspañol: 'Jueves'
            },
            {
                texto: 'Friday',
                textoEspañol: 'Viernes'
            },
            {
                texto: 'Saturday',
                textoEspañol: 'Sábado'
            },
            {
                texto: 'Sunday',
                textoEspañol: 'Domingo'
            }
        ];
        this.englishWordsAdjectives = [
            {
                texto: 'New',
                textoEspañol: 'Nuevo'
            },
            {
                texto: 'Big',
                textoEspañol: 'Grande'
            },
            {
                texto: 'Small',
                textoEspañol: 'Pequeño'
            },
            {
                texto: 'Fast',
                textoEspañol: 'Rápido'
            },
            {
                texto: 'Slow',
                textoEspañol: 'Lento'
            }
        ];
        this.englishWordsFamily = [
            {
                texto: 'Brother',
                textoEspañol: 'Hermano'
            },
            {
                texto: 'Sister',
                textoEspañol: 'Hermana'
            },
            {
                texto: 'Mum',
                textoEspañol: 'Mamá'
            },
            {
                texto: 'Dad',
                textoEspañol: 'Papá'
            }
        ];
        this.englishWordsOthers = [
            {
                texto: 'Alien',
                textoEspañol: '',
                imagen: 'alien.jpeg'
            },
            {
                texto: 'Button',
                textoEspañol: '',
                imagen: 'button.jpeg'
            },
            {
                texto: 'Robot',
                textoEspañol: '',
                imagen: 'robot.jpeg'
            },
        ];
        // oxidacion
        this.elementos = [
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
                nombre: 'Manganeso',
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
        this.actualizarPuntos();
        this.actualizarVidas();
        this.preloadMP3();
        this.mostrarRecord();
        addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && _this.juegoActual !== Juego.Oxidacion) {
                e.preventDefault();
                _this.calcular();
            }
            else if (e.key === 'Enter' && _this.juegoActual === Juego.Oxidacion) {
                e.preventDefault();
                _this.resolverOxidacion();
            }
        });
        this.gameOverDialog.addEventListener("close", function (event) {
            _this.reiniciarJuego();
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
    Homework.prototype.reiniciarJuego = function () {
        this.resetearVidasPuntos();
        this.esconder('zona-calculo');
        this.mostrar('empezar');
        this.mostrar('boton-oxidacion');
        this.mostrarRecord();
    };
    Homework.prototype.mostrarRecord = function () {
        if (this.recordPersonal) {
            document.getElementById('puntos-record').innerText = this.recordPersonal;
            this.mostrar('record');
        }
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
        this.gameOverDialog.innerHTML = "<h1>\u00A1ENHORABUENA!</h1>";
        if (this.puntos === 1) {
            this.gameOverDialog.innerHTML += "<p>Has conseguido <span class=\"puntos-numero\">".concat(this.puntos, "</span> punto.</p>");
        }
        else {
            this.gameOverDialog.innerHTML += "<p>Has conseguido <span class=\"puntos-numero\">".concat(this.puntos, "</span> puntos.</p>");
        }
        if (this.hayNuevoRecordPersonal) {
            this.gameOverDialog.innerHTML += "\n            <h2>\u00A1\u00A1Has mejorado tu record personal!!</h2>\n            ";
        }
        if (this.juegoActual === Juego.Oxidacion) {
            this.gameOverDialog.innerHTML += "\n            <small>El n\u00FAmero de oxidaci\u00F3n del ".concat(this.elementoPregunta.nombre, " - ").concat(this.elementoPregunta.simbolo, " era <span class=\"resultado-number\">").concat(this.elementoPregunta.num_oxidacion, "</span>.</small><br>\n            <form method=\"dialog\">\n                <button class=\"empezar\">OK</button>\n            </form>\n            ");
        }
        else {
            this.gameOverDialog.innerHTML += "\n            <small>La respuesta correcta a ".concat(this.valor_a, " ").concat(this.operacion, " ").concat(this.valor_b, " era <span class=\"resultado-number\">").concat(this.resultado, "</span>.</small><br>\n            <form method=\"dialog\">\n                <button class=\"empezar\">OK</button>\n            </form>\n            ");
        }
    };
    Homework.prototype.manejarRecord = function () {
        if (!this.recordPersonal || this.puntos > Number(this.recordPersonal)) {
            this.hayNuevoRecordPersonal = true;
            localStorage.setItem('record', this.puntos.toString());
            this.recordPersonal = this.puntos.toString();
        }
        else {
            this.hayNuevoRecordPersonal = false;
        }
    };
    // Retos
    Homework.prototype.crearReto = function () {
        var _a;
        this.juegoActual = Juego.Reto;
        var nombres = ['Jon', 'Adri', 'Yago', 'Jacob', 'Asher', 'Enzo', 'Ginebra', 'Eva', 'Daniela', 'Antonio', 'Maria',
            'Xabi', 'Alba', 'Sophie', 'Valentina', 'Carla', 'Salomé', 'Jaime', 'Nicholas', 'Eva', 'Boris', 'Diana', 'Marina', 'Alex',
            'Sergio', 'David', 'Leonor', 'Bruna', 'Alaia', 'Sofía', 'Ángela', 'Nor', 'Sarah', 'Valeria', 'David', 'Manuel', 'Paula',
            'Fiorella', 'Martín', 'Noha', 'Samuel', 'Gabriel', 'Alicia', 'Sebastián', 'Noa', 'Ignacio', 'Emma'];
        var cosas = [
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
        var nombres_elegidos = this.getRandomElements(nombres, 2);
        var nombre_a = nombres_elegidos[0];
        var nombre_b = nombres_elegidos[1];
        var cosa_x = cosas[this.randomNumber(cosas.length)];
        var operacionAzar = this.randomNumber(2);
        this.valor_a = this.randomNumber(11);
        if (operacionAzar === 0) {
            this.operacion = "+";
            this.valor_b = this.randomNumber(11);
        }
        else {
            this.operacion = "-";
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a, 1);
        }
        this.mostrar('zona-calculo');
        this.zonaCalculo.innerHTML = "\n        ".concat(nombre_a, " tiene <span class=\"puntos-numero\">").concat(this.valor_a, "</span> \n        ");
        if (this.valor_a === 1) {
            this.zonaCalculo.innerHTML += "\n            ".concat(cosa_x.nombre_singular, ".\n            ");
        }
        else {
            this.zonaCalculo.innerHTML += "\n            ".concat(cosa_x.nombre_plural, ".\n            ");
        }
        if (this.operacion === '+') {
            this.zonaCalculo.innerHTML += "\n            <br>\n            ".concat(nombre_b, " le da <span class=\"puntos-numero\">").concat(this.valor_b, "</span>.\n            ");
        }
        else if (this.operacion === '-') {
            this.zonaCalculo.innerHTML += "\n            <br>\n            Pierde <span class=\"puntos-numero\">".concat(this.valor_b, "</span>.\n            ");
        }
        else
            (console.error('No sé que operación es esa.'));
        if (cosa_x.genero === Genero.masculino) {
            this.zonaCalculo.innerHTML += "<br>\u00BFCu\u00E1ntos";
        }
        else {
            this.zonaCalculo.innerHTML += "<br>\u00BFCu\u00E1ntas";
        }
        this.zonaCalculo.innerHTML += "\n        ".concat(cosa_x.nombre_plural, " tiene ahora ").concat(nombre_a, "?\n        \n        <form id=\"calculo\">\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    // Operacion de sumas y restas
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
            this.valor_a = this.randomNumber(11, 2);
            this.valor_b = this.randomNumber(this.valor_a);
        }
        this.mostrar('zona-calculo');
        this.zonaCalculo.innerHTML = "\n        <form id=\"calculo\">\n            <span id=\"cifra-a\" class=\"cifra\">".concat(this.valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(this.operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(this.valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <br>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    Homework.prototype.EnglishVocabulary = function () {
        var RESPUESTAS_NUM = 3;
        this.juegoActual = Juego.EnglishVocabulary;
        this.mostrar('zona-calculo');
        var englishWords = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.englishWordsSchool, true), this.englishWordsColors, true), this.englishWordsNumbers, true), this.englishWordsWeekDays, true), this.englishWordsAdjectives, true), this.englishWordsFamily, true), this.englishWordsOthers, true);
        var englishWords_elegidas = this.getRandomElements(englishWords, RESPUESTAS_NUM);
        this.englishWordPregunta = englishWords_elegidas[0];
        this.shuffleArray(englishWords_elegidas);
        if (this.englishWordPregunta.imagen) {
            this.zonaCalculo.innerHTML = "\n            <h3>What is this?</h3>\n            <img src=\"".concat(this.HOSTLOCAL, "/img/englishWords/").concat(this.englishWordPregunta.imagen, "\" alt=\"\">\n            ");
        }
        else {
            this.zonaCalculo.innerHTML = "\n            <h3>Translate to English</h3>\n            <span>".concat(this.englishWordPregunta.textoEspañol, "</span>\n            ");
        }
        for (var i = 0; i < RESPUESTAS_NUM; i++) {
            this.zonaCalculo.innerHTML += "\n            <button type=\"button\" id=\"calcularBoton".concat(i, "\" onclick=\"homeWork.resolverEnglishVocabulary(").concat(i, ")\" class=\"boton-calcular\">").concat(englishWords_elegidas[i].texto, "</button>\n            ");
        }
    };
    Homework.prototype.resolverEnglishVocabulary = function (respuesta) {
        var _a;
        if (((_a = document.getElementById('calcularBoton' + respuesta)) === null || _a === void 0 ? void 0 : _a.innerHTML) === this.englishWordPregunta.texto) {
            this.acertar();
            this.EnglishVocabulary();
        }
        else {
            this.fallar();
        }
    };
    Homework.prototype.Oxidacion = function () {
        var _a;
        this.juegoActual = Juego.Oxidacion;
        this.mostrar('zona-calculo');
        this.elementoPregunta = this.elementos[this.randomNumber(this.elementos.length)];
        this.zonaCalculo.innerHTML = "\n        <p>\u00BFCu\u00E1l es n\u00FAmero de oxidaci\u00F3n del ".concat(this.elementoPregunta.nombre, " - ").concat(this.elementoPregunta.simbolo, "?</p>\n        ");
        this.zonaCalculo.innerHTML += "\n        <form id=\"calculo\">\n            <input type=\"text\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta respuesta-larga\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.resolverOxidacion()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ";
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    Homework.prototype.resolverOxidacion = function () {
        var respuestaOxidacion = document.getElementById("respuesta").value;
        if (this.vidas > 0 && respuestaOxidacion) {
            if (respuestaOxidacion === this.elementoPregunta.num_oxidacion) {
                this.acertar();
                this.Oxidacion();
            }
            else {
                this.fallar();
            }
        }
    };
    // Métodos genéricos
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
    Homework.prototype.randomNumber = function (lessThan, min) {
        if (min === void 0) { min = 0; }
        return Math.floor(Math.random() * (lessThan - min)) + min;
    };
    Homework.prototype.getRandomElements = function (array, n) {
        var result = new Array(n), len = array.length, taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = this.randomNumber(len);
            result[n] = array[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };
    Homework.prototype.shuffleArray = function (array) {
        var _a;
        var currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            _a = [
                array[randomIndex], array[currentIndex]
            ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    Homework.prototype.esconder = function (paraEsconder) {
        document.getElementById(paraEsconder).style.display = 'none';
    };
    Homework.prototype.mostrar = function (paraMostrar) {
        document.getElementById(paraMostrar).style.display = 'block';
    };
    Homework.prototype.sonar = function (evento) {
        var random = this.randomNumber(this.AUDIO_CANTIDAD);
        var audio = new Audio("sound/".concat(evento, "/0").concat(random, ".mp3"));
        audio.play();
    };
    Homework.prototype.preloadMP3 = function () {
        var audioFiles = [];
        for (var i = 0; i <= this.AUDIO_CANTIDAD - 1; i++) {
            var fileName = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
            var audioAcierto = new Audio("sound/acierto/" + fileName);
            var audioError = new Audio("sound/error/" + fileName);
            audioAcierto.preload = "auto";
            audioError.preload = "auto";
            audioFiles.push(audioAcierto);
            audioFiles.push(audioError);
        }
    };
    Homework.prototype.borrarHTML = function (elementoHTML) {
        elementoHTML.innerHTML = '';
    };
    return Homework;
}());
;
var homeWork = new Homework();
