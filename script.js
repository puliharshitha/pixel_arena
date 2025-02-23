let currentMode = 'partner'; // Default mode

// Set the game mode (partner or computer)
function setMode(mode) {
  currentMode = mode;
  alert(`Selected Mode: ${mode === 'partner' ? 'Play with Partner' : 'Play vs Computer'}`);
}

// Navigate to the selected game page
function navigateToGame(game) {
  if (!currentMode) {
    alert('Please select a mode first!');
    return;
  }
  window.location.href = `games/${game}.html?mode=${currentMode}`;
}