const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // X starts first
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the board state
let gameActive = true;
let mode = new URLSearchParams(window.location.search).get('mode'); // Get mode from URL

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) return;

  // Player's move
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    playSound('win'); // Play win sound
    return;
  }

  if (!gameState.includes('')) {
    status.textContent = 'It\'s a Draw! 😊';
    gameActive = false;
    playSound('draw'); // Play draw sound
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;

  // Computer's move (if mode is vs computer and it's computer's turn)
  if (mode === 'computer' && currentPlayer === 'O' && gameActive) {
    setTimeout(computerMove, 500); // Delay for better UX
  }
}

// Computer's move logic
function computerMove() {
  let emptyCells = gameState
    .map((value, index) => (value === '' ? index : null))
    .filter(index => index !== null);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('O');

    if (checkWin()) {
      status.textContent = 'Computer Wins! 🤖';
      gameActive = false;
      playSound('lose'); // Play lose sound
      return;
    }

    if (!gameState.includes('')) {
      status.textContent = 'It\'s a Draw! 😊';
      gameActive = false;
      playSound('draw'); // Play draw sound
      return;
    }

    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a win
function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

// Reset the game
function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

// Play sound effects
function playSound(sound) {
  const audio = new Audio(`../assets/sounds/${sound}.mp3`);
  audio.play();
}

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Initialize game based on mode
if (mode === 'computer') {
  status.textContent = `Player ${currentPlayer}'s Turn`;
} else {
  status.textContent = `Player ${currentPlayer}'s Turn`;
}


if (checkWin()) {
    winningCells.forEach(cell => cell.classList.add('winning-cell'));
  }

function checkWin() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        cells[a].classList.add('winning-cell');
        cells[b].classList.add('winning-cell');
        cells[c].classList.add('winning-cell');
        return true;
      }
    }
    return false;
  }