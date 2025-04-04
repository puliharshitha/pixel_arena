const choices = ['rock', 'paper', 'scissors'];
const statusDiv = document.getElementById('status');
const resultDiv = document.getElementById('result');

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const totalRounds = 10;


choices.forEach(choice => {
  document.getElementById(choice).addEventListener('click', () => {
    if (roundsPlayed < totalRounds) {
      playGame(choice);
    }
  });
});


document.getElementById('reset').addEventListener('click', resetGame);

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  statusDiv.textContent = `Computer chose ${computerChoice}`;
  const roundResult = determineRoundWinner(playerChoice, computerChoice);
  
  roundsPlayed++;
  resultDiv.textContent = `${roundResult} — Score: You ${playerScore} : ${computerScore} Computer (Round ${roundsPlayed}/${totalRounds})`;

  if (roundsPlayed === totalRounds) {
    endGame();
  }
}

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineRoundWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore++;
    return 'You win this round!';
  }

  computerScore++;
  return 'Computer wins this round!';
}

function endGame() {
  if (playerScore > computerScore) {
    resultDiv.textContent += '\nYou won the game!';
  } else if (playerScore < computerScore) {
    resultDiv.textContent += '\nComputer won the game!';
  } else {
    resultDiv.textContent += '\nIt\'s a draw!';
  }
  disableChoices();
}

function disableChoices() {
  choices.forEach(choice => {
    const choiceButton = document.getElementById(choice);
    choiceButton.style.pointerEvents = 'none';
    choiceButton.style.opacity = '0.5';
  });
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
  resultDiv.textContent = '';
  statusDiv.textContent = 'Make your choice!';
  enableChoices();
}

function enableChoices() {
  choices.forEach(choice => {
    const choiceButton = document.getElementById(choice);
    choiceButton.style.pointerEvents = 'auto';
    choiceButton.style.opacity = '1';
  });
}
