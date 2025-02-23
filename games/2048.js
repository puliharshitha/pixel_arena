const board = document.getElementById('board');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset');

let grid;
let score;

// Initialize the game
function initializeGame() {
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}

// Add a random tile (2 or 4)
function addRandomTile() {
  const emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  }
}

// Update the board UI
function updateBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (grid[row][col] !== 0) {
        tile.textContent = grid[row][col];
        tile.setAttribute('data-value', grid[row][col]);
      }
      board.appendChild(tile);
    }
  }
  scoreElement.textContent = `Score: ${score}`;
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    moveUp();
  } else if (event.key === 'ArrowDown') {
    moveDown();
  } else if (event.key === 'ArrowLeft') {
    moveLeft();
  } else if (event.key === 'ArrowRight') {
    moveRight();
  }
  updateBoard();
  if (isGameOver()) {
    alert('Game Over!');
    initializeGame();
  }
});

// Move tiles up
function moveUp() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    for (let row = 1; row < 4; row++) {
      if (grid[row][col] !== 0) {
        let currentRow = row;
        while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
          grid[currentRow - 1][col] = grid[currentRow][col];
          grid[currentRow][col] = 0;
          currentRow--;
          moved = true;
        }
        if (currentRow > 0 && grid[currentRow - 1][col] === grid[currentRow][col]) {
          grid[currentRow - 1][col] *= 2;
          score += grid[currentRow - 1][col];
          grid[currentRow][col] = 0;
          moved = true;
        }
      }
    }
  }
  if (moved) addRandomTile();
}

// Move tiles down
function moveDown() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    for (let row = 2; row >= 0; row--) {
      if (grid[row][col] !== 0) {
        let currentRow = row;
        while (currentRow < 3 && grid[currentRow + 1][col] === 0) {
          grid[currentRow + 1][col] = grid[currentRow][col];
          grid[currentRow][col] = 0;
          currentRow++;
          moved = true;
        }
        if (currentRow < 3 && grid[currentRow + 1][col] === grid[currentRow][col]) {
          grid[currentRow + 1][col] *= 2;
          score += grid[currentRow + 1][col];
          grid[currentRow][col] = 0;
          moved = true;
        }
      }
    }
  }
  if (moved) addRandomTile();
}

// Move tiles left
function moveLeft() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    for (let col = 1; col < 4; col++) {
      if (grid[row][col] !== 0) {
        let currentCol = col;
        while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
          grid[row][currentCol - 1] = grid[row][currentCol];
          grid[row][currentCol] = 0;
          currentCol--;
          moved = true;
        }
        if (currentCol > 0 && grid[row][currentCol - 1] === grid[row][currentCol]) {
          grid[row][currentCol - 1] *= 2;
          score += grid[row][currentCol - 1];
          grid[row][currentCol] = 0;
          moved = true;
        }
      }
    }
  }
  if (moved) addRandomTile();
}

// Move tiles right
function moveRight() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    for (let col = 2; col >= 0; col--) {
      if (grid[row][col] !== 0) {
        let currentCol = col;
        while (currentCol < 3 && grid[row][currentCol + 1] === 0) {
          grid[row][currentCol + 1] = grid[row][currentCol];
          grid[row][currentCol] = 0;
          currentCol++;
          moved = true;
        }
        if (currentCol < 3 && grid[row][currentCol + 1] === grid[row][currentCol]) {
          grid[row][currentCol + 1] *= 2;
          score += grid[row][currentCol + 1];
          grid[row][currentCol] = 0;
          moved = true;
        }
      }
    }
  }
  if (moved) addRandomTile();
}

// Check if the game is over
function isGameOver() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) return false;
      if (row < 3 && grid[row][col] === grid[row + 1][col]) return false;
      if (col < 3 && grid[row][col] === grid[row][col + 1]) return false;
    }
  }
  return true;
}

// Reset the game
resetButton.addEventListener('click', initializeGame);

// Initialize the game
initializeGame();