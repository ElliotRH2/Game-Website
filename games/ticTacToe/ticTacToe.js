const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let boardState2 = ['', '', '', '', '', '', '', '', '', '', '', '',, '', '', '', '', '']; // 4x4
const boardSize = 9;

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Handle click on cell
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    if (boardState[cellIndex] === '') {
        boardState[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;
        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            resetGame();
        } else if (checkDraw()) {
            alert('Draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check if there's a win
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
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
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Start the game
initializeBoard();
