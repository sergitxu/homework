import * as englishEnums from './EnglishEnums'
import * as englishWords from './EnglishWords'
import * as generic from '../generic'
import * as main from '../main'

export let englishWordPregunta: englishEnums.EnglishWord = {
    tipo: englishEnums.WordTipo.colegio,
    texto: '',
    textoEspañol: '',
    imagen: ''
}

export function crearEnglishVocabulary() {
    const RESPUESTAS_NUM = 3;

    main.homeWork.juegoActual = main.Juego.EnglishVocabulary;
    main.homeWork.mostrarRecord();
    generic.mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);

    englishWordPregunta = englishWords.englishWords[generic.randomNumber(englishWords.englishWords.length)];

    let englishWordsTema = englishWords.englishWords.filter(word => word.tipo === englishWordPregunta.tipo);

    let englishWords_elegidas: englishEnums.EnglishWord[] = generic.getRandomElements(englishWordsTema, RESPUESTAS_NUM);

    englishWordPregunta = englishWords_elegidas[0];

    generic.shuffleArray(englishWords_elegidas);

    if (englishWordPregunta.imagen) {
        main.homeWork.zonaJuego!.innerHTML = `
        <h3>What is this?</h3>
        <img src="${main.homeWork.HOST}/img/englishWords/${englishWordPregunta.imagen}" alt="" class="pregunta-imagen" loading="lazy">
        `
    } else {
        main.homeWork.zonaJuego!.innerHTML = `
        <h3>Translate to English</h3>
        <p class="puntos-numero">${englishWordPregunta.textoEspañol}</p>
        `
    }
    for (let i = 0; i < RESPUESTAS_NUM; i++) {
        main.homeWork.zonaJuego!.innerHTML += `
        <button type="button" id="boton-calcular${i}" class="boton-calcular">${englishWords_elegidas[i].texto}</button>
        `
    }
    for (let i = 0; i < RESPUESTAS_NUM; i++) {
        document.getElementById(`boton-calcular${i}`)?.addEventListener("click", () => {
            resolverEnglishVocabulary(i);
        });
    }
}

export function resolverEnglishVocabulary(respuesta: number) {
    if (main.homeWork.vidas > 0) {
        if (document.getElementById('boton-calcular' + respuesta)?.innerHTML === englishWordPregunta.texto) {
            main.homeWork.acertar();
            crearEnglishVocabulary();
        } else {
            main.homeWork.fallar();
        }
    }
}