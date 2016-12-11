

// 1. set up board
// 2. user should be able to click a box and a mark shows up.
// --put an onclick in the first square
// --when user clicks, call function that upts an x in the box.
// 4. we need to keep track of whos turn it is
// 5. when a square is clicked, put the symbol in and change whos turn it is
// 6. keep player from overriding square
// 7. we need a win checker

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
                computerMove(availableSquares);
            }
        } else {
            currentSquare.innerHTML = "O";
            player2Squares.push(currentSquare.id);
            availableSquares.splice(availableSquares.indexOf(currentSquare.id), 1);
            console.log(availableSquares);
            whosTurn = 1;
            checkWin(player2Squares, "Player 2");
        }
    }
}

function goForWin(){

}


function blockMove(playerSquares) {
    var blockingMove;
    for (let i = 0; i < winningCombos.length; i++) {
        var matchCount = 0;
        for (let j = 0; j < winningCombos[i].length; j++) {
            var matchingSquare = winningCombos[i][j];
            if (playerSquares.indexOf(matchingSquare) !== -1) {
                matchCount++;
            }
            if (matchCount > 1) {
                blockingMove = winningCombos[i][j+1];
                return blockingMove;
            }
        }
    }
    return false;
}

function computerMove(availSquaresArry) {
    var classSquare = document.getElementsByClassName('square');
    var computersPick = blockMove(player1Squares);

    if (computersPick) {
        document.getElementById(computersPick);
        console.log(computersPick);
        markSquare(classSquare[computersPick]);
    } else {
        var rando = (Math.ceil(Math.random() * availSquaresArry.length) - 1);
        computersPick = availableSquares[rando];
        console.log(computersPick);
        markSquare(classSquare[computersPick]);
    }
}


// see if we have a winner
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
