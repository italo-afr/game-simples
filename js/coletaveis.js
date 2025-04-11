window.bolinhas = [];
for (let i = 0; i < 5; i++) {
    bolinhas.push({ x: posicaoAleatoria(), y: posicaoAleatoria() });
}

function checarColisaoBolinhas() {
    bolinhas.forEach((b, i) => {
        if (playerPosicao.x === b.x && playerPosicao.y === b.y) {
            pontuacao++;
            bolinhas[i] = { x: posicaoAleatoria(), y: posicaoAleatoria() };
            tocarSomColeta();
            verificarMultiploDeDez(pontuacao);
            atualizarPontuacao();
        }
    });
}

function checarColisaoBolinhasBot(bot) {
    bolinhas.forEach((b, i) => {
        if (bot.x === b.x && bot.y === b.y) {
            bot.pontos++;
            bolinhas[i] = { x: posicaoAleatoria(), y: posicaoAleatoria() };
            verificarMultiploDeDez(bot.pontos);
            atualizarPontuacao();
        }
    });
}

let maxBolinhas = 100000;
let intervaloBolinhas = 800; // 0.8 segundos

setInterval(() => {
    if (bolinhas.length < maxBolinhas) {
        bolinhas.push({ x: posicaoAleatoria(), y: posicaoAleatoria() });
    }
}, intervaloBolinhas);
