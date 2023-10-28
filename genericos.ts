const AUDIO_CANTIDAD: number = 7;

// Métodos genéricos
export function animar(animado: HTMLElement | null) {
    animado?.classList.add('animar');
    setTimeout(() => {
        animado?.classList.remove('animar');
    }, 1000);

}

export function quitarError() {
    document.getElementById(`respuesta`)?.classList.remove('error');
}

export function randomNumber(lessThan: number, min = 0): number {
    return Math.floor(Math.random() * (lessThan - min)) + min;
}

export function esconder(paraEsconder: string) {
    document.getElementById(paraEsconder)!.style.display = 'none';
}

export function mostrar(paraMostrar: string) {
    document.getElementById(paraMostrar)!.style.display = 'block';
}

export function sonar(evento: string) {
    let random = randomNumber(AUDIO_CANTIDAD);
    let audio = new Audio(`sound/${evento}/0${random}.mp3`);
    audio.play();
}

export function preloadMP3() {
    let audioFiles: HTMLAudioElement[] = [];

    for (let i = 0; i <= AUDIO_CANTIDAD - 1; i++) {
        let fileName: string = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
        let audioAcierto: HTMLAudioElement = new Audio("sound/acierto/" + fileName);
        let audioError: HTMLAudioElement = new Audio("sound/error/" + fileName);
        audioAcierto.preload = "auto";
        audioError.preload = "auto";
        audioFiles.push(audioAcierto);
        audioFiles.push(audioError);
    }
}

export function borrarHTML(elementoHTML: HTMLElement) {
    elementoHTML!.innerHTML = '';
}