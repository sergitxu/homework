import { EnglishWord, WordTipo } from './EnglishEnums';
import { englishWords } from './EnglishWords'
import { getRandomElements, mostrar, randomNumber, shuffleArray } from '../generic'
import { Juego, homeWork } from '../../main';

export let englishWordPregunta: EnglishWord = {
    tipo: WordTipo.colegio,
    texto: '',
    textoEspañol: '',
    imagen: ''
}

export function crearEnglishVocabulary() {
    const RESPUESTAS_NUM = 3;

    homeWork.juegoActual = Juego.EnglishVocabulary;
    homeWork.mostrarRecord();
    mostrar(['vidas-numero', 'puntos', 'close-button', 'zona-juego']);

    englishWordPregunta = englishWords[randomNumber(englishWords.length)];

    let englishWordsTema = englishWords.filter(word => word.tipo === englishWordPregunta.tipo);

    let englishWords_elegidas: EnglishWord[] = getRandomElements(englishWordsTema, RESPUESTAS_NUM);

    englishWordPregunta = englishWords_elegidas[0];

    shuffleArray(englishWords_elegidas);

    if (englishWordPregunta.imagen) {
        homeWork.zonaJuego!.innerHTML = `
        <h3>What is this?</h3>
        <img src="${homeWork.HOST}/img/englishWords/${englishWordPregunta.imagen}" alt="" class="pregunta-imagen" loading="lazy">
        `
    } else {
        homeWork.zonaJuego!.innerHTML = `
        <h3>Translate to English</h3>
        <p class="puntos-numero">${englishWordPregunta.textoEspañol}</p>
        `
    }
    for (let i = 0; i < RESPUESTAS_NUM; i++) {
        homeWork.zonaJuego!.innerHTML += `
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
    if (homeWork.vidas > 0) {
        if (document.getElementById('boton-calcular' + respuesta)?.innerHTML === englishWordPregunta.texto) {
            homeWork.acertar();
            crearEnglishVocabulary();
        } else {
            homeWork.fallar();
        }
    }
}