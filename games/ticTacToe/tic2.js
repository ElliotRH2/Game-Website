const board = document.getElementById('board2');
const resetButton = document.getElementById('resetButton2');
let currentPlayer = 'X';
let boardState2 = ['', '', '', '', '', '', '', '', ''];
let boardState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; // 4x4

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < 16; i++) {
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
    // Rows
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15], [3, 6, 9, 12]
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
    boardState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Start the game
initializeBoard();
