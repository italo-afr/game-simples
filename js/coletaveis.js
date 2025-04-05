let bolinhas = [];
for (let i = 0; i < 5; i++) {
    bolinhas.push({ x: posicaoAleatoria(), y: posicaoAleatoria() });
}

function checarColisaoBolinhas() {
    bolinhas.forEach((b, i) => {
        if (playerPosicao.x === b.x && playerPosicao.y === b.y) {
            pontuacao++;
            bolinhas[i] = { x: posicaoAleatoria(), y: posicaoAleatoria() };
            tocarSomColeta();
            atualizarPontuacao();
        }
    });
}

function checarColisaoBolinhasBot(bot) {
    bolinhas.forEach((b, i) => {
        if (bot.x === b.x && bot.y === b.y) {
            bot.pontos++;
            bolinhas[i] = { x: posicaoAleatoria(), y: posicaoAleatoria() };
            atualizarPontuacao();
        }
    });
}
