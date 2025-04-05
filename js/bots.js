let bots = [];

for (let i = 0; i < 3; i++) {
    bots.push({
        x: posicaoAleatoria(),
        y: posicaoAleatoria(),
        dx: 0,
        dy: 0,
        nome: gerarNomeBot(),
        pontos: 0
    });
    mudarDirecaoBot(bots[i]);
}

function gerarNomeBot() {
    const nomes = ["Botzilla", "AIron", "Snaky", "RoboX", "BitSnake", "CobraBot"];
    return nomes[Math.floor(Math.random() * nomes.length)] + Math.floor(Math.random() * 100);
}

function moverBots() {
    bots.forEach(bot => {
        bot.x += bot.dx;
        bot.y += bot.dy;
        teleportar(bot);
        checarColisaoBolinhasBot(bot);
    });
    renderizar();
}

function mudarDirecaoBot(bot) {
    const direcoes = [
        { dx: velocidade, dy: 0 },
        { dx: -velocidade, dy: 0 },
        { dx: 0, dy: velocidade },
        { dx: 0, dy: -velocidade }
    ];
    const nova = direcoes[Math.floor(Math.random() * direcoes.length)];
    bot.dx = nova.dx;
    bot.dy = nova.dy;
}
