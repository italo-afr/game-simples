function teleportar(obj) {
    if (obj.x < 0) obj.x = canvas.width - tamanho;
    else if (obj.x >= canvas.width) obj.x = 0;

    if (obj.y < 0) obj.y = canvas.height - tamanho;
    else if (obj.y >= canvas.height) obj.y = 0;
}

function atualizarPontuacao() {
    document.getElementById("pontuacaoJogador").innerText = `Você: ${pontuacao}`;
    let lista = bots
        .sort((a, b) => b.pontos - a.pontos)
        .map(bot => `<li>${bot.nome}: ${bot.pontos}</li>`)
        .join("");
    document.getElementById("rankingBots").innerHTML = lista;
}

function renderizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(playerPosicao.x, playerPosicao.y, tamanho, tamanho);

    ctx.fillStyle = "red";
    bots.forEach(bot => {
        ctx.fillRect(bot.x, bot.y, tamanho, tamanho);
    });

    ctx.fillStyle = "green";
    bolinhas.forEach(b => {
        ctx.fillRect(b.x, b.y, tamanho, tamanho);
    });
}

function iniciarJogo() {
    document.getElementById("botaoIniciar").style.display = "none";
    window.addEventListener("keydown", movPlayer);

    setInterval(() => bots.forEach(mudarDirecaoBot), 1000);
    setInterval(moverBots, 300);
}

document.getElementById("botaoIniciar").addEventListener("click", () => {
    somColeta.play().then(() => {
        somColeta.pause();
        somColeta.currentTime = 0;
    }).catch(e => console.log("Erro ao liberar som:", e));

    iniciarJogo();
});

renderizar();
