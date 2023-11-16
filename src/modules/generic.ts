const AUDIO_CANTIDAD: number = 7;

export function randomNumber(lessThan: number, min = 0) {
    return Math.floor(Math.random() * (lessThan - min)) + min;
}

export function getRandomElements(array: any, n: number) {
    var result = new Array(n),
        len = array.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = randomNumber(len);
        result[n] = array[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export function shuffleArray(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function esconder(paraEsconder: string[]) {
    for (let i = 0; i < paraEsconder.length; i++) {
        document.getElementById(paraEsconder[i])!.style.display = 'none';
    }
}

export function mostrar(paraMostrar: string[]) {
    for (let i = 0; i < paraMostrar.length; i++) {
        document.getElementById(paraMostrar[i])!.style.display = 'block';
    }
}

export function sonar(evento: string) {
    let random = randomNumber(AUDIO_CANTIDAD);
    let audio = new Audio(`/src/sound/${evento}/0${random}.mp3`);
    audio.play();
}

export function preloadMP3() {
    let audioFiles: HTMLAudioElement[] = [];

    for (let i = 0; i <= AUDIO_CANTIDAD - 1; i++) {
        let fileName: string = i < 10 ? "0" + i + ".mp3" : i + ".mp3";
        let audioAcierto: HTMLAudioElement = new Audio("/src/sound/acierto/" + fileName);
        let audioError: HTMLAudioElement = new Audio("/src/sound/error/" + fileName);
        audioAcierto.preload = "auto";
        audioError.preload = "auto";
        audioFiles.push(audioAcierto);
        audioFiles.push(audioError);
    }
}

export function animar(animado: HTMLElement | null) {
    animado?.classList.add('animar');
    setTimeout(() => {
        animado?.classList.remove('animar');
    }, 1000);

}

export function quitarError() {
    (<HTMLInputElement>document.getElementById(`input-respuesta`))?.classList.remove('error');
}