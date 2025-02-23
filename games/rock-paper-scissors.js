const choices = document.querySelectorAll('#choices button');
const status = document.getElementById('status');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');

const options = ['🪨 Rock', '📄 Paper', '✂️ Scissors'];

// Player makes a choice
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.textContent;
    const computerChoice = options[Math.floor(Math.random() * 3)];
    const gameResult = getResult(playerChoice, computerChoice);

    status.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}.`;
    result.textContent = gameResult;
  });
});

// Determine the result
function getResult(player, computer) {
  if (player === computer) return 'It\'s a tie! 😊';
  if (
    (player === '🪨 Rock' && computer === '✂️ Scissors') ||
    (player === '📄 Paper' && computer === '🪨 Rock') ||
    (player === '✂️ Scissors' && computer === '📄 Paper')
  ) {
    return 'You win! 🎉';
  }
  return 'You lose! 😢';
}

// Reset the game
function resetGame() {
  status.textContent = 'Make your choice!';
  result.textContent = '';
}

// Event listeners
resetButton.addEventListener('click', resetGame);