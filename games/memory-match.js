const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize the board
function initializeBoard() {
  board.innerHTML = '';
  shuffledCards = shuffle(cards);
  flippedCards = [];
  matchedCards = [];

  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-index', index);
    cardElement.textContent = card;
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });
}

// Flip a card
function flipCard(event) {
  const card = event.target;
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.textContent === card2.textContent) {
    matchedCards.push(card1, card2);
    card1.classList.add('matched');
    card2.classList.add('matched');

    if (matchedCards.length === cards.length) {
      status.textContent = 'You win! 🎉';
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);
  }

  flippedCards = [];
}

// Reset the game
function resetGame() {
  initializeBoard();
  status.textContent = 'Find all the matching pairs!';
}

// Event listeners
resetButton.addEventListener('click', resetGame);

// Initialize the game
initializeBoard();