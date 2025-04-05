const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const somColeta = document.getElementById("somColeta");

function posicaoAleatoria() {
    return Math.floor(Math.random() * (canvas.width / tamanho)) * tamanho;
}

function tocarSomColeta() {
    somColeta.currentTime = 0;
    somColeta.play();
}

const tamanho = 20;
const velocidade = 20;
