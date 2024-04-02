const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const gameTitle = document.getElementById('gameTitle')
const changeBoard = document.getElementById('changeBoard')

let currentPlayer = 'X';
let boardState = [];
let winConditions = [];
let boardGrid = 3;

// Initialize the game board
function initializeBoard() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    board.style.gridTemplateColumns = `repeat(${boardGrid}, 100px)`;
    board.style.gridTemplateRows = `repeat(${boardGrid}, 100px)`;

    getWinConditions();
    boardState = [];

    for (let i = 0; i < boardGrid * boardGrid; i++) {
        boardState.push('');

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

changeBoard.addEventListener('click', function() {
    if (boardGrid === 3) {
        boardGrid = 4;
        
        changeBoard.innerText = "3x3"
    } else {
        boardGrid = 3;
        
        changeBoard.innerText = "4x4"
    }
    
    resetGame();
})

// Handle click on cell
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    if (boardState[cellIndex] === '') {
        boardState[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;
        if (checkWin()) {
            gameTitle.innerText = currentPlayer + ' wins!'; 
            gameTitle.classList.add('winText');
            setTimeout(resetGame, 2000);
        } else if (checkDraw()) {
            gameTitle.innerText = 'Draw!'; 
            setTimeout(resetGame, 2000);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Generate Win Conditions
function getWinConditions() {
    winConditions = [];

    // Rows
    for (let i = 0; i < boardGrid; i++) {
        let condition = [];

        for (let j = 0; j < boardGrid; j++) {
            condition.push(i * boardGrid + j);
        }

        winConditions.push(condition);
    }

    // Columns
    for (let i = 0; i < boardGrid; i++) {
        let condition = [];

        for (let j = 0; j < boardGrid; j++) {
            condition.push(i + j * boardGrid);
        }

        winConditions.push(condition);
    }

    // Diagonals
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < boardGrid; i++) {
        diagonal1.push(i * boardGrid + i);
        diagonal2.push(i * boardGrid + (boardGrid - 1 - i));
    }

    winConditions.push(diagonal1);
    winConditions.push(diagonal2);
}

// Check if there's a win
function checkWin() {
    return winConditions.some(condition =>
        condition.every(index => boardState[index] === currentPlayer)
    );
}

// Check if it's a draw
function checkDraw() {
    return boardState.every(cell => cell !== '');
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameTitle.innerText = 'Tic Tac Toe';
    gameTitle.classList.remove('winText');

    initializeBoard();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Start the game
initializeBoard();