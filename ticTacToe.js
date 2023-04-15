const xClass = 'x';
const circleClass = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button')
let circleTurn;
let winningMessageText= document.querySelector('[data-winning-message-text]');
let winningMessage = document.getElementById('winning-message');
const winCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];


startGame()

restartButton.addEventListener('click', startGame);

function startGame(){
    document.getElementById('player-turn').textContent = `X Goes First`;

    circleTurn = false;
cellElements.forEach(cell => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true})
});

setBoardHoverClass()
winningMessage.classList.remove('show')
}


function handleClick(e) {
const cell = e.target;
// if it's O's turn, currentClass = circleClass, otherwise, xClass
const currentClass = circleTurn ? circleClass : xClass;
placeMark(cell, currentClass);

if(checkWin(currentClass)) {
   endGame(false);
} else if(isDraw()) {
   endGame(true);
} else {
    //check for win
    //check for draw
    swapTurns();
    setBoardHoverClass();
    document.getElementById('player-turn').textContent = circleTurn ? `O's Turn` : `X's Turn`;
}
}


let playerXScore = 0;
let playerOScore = 0;

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} Win!`;

    //update scoreboard
        if (circleTurn) {
            playerOScore++;
        } else {
            playerXScore++;
        }
    }
    // Update scoreboard text
    document.getElementById('player-x-score').textContent = `Player X: ${playerXScore}`;
    document.getElementById('player-o-score').textContent = `Player O: ${playerOScore}`;
    winningMessage.classList.add('show');
}
//checks if every cell contains X's or O's without a winner
function isDraw() {
   return [...cellElements].every(cell => { 
    return cell.classList.contains(xClass) || 
    cell.classList.contains(circleClass)

    })
}

function placeMark(cell, currentClass) {
 cell.classList.add(currentClass);   
}


function swapTurns() {
    circleTurn = !circleTurn;
}

//changes the X or O hover based on whose turn it is
function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
   if (circleTurn){
    board.classList.add(circleClass);
   } else {
    board.classList.add(xClass);
   }

}

// checks if any of the cell combinations are met with one single class(X's or O's)
function checkWin(currentClass) {
    return winCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}