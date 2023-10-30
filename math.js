// TODO separar código en módulos
// TODO Añadir tests
// TODO organizar juegos por temática / edad.
// TODO crear url por edad
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
var WordTipo;
(function (WordTipo) {
    WordTipo[WordTipo["colegio"] = 0] = "colegio";
    WordTipo[WordTipo["juguetes"] = 1] = "juguetes";
    WordTipo[WordTipo["colores"] = 2] = "colores";
    WordTipo[WordTipo["numeros"] = 3] = "numeros";
    WordTipo[WordTipo["dias"] = 4] = "dias";
    WordTipo[WordTipo["adjetivos"] = 5] = "adjetivos";
    WordTipo[WordTipo["familia"] = 6] = "familia";
    WordTipo[WordTipo["otros"] = 7] = "otros";
})(WordTipo || (WordTipo = {}));
var Homework = /** @class */ (function () {
    function Homework() {
        var _this = this;
        this.VIDAS_INICIALES = 3;
        this.AUDIO_CANTIDAD = 7;
        this.HOST = 'https://sergitxu.github.io/homework';
        this.HOSTLOCAL = '.';
        this.juegoActual = Juego.Reto;
        this.puntos = 0;
        this.vidas = this.VIDAS_INICIALES;
        this.resultado = 0;
        this.zonaJuego = document.getElementById('zona-juego');
        this.valor_a = this.randomNumber(11);
        this.valor_b = 0;
        this.operacion = '+';
        this.gameOverDialog = document.getElementById('game-over');
        this.vidasNumero = document.getElementById('vidas-numero');
        this.puntosNumero = document.getElementById('puntos-numero');
        this.hayNuevoRecordPersonal = false;
        this.recordPersonalReto = localStorage.getItem('record-reto');
        this.recordPersonalSumaResta = localStorage.getItem('record-sumaresta');
        this.recordPersonalOxidacion = localStorage.getItem('record-oxidacion');
        this.recordPersonalEnglish = localStorage.getItem('record-english');
        this.elementoPregunta = {
            tipo: ElementoTipo.metal,
            simbolo: '',
            nombre: '',
            num_oxidacion: ''
        };
        this.englishWordPregunta = {
            tipo: WordTipo.colegio,
            texto: '',
            textoEspañol: '',
            imagen: ''
        };
        // English vocabulary
        this.englishWords = [
            {
                tipo: WordTipo.colegio,
                texto: 'Rubber',
                textoEspañol: 'Goma de borrar',
                imagen: 'rubber.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Pencil',
                textoEspañol: 'Lápiz',
                imagen: 'pencil.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Pencil case',
                textoEspañol: 'Estuche',
                imagen: 'pencil-case.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Pencil sharpener',
                textoEspañol: 'Sacapuntas',
                imagen: 'pencil-sharpener.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Glue',
                textoEspañol: 'Pegamento',
                imagen: 'glue.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Crayonnes',
                textoEspañol: 'Pinturas',
                imagen: 'crayonnes.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Cook',
                textoEspañol: 'Cocinero',
                imagen: 'cook.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Teacher',
                textoEspañol: 'Profesor',
                imagen: 'teacher.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Librarian',
                textoEspañol: 'Bibliotecaria',
                imagen: 'librarian.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Care taker',
                textoEspañol: 'Bedel',
                imagen: 'care-taker.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Toilets',
                textoEspañol: 'Baños',
                imagen: 'toilets.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Library',
                textoEspañol: 'biblioteca',
                imagen: 'library.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Classroom',
                textoEspañol: 'Clase',
                imagen: 'class-room.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Dining room',
                textoEspañol: 'Comedor',
                imagen: 'dinning-room.jpeg'
            },
            {
                tipo: WordTipo.colegio,
                texto: 'Playground',
                textoEspañol: 'Patio de juego',
                imagen: 'playground.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Doll',
                textoEspañol: 'Muñeca',
                imagen: 'doll.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Ball',
                textoEspañol: 'Pelota',
                imagen: 'ball.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Kite',
                textoEspañol: 'Cometa',
                imagen: 'kite.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Bike',
                textoEspañol: 'Bici',
                imagen: 'bike.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Car',
                textoEspañol: 'Coche',
                imagen: 'car.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Scooter',
                textoEspañol: 'Patinete',
                imagen: 'scooter.jpeg'
            },
            {
                tipo: WordTipo.juguetes,
                texto: 'Game',
                textoEspañol: 'Juego',
                imagen: 'game.jpeg'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Red',
                textoEspañol: 'Rojo'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Orange',
                textoEspañol: 'Naranja'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Black',
                textoEspañol: 'Negro'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Blue',
                textoEspañol: 'Azul'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Green',
                textoEspañol: 'Verde'
            },
            {
                tipo: WordTipo.colores,
                texto: 'White',
                textoEspañol: 'Blanco'
            },
            {
                tipo: WordTipo.colores,
                texto: 'Pink',
                textoEspañol: 'Rosa'
            },
            {
                tipo: WordTipo.numeros,
                texto: 'One',
                textoEspañol: 'Uno'
            },
            {
                tipo: WordTipo.numeros,
                texto: 'Two',
                textoEspañol: 'Dos'
            },
            {
                tipo: WordTipo.numeros,
                texto: 'Three',
                textoEspañol: 'Tres'
            },
            {
                tipo: WordTipo.numeros,
                texto: 'Four',
                textoEspañol: 'Cuatro'
            },
            {
                tipo: WordTipo.numeros,
                texto: 'Five',
                textoEspañol: 'Cinco'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Monday',
                textoEspañol: 'Lunes'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Tuesday',
                textoEspañol: 'Martes'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Wednesday',
                textoEspañol: 'Miércoles'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Thursday',
                textoEspañol: 'Jueves'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Friday',
                textoEspañol: 'Viernes'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Saturday',
                textoEspañol: 'Sábado'
            },
            {
                tipo: WordTipo.dias,
                texto: 'Sunday',
                textoEspañol: 'Domingo'
            },
            {
                tipo: WordTipo.adjetivos,
                texto: 'New',
                textoEspañol: 'Nuevo'
            },
            {
                tipo: WordTipo.adjetivos,
                texto: 'Big',
                textoEspañol: 'Grande'
            },
            {
                tipo: WordTipo.adjetivos,
                texto: 'Small',
                textoEspañol: 'Pequeño'
            },
            {
                tipo: WordTipo.adjetivos,
                texto: 'Fast',
                textoEspañol: 'Rápido'
            },
            {
                tipo: WordTipo.adjetivos,
                texto: 'Slow',
                textoEspañol: 'Lento'
            },
            {
                tipo: WordTipo.familia,
                texto: 'Brother',
                textoEspañol: 'Hermano'
            },
            {
                tipo: WordTipo.familia,
                texto: 'Sister',
                textoEspañol: 'Hermana'
            },
            {
                tipo: WordTipo.familia,
                texto: 'Mum',
                textoEspañol: 'Mamá'
            },
            {
                tipo: WordTipo.familia,
                texto: 'Dad',
                textoEspañol: 'Papá'
            },
            {
                tipo: WordTipo.otros,
                texto: 'Alien',
                textoEspañol: '',
                imagen: 'alien.jpeg'
            },
            {
                tipo: WordTipo.otros,
                texto: 'Button',
                textoEspañol: '',
                imagen: 'button.jpeg'
            },
            {
                tipo: WordTipo.otros,
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
        this.esconder(['zona-juego', 'vidas-numero', 'puntos', 'record', 'close-button']);
        this.mostrar(['empezar', 'boton-oxidacion']);
    };
    Homework.prototype.mostrarRecord = function () {
        switch (this.juegoActual) {
            case Juego.Reto: {
                if (this.recordPersonalReto) {
                    document.getElementById('puntos-record').innerText = this.recordPersonalReto;
                    this.mostrar(['record']);
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.SumaResta: {
                if (this.recordPersonalSumaResta) {
                    document.getElementById('puntos-record').innerText = this.recordPersonalSumaResta;
                    this.mostrar(['record']);
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.Oxidacion: {
                if (this.recordPersonalOxidacion) {
                    document.getElementById('puntos-record').innerText = this.recordPersonalOxidacion;
                    this.mostrar(['record']);
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.EnglishVocabulary: {
                if (this.recordPersonalEnglish) {
                    document.getElementById('puntos-record').innerText = this.recordPersonalEnglish;
                    this.mostrar(['record']);
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
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
        if (document.getElementById('calcularBoton')) {
            document.getElementById('calcularBoton').disabled = true;
        }
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
        switch (this.juegoActual) {
            case Juego.Oxidacion: {
                this.gameOverDialog.innerHTML += "\n                <small>El n\u00FAmero de oxidaci\u00F3n del ".concat(this.elementoPregunta.nombre, " - ").concat(this.elementoPregunta.simbolo, " era <span class=\"resultado-number\">").concat(this.elementoPregunta.num_oxidacion, "</span>.</small><br>\n                <form method=\"dialog\">\n                    <button class=\"empezar\">OK</button>\n                </form>\n                ");
                break;
            }
            case Juego.Reto: {
                this.gameOverDialog.innerHTML += "\n                <small>La respuesta correcta a ".concat(this.valor_a, " ").concat(this.operacion, " ").concat(this.valor_b, " era <span class=\"resultado-number\">").concat(this.resultado, "</span>.</small><br>\n                <form method=\"dialog\">\n                    <button class=\"empezar\">OK</button>\n                </form>\n                ");
                break;
            }
            case Juego.SumaResta: {
                this.gameOverDialog.innerHTML += "\n                <small>La respuesta correcta a ".concat(this.valor_a, " ").concat(this.operacion, " ").concat(this.valor_b, " era <span class=\"resultado-number\">").concat(this.resultado, "</span>.</small><br>\n                <form method=\"dialog\">\n                    <button class=\"empezar\">OK</button>\n                </form>\n                ");
                break;
            }
            case Juego.EnglishVocabulary: {
                this.gameOverDialog.innerHTML += "\n                <small>La respuesta correcta era <span class=\"resultado-number\">".concat(this.englishWordPregunta.texto, "</span>.</small><br>\n                <form method=\"dialog\">\n                    <button class=\"empezar\">OK</button>\n                </form>\n                ");
                break;
            }
        }
    };
    Homework.prototype.manejarRecord = function () {
        switch (this.juegoActual) {
            case Juego.Reto: {
                if (!this.recordPersonalReto || this.puntos > Number(this.recordPersonalReto)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-reto', this.puntos.toString());
                    this.recordPersonalReto = this.puntos.toString();
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.SumaResta: {
                if (!this.recordPersonalSumaResta || this.puntos > Number(this.recordPersonalSumaResta)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-sumaresta', this.puntos.toString());
                    this.recordPersonalSumaResta = this.puntos.toString();
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.Oxidacion: {
                if (!this.recordPersonalOxidacion || this.puntos > Number(this.recordPersonalOxidacion)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-oxidacion', this.puntos.toString());
                    this.recordPersonalOxidacion = this.puntos.toString();
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
            case Juego.EnglishVocabulary: {
                if (!this.recordPersonalEnglish || this.puntos > Number(this.recordPersonalEnglish)) {
                    this.hayNuevoRecordPersonal = true;
                    localStorage.setItem('record-english', this.puntos.toString());
                    this.recordPersonalEnglish = this.puntos.toString();
                }
                else {
                    this.hayNuevoRecordPersonal = false;
                }
                break;
            }
        }
    };
    // Retos
    Homework.prototype.crearReto = function () {
        var _a;
        this.juegoActual = Juego.Reto;
        this.mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
        this.mostrarRecord();
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
        this.zonaJuego.innerHTML = "\n        ".concat(nombre_a, " tiene <span class=\"puntos-numero\">").concat(this.valor_a, "</span> \n        ");
        if (this.valor_a === 1) {
            this.zonaJuego.innerHTML += "\n            ".concat(cosa_x.nombre_singular, ".\n            ");
        }
        else {
            this.zonaJuego.innerHTML += "\n            ".concat(cosa_x.nombre_plural, ".\n            ");
        }
        if (this.operacion === '+') {
            this.zonaJuego.innerHTML += "\n            <br>\n            ".concat(nombre_b, " le da <span class=\"puntos-numero\">").concat(this.valor_b, "</span>.\n            ");
        }
        else if (this.operacion === '-') {
            this.zonaJuego.innerHTML += "\n            <br>\n            Pierde <span class=\"puntos-numero\">".concat(this.valor_b, "</span>.\n            ");
        }
        else
            (console.error('No sé que operación es esa.'));
        if (cosa_x.genero === Genero.masculino) {
            this.zonaJuego.innerHTML += "<br>\u00BFCu\u00E1ntos";
        }
        else {
            this.zonaJuego.innerHTML += "<br>\u00BFCu\u00E1ntas";
        }
        this.zonaJuego.innerHTML += "\n        ".concat(cosa_x.nombre_plural, " tiene ahora ").concat(nombre_a, "?\n        \n        <form id=\"calculo\">\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    // Operacion de sumas y restas
    Homework.prototype.crearOperacion = function () {
        var _a;
        this.juegoActual = Juego.SumaResta;
        this.mostrarRecord();
        this.mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
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
        this.zonaJuego.innerHTML = "\n        <form id=\"calculo\">\n            <span id=\"cifra-a\" class=\"cifra\">".concat(this.valor_a, "</span>\n            <span id=\"operacion\" class=\"operacion\">").concat(this.operacion, "</span>\n            <span id=\"cifra-b\" class=\"cifra\">").concat(this.valor_b, "</span>\n            <span class=\"cifra\"> = </span>\n            <br>\n            <input type=\"number\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.calcular()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ");
        (_a = document.getElementById("respuesta")) === null || _a === void 0 ? void 0 : _a.focus();
    };
    Homework.prototype.crearEnglishVocabulary = function () {
        var _this = this;
        var RESPUESTAS_NUM = 3;
        this.juegoActual = Juego.EnglishVocabulary;
        this.mostrarRecord();
        this.mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
        this.englishWordPregunta = this.englishWords[this.randomNumber(this.englishWords.length)];
        var englishWordsTema = this.englishWords.filter(function (word) { return word.tipo === _this.englishWordPregunta.tipo; });
        var englishWords_elegidas = this.getRandomElements(englishWordsTema, RESPUESTAS_NUM);
        this.englishWordPregunta = englishWords_elegidas[0];
        this.shuffleArray(englishWords_elegidas);
        if (this.englishWordPregunta.imagen) {
            this.zonaJuego.innerHTML = "\n            <h3>What is this?</h3>\n            <img src=\"".concat(this.HOST, "/img/englishWords/").concat(this.englishWordPregunta.imagen, "\" alt=\"\" class=\"pregunta-imagen\" loading=\"lazy\">\n            ");
        }
        else {
            this.zonaJuego.innerHTML = "\n            <h3>Translate to English</h3>\n            <p class=\"puntos-numero\">".concat(this.englishWordPregunta.textoEspañol, "</p>\n            ");
        }
        for (var i = 0; i < RESPUESTAS_NUM; i++) {
            this.zonaJuego.innerHTML += "\n            <button type=\"button\" id=\"calcularBoton".concat(i, "\" onclick=\"homeWork.resolverEnglishVocabulary(").concat(i, ")\" class=\"boton-calcular\">").concat(englishWords_elegidas[i].texto, "</button>\n            ");
        }
    };
    Homework.prototype.resolverEnglishVocabulary = function (respuesta) {
        var _a;
        if (this.vidas > 0) {
            if (((_a = document.getElementById('calcularBoton' + respuesta)) === null || _a === void 0 ? void 0 : _a.innerHTML) === this.englishWordPregunta.texto) {
                this.acertar();
                this.crearEnglishVocabulary();
            }
            else {
                this.fallar();
            }
        }
    };
    Homework.prototype.Oxidacion = function () {
        var _a;
        this.juegoActual = Juego.Oxidacion;
        this.mostrarRecord();
        this.mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);
        this.elementoPregunta = this.elementos[this.randomNumber(this.elementos.length)];
        this.zonaJuego.innerHTML = "\n        <p>\u00BFCu\u00E1l es n\u00FAmero de oxidaci\u00F3n del <span class=\"puntos-numero\">".concat(this.elementoPregunta.nombre, " - ").concat(this.elementoPregunta.simbolo, "</span>?</p>\n        ");
        this.zonaJuego.innerHTML += "\n        <form id=\"calculo\">\n            <input type=\"text\" id=\"respuesta\" name=\"respuesta\" class=\"respuesta respuesta-larga\" oninput=\"homeWork.quitarError()\">\n            <button type=\"button\" id=\"calcularBoton\" onclick=\"homeWork.resolverOxidacion()\" class=\"boton-calcular\">&#9166;</button>\n        </form>\n        ";
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
        for (var i = 0; i < paraEsconder.length; i++) {
            document.getElementById(paraEsconder[i]).style.display = 'none';
        }
    };
    Homework.prototype.mostrar = function (paraMostrar) {
        console.log(paraMostrar);
        for (var i = 0; i < paraMostrar.length; i++) {
            console.log(paraMostrar[i]);
            document.getElementById(paraMostrar[i]).style.display = 'block';
        }
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
