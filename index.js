// create the game board as a 2D array
var gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// initialize player turn
var currentPlayer = "X";

// get the game board element
var boardElement = document.getElementById("game-board");

// add event listeners for the cells
var cells = document.getElementsByClassName("cell");
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleCellClick);
}

// create a function to new Game
function newGame(){
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = null;
        cells[i].style.backgroundColor = null;
        gameBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
}

// create a function to handle cell click
function handleCellClick(event) {
    // get the clicked cell element
    var cellElement = event.target;

    // get the cell's row and column
    var row = cellElement.getAttribute("data-row");
    var col = cellElement.getAttribute("data-col");

    // check if the cell is already filled
    if (gameBoard[row][col] !== null) {
        return;
    }

    // fill the cell with the current player's symbol
    gameBoard[row][col] = currentPlayer;
    cellElement.innerHTML = currentPlayer;

    
  if(cellElement.innerHTML == "O"){
            cellElement.style.color = "green";
        cellElement.style.backgroundColor = "white";
    }else{
              cellElement.style.color = "red";
        cellElement.style.backgroundColor = "white";
    }

    // check if the game is over
    var gameOver = checkForWin(currentPlayer);
if(gameOver) {
     newGame();
   }
    if (gameOver) {
        alert(currentPlayer + " wins!");
        sendData(currentPlayer);
    } else if (checkForTie()) {
        alert("It's a tie!");
        sendData("Tie");
    } else {
        // switch to the other player
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
    }
}

// create a function to check for a win
function checkForWin(player) {
    // check rows
    for (var row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][0] === player && gameBoard[row][1] === player && gameBoard[row][2] === player) {
            return true;
        }
    }

    // check columns
    for (var col = 0; col < gameBoard[0].length; col++) {
        if (gameBoard[0][col] === player && gameBoard[1][col] === player && gameBoard[2][col] === player) {
            return true;
        }
    }

    // check diagonals
    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player) {
        return true;
    }
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player) {
        return true;
    }

    return false;
}

// create a function to check for a tie
function checkForTie() {
    for (var row = 0; row < gameBoard.length; row++) {
        for (var col = 0; col < gameBoard[row].length; col++) {
            if (gameBoard[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}

