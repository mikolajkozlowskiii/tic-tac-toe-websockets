var turns = [["#", "#", "#"], ["#", "#", "#"], ["#", "#", "#"]];
var turn = 'X';
var gameOn = false;
var isGameFinished = false;

function playerTurn(turn, id) {
    if(!isGameFinished){
        console.log("player turn " + turn)
        if (gameOn && turn === playerType) {
            var spotTaken = $("#" + id).text();
            if (spotTaken === "#") {
                makeAMove(playerType, id.split("_")[0], id.split("_")[1]);
            }
        }
        if(!gameOn){
            alert("Game not started!");
        }
        else if(turn !== playerType){
            alert("Not your turn!");
        }
    }
    else {
        alert("Game is finished!");
    }
}

function makeAMove(type, xCoordinate, yCoordinate) {
    $.ajax({
        url: "/game/gameplay", 
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "type": type,
            "coordinateX": xCoordinate,
            "coordinateY": yCoordinate,
            "gameId": gameId
        }),
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    setTimeout(function() {
    }, 100); 
}

function displayResponse(data) {
    let board = data.board;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 1) {
                turns[i][j] = 'X'
            } else if (board[i][j] === 2) {
                turns[i][j] = 'O';
            }
            let id = i + "_" + j;
            $("#" + id).text(turns[i][j]);
        }
    }
}

function checkGameFinished(data){
    let winner = data.winner;
    console.log("check is game finished, possible winner: " + winner)
    if (winner != null) {
        setTimeout(function() {
            finishGame(winner);
        }, 100); 
        return true;
    }

}

function finishGame(winner){
    isGameFinished = true;
    gameOn = false;
    console.log("gameOn " + this.gameOn)
    alert("Winner is " + winner);
}

function isGameJustStarted(data) {
    if (Array.isArray(data.board)) {
        for (let row of data.board) {
            for (let element of row) {
                if (element !== 0) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}


function changeTurn(data){
    if(gameOn && data!== null && !isGameJustStarted(data)){
        if(turn === 'O'){
            turn = 'X';
        }
        else{
            turn = 'O';
        }
    }
}

$(".tic").click(function () {
    if(!isGameFinished){
        var slot = $(this).attr('id');
        playerTurn(turn, slot);
    }
});

function reset() {
    turns = [["#", "#", "#"], ["#", "#", "#"], ["#", "#", "#"]];
    $(".tic").text("#");
    isGameFinished = false;
}

$("#reset").click(function () {
    reset();
});


function startGame(){
    gameOn = true;
}