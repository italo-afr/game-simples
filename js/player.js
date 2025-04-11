window.playerPosicao = { x: posicaoAleatoria(), y: posicaoAleatoria() };
window.pontuacao = 0;

function movPlayer(e) {
    let tecla = e.keyCode;
    if (tecla === 37) playerPosicao.x -= velocidade;
    if (tecla === 39) playerPosicao.x += velocidade;
    if (tecla === 38) playerPosicao.y -= velocidade;
    if (tecla === 40) playerPosicao.y += velocidade;

    aplicarBarreiras(playerPosicao);
    checarColisaoBolinhas();
    renderizar();
}
