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
}
}

function endGame(draw) {
    if(draw){
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerHTML = `${circleTurn ? "O's": "X's"} Win!`
    }
        winningMessage.classList.add('show');
}

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

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
   if (circleTurn){
    board.classList.add(circleClass);
   } else {
    board.classList.add(xClass);
   }

}

function checkWin(currentClass) {
    return winCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}