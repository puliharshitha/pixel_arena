const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X', gameState = Array(9).fill(''), gameActive = true;
const mode = new URLSearchParams(window.location.search).get('mode');

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer);

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} Wins! `;
    gameActive = false;
    playSound('win');
    return;
  }

  if (!gameState.includes('')) {
    status.textContent = 'It\'s a Draw! ';
    gameActive = false;
    playSound('draw');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;

  if (mode === 'computer' && currentPlayer === 'O') setTimeout(computerMove, 500);
}

function computerMove() {
  const emptyCells = gameState.map((v, i) => (v === '' ? i : null)).filter(i => i !== null);
  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('O');

    if (checkWin()) {
      status.textContent = 'Computer Wins! ';
      gameActive = false;
      playSound('lose');
      return;
    }

    if (!gameState.includes('')) {
      status.textContent = 'It\'s a Draw! ';
      gameActive = false;
      playSound('draw');
      return;
    }

    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      [a, b, c].forEach(index => cells[index].classList.add('winning-cell'));
      return true;
    }
    return false;
  });
}

function resetGame() {
  gameState.fill('');
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'winning-cell');
  });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
