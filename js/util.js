
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const velocidade = 20;

function posicaoAleatoria() {
    return Math.floor(Math.random() * (canvas.width / tamanho)) * tamanho;
}

const somColeta = document.getElementById("somColeta");
const somMultiplo10 = document.getElementById("somMultiplo10");

function tocarSomColeta() {
    somColeta.currentTime = 0;
    somColeta.play();
}

function tocarSomMultiplo10() {
    somMultiplo10.currentTime = 0;
    somMultiplo10.play();
}

let ultimosMultiploDez = {};

function verificarMultiploDeDez(pontos) {
    if (pontos > 0 && pontos % 10 === 0) {
        if (!ultimosMultiploDez[pontos]) {
            ultimosMultiploDez[pontos] = true;
            try {
                tocarSomMultiplo10();
            } catch (e) {
                console.warn("Erro ao tocar som de múltiplo de 10:", e);
            }
        }
    }
}

function aplicarBarreiras(obj) {
    // Limita dentro da tela
    if (obj.x < 0) obj.x = 0;
    if (obj.x > canvas.width - tamanho) obj.x = canvas.width - tamanho;
    if (obj.y < 0) obj.y = 0;
    if (obj.y > canvas.height - tamanho) obj.y = canvas.height - tamanho;

    // Alinha ao grid
    obj.x = Math.round(obj.x / tamanho) * tamanho;
    obj.y = Math.round(obj.y / tamanho) * tamanho;
}

