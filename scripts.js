



var whosTurn = 1; //Initialize this to 1
// homework: write a loop to set up the following winningCombos
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var availableSquares = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];

var winningCombos = [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1'],
];


// function onePlayerGame() {
//     computerPlayer = true;
// }

var playingComputer = true;

// mark the squares as x or o for players 1 and 2
function markSquare(currentSquare) {
    if ((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")) {
        console.log("You cannot change this square now.");
        // return "taken";
    } else if(someoneWon) {
        console.log("Someone already won.");
    } else {
        if (whosTurn === 1) {
            currentSquare.innerHTML = "X";
            player1Squares.push(currentSquare.id);
            availableSquares.splice(availableSquares.indexOf(currentSquare.id), 1);
            whosTurn = 2;
            checkWin(player1Squares, "Player 1");

            if (playingComputer) {
                computerMove();
            }
        } else {
            currentSquare.innerHTML = "O";
            player2Squares.push(currentSquare.id);
            availableSquares.splice(availableSquares.indexOf(currentSquare.id), 1);
            whosTurn = 1;
            checkWin(player2Squares, "Player 2");
        }
    }
}

//***********************************
//****Computer logic functions*******
//***********************************

function goForWin(){
    var winningMove;
    for (let i = 0; i < winningCombos.length; i++) {
        var matchCount = 0;
        var winningRow = winningCombos[i];
        for (let j = 0; j < winningRow.length; j++) {
            var matchingSquare = winningRow[j];
            if (player2Squares.indexOf(matchingSquare) !== -1) {
                matchCount++;
            }
            if (matchCount === 2) {
                for (let i = 0; i < winningRow.length; i++) {
                    if ((player2Squares.indexOf(winningRow[i]) === -1) &&
                        (availableSquares.indexOf(winningRow[i]) !== -1)
                    ){
                        winningMove = winningRow[i];
                        return winningMove;
                    }
                }
            }
        }
    }
    return false;
}


function blockMove() {
    var blockingMove;
    for (let i = 0; i < winningCombos.length; i++) {
        var matchCount = 0;
        var winningRow = winningCombos[i];
        for (let j = 0; j < winningRow.length; j++) {
            var matchingSquare = winningRow[j];
            if (player1Squares.indexOf(matchingSquare) !== -1) {
                matchCount++;
            }
            //We have two out of three of a winning combo.
            //Loop through the row that would be a win and find a square to
            //block victory.
            if (matchCount === 2) {
                for (let i = 0; i < winningRow.length; i++) {
                    if ((player1Squares.indexOf(winningRow[i]) === -1) &&
                        (availableSquares.indexOf(winningRow[i]) !== -1)
                    ){
                        blockingMove = winningRow[i];
                        return blockingMove;
                    }
                }
            }
        }
    }
    return false;
}


function computerMove() {
    var classSquare = document.getElementsByClassName('square');
    if (player2Squares.length > 0) {
        var winningPick = goForWin(player2Squares);
    }
    var blockingPick = blockMove(player1Squares);

    if (winningPick) {
        document.getElementById(winningPick);
        markSquare(classSquare[winningPick]);
    } else if (blockingPick) {
        document.getElementById(blockingPick);
        markSquare(classSquare[blockingPick]);
    } else {
        var rando = (Math.ceil(Math.random() * availableSquares.length) - 1);
        var computersPick = availableSquares[rando];
        markSquare(classSquare[computersPick]);
    }
}


//********************************************
// ****Check to see if we have a winner*******
//********************************************

function checkWin(playerSquares, player) {
    for (let i = 0; i < winningCombos.length; i++) {
        var matchCount = 0;
        for (let j = 0; j < winningCombos[i].length; j++) {
            var matchingSquare = winningCombos[i][j];
            if (playerSquares.indexOf(matchingSquare) !== -1) {
                // hit! player has this square somewhere
                matchCount++;
            }
        }
        if (matchCount === 3) {
            // player had all 3 of these j's
            console.log(player, " won!");
            // return winningCombos[i];
            gameIsWon(player, winningCombos[i]);
            break;
        }
    }
}


// color the player's winning squares, stop the game, and ask to play again
function gameIsWon(whoWon, winningCombo) {
    var message = "Congrats to player " + whoWon + ". You just won with a " + winningCombo;
    document.getElementById('message').innerHTML = message;
    for (var i = 0; i < winningCombo.length; i++) {
        document.getElementById(winningCombo[i]).className += " winning-square ";
    }
    someoneWon = true;
}

// when game is won
// whos turn needs to reset to 1
// reset players squares to empty arrays
// someoneWon needs to get reset to false
// reset the dom back to uncolored and not marked
function reset() {
    someoneWon = false;

}
