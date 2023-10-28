const AUDIO_CANTIDAD = 7;
// Métodos genéricos
export function animar(animado) {
    animado === null || animado === void 0 ? void 0 : animado.classList.add('animar');
    setTimeout(() => {
        animado === null || animado === void 0 ? void 0 : animado.classList.remove('animar');
    }, 1000);
}
export function quitarError() {
    var _a;
    (_a = document.getElementById(`respuesta`)) === null || _a === void 0 ? void 0 : _a.classList.remove('error');
}
export function randomNumber(lessThan, min = 0) {
    return Math.floor(Math.random() * (lessThan - min)) + min;
}
export function esconder(paraEsconder) {
    document.getElementById(paraEsconder).style.display = 'none';
}
export function mostrar(paraMostrar) {
    document.getElementById(paraMostrar).style.display = 'block';
}
export function sonar(evento) {
    let random = randomNumber(AUDIO_CANTIDAD);
    let audio = new Audio(`sound/${evento}/0${random}.mp3`);
    audio.play();
}
export function preloadMP3() {
    let audioFiles = [];
    for (let i = 0; i <= AUDIO_CANTIDAD - 1; i++) {
        let fileName = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
        let audioAcierto = new Audio("sound/acierto/" + fileName);
        let audioError = new Audio("sound/error/" + fileName);
        audioAcierto.preload = "auto";
        audioError.preload = "auto";
        audioFiles.push(audioAcierto);
        audioFiles.push(audioError);
    }
}
export function borrarHTML(elementoHTML) {
    elementoHTML.innerHTML = '';
}
