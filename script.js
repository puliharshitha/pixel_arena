let currentMode = 'partner'; 

function setMode(mode) {
  currentMode = mode;
  alert(`Selected Mode: ${mode === 'partner' ? 'Play with Partner' : 'Play vs Computer'}`);
}

function navigateToGame(game) {
  if (!currentMode) {
    alert('Please select a mode first!');
    return;
  }
  window.location.href = `games/${game}.html?mode=${currentMode}`;
}