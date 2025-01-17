const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.getElementById('resultMessageText');
const restartButton = document.getElementById('restartButton');
const playerTurnElement = document.getElementById('playerTurn');

let circleTurn;

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
  
    setBoardHoverClass();
    resultMessageElement.classList.remove('show');
}

restartButton.addEventListener('click', startGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false); 
    } else if (isDraw()) {
        endGame(true); 
    } else {
        swapTurns(); 
        setBoardHoverClass(); 
    }
}

function endGame(draw) {
   
    if (draw) {
        resultMessageTextElement.innerText = 'Draw!';
    } else {
        resultMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Won!`;
    }
    resultMessageElement.classList.add('show'); 
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn; 
    playerTurnElement.innerText = circleTurn ? "O's Turn" : "X's Turn";
}

function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        gameBoard.classList.add(CIRCLE_CLASS); 
        playerTurnElement.innerText = "O's Turn"; 
    } else {
        gameBoard.classList.add(X_CLASS); 
        playerTurnElement.innerText = "X's Turn"; 
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

startGame();
