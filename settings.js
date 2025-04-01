const canvas = document.getElementById("gameCanvas");
const player = canvas.getContext("2d");
var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39; //Teste
var playerPosicao = {
    x: 10,
    y: 10
};


playerRender();

window.addEventListener("keydown", movPlayer);

function movPlayer(e) {
    var key = e.keyCode;
    if(key === LEFT) {
        playerPosicao.x--;
    }
    if(key === RIGHT) {
        playerPosicao.x++;
    }
    if(key === UP) {
        playerPosicao.y--;
    }
    if(key === DOWN) {
        playerPosicao.y++;
    }
    playerRender();
}

function velocidadePlayer () {
    
}


function playerRender () {
    player.clearRect(0, 0, canvas.width, canvas.height)
    player.fillStyle = "white";
    player.fillRect(playerPosicao.x, playerPosicao.y, 10, 10);
}
