document.getElementById('calculo').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(resultado.value);
});

function randomNumber(lessThan) {    
    return Math.floor(Math.random()*lessThan);
}
randomNumber(10);