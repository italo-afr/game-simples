window.bots = [];

const centroCanvas = {
    x: Math.floor(canvas.width / 2 / tamanho) * tamanho,
    y: Math.floor(canvas.height / 2 / tamanho) * tamanho
};

for (let i = 0; i < 7; i++) {
    bots.push({
        x: posicaoAleatoria(),
        y: posicaoAleatoria(),
        dx: 0,
        dy: 0,
        nome: gerarNomeBot(),
        pontos: 0,
        alvo: null,
        paradoFrames: 0,
        explorando: false,
        framesExplorando: 0,
        erroHumanoFrames: 0 // novo: adiciona "erros humanos"
    });
}

function gerarNomeBot() {
    const nomes = ["Botzilla", "AIron", "Snaky", "RoboX", "BitSnake", "CobraBot"];
    return nomes[Math.floor(Math.random() * nomes.length)] + Math.floor(Math.random() * 100);
}

function mudarDirecaoBot(bot) {
    if (bolinhas.length === 0) return;

    const existe = bolinhas.some(b => bot.alvo && b.x === bot.alvo.x && b.y === bot.alvo.y);
    if (!existe) bot.alvo = null;

    if (!bot.alvo || Math.random() < 0.1) { // 10% chance de trocar alvo aleatoriamente
        bot.alvo = bolinhas.reduce((maisPerto, atual) => {
            const d1 = Math.hypot(bot.x - maisPerto.x, bot.y - maisPerto.y);
            const d2 = Math.hypot(bot.x - atual.x, bot.y - atual.y);
            return d2 < d1 ? atual : maisPerto;
        });
    }

    const alvo = bot.alvo;

    if (bot.erroHumanoFrames > 0) {
        bot.erroHumanoFrames--; // está cometendo erro, não recalcula direção
        return;
    }

    // Movimentação em ambos eixos para parecer mais natural e humana
    bot.dx = bot.x < alvo.x ? velocidade : (bot.x > alvo.x ? -velocidade : 0);
    bot.dy = bot.y < alvo.y ? velocidade : (bot.y > alvo.y ? -velocidade : 0);

    // Pequena chance de erro humano momentâneo
    if (Math.random() < 0.05) { // 5% chance de cometer um erro temporário
        const erros = [
            { dx: velocidade, dy: 0 },
            { dx: -velocidade, dy: 0 },
            { dx: 0, dy: velocidade },
            { dx: 0, dy: -velocidade }
        ];
        const erro = erros[Math.floor(Math.random() * erros.length)];
        bot.dx = erro.dx;
        bot.dy = erro.dy;
        bot.erroHumanoFrames = 2; // Erra por 2 frames
    }
}

function moverBots() {
    bots.forEach(bot => {
        const antesX = bot.x;
        const antesY = bot.y;

        bot.x += bot.dx;
        bot.y += bot.dy;

        aplicarBarreiras(bot);
        checarColisaoBolinhasBot(bot);

        const travado = bot.x === antesX && bot.y === antesY;
        const encostouNaParede = (
            bot.x <= 0 || bot.x >= canvas.width - tamanho ||
            bot.y <= 0 || bot.y >= canvas.height - tamanho
        );

        if (travado || encostouNaParede) {
            bot.paradoFrames++;
        } else {
            bot.paradoFrames = 0;
        }

        if (bot.paradoFrames >= 2) {
            bot.alvo = null;
            bot.explorando = true;
            bot.framesExplorando = 10;
            bot.paradoFrames = 0;
        }

        if (bot.explorando && bot.framesExplorando > 0) {
            if (bot.framesExplorando === 10) {
                if (Math.random() < 0.7) {
                    bot.dx = bot.x < centroCanvas.x ? velocidade : (bot.x > centroCanvas.x ? -velocidade : 0);
                    bot.dy = bot.y < centroCanvas.y ? velocidade : (bot.y > centroCanvas.y ? -velocidade : 0);
                } else {
                    const direcoes = [
                        { dx: velocidade, dy: 0 },
                        { dx: -velocidade, dy: 0 },
                        { dx: 0, dy: velocidade },
                        { dx: 0, dy: -velocidade }
                    ];
                    const escolha = direcoes[Math.floor(Math.random() * direcoes.length)];
                    bot.dx = escolha.dx;
                    bot.dy = escolha.dy;
                }
            }
            bot.framesExplorando--;
        }

        // Recalcula direção em tempo real, caso não esteja explorando
        if (!bot.explorando && bot.alvo && bot.erroHumanoFrames === 0) {
            mudarDirecaoBot(bot);
        }
    });

    renderizar();
}
