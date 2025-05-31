let currentCharacter = null;

async function startGame() {
  const response = await fetch('characters.json');
  const characters = await response.json();
  currentCharacter = characters[Math.floor(Math.random() * characters.length)];

  document.getElementById("silhouette").src = currentCharacter.silhouette;
  document.getElementById("reveal").src = currentCharacter.image;
  document.getElementById("name").textContent = currentCharacter.name.toUpperCase();
  document.getElementById("answer").hidden = true;
}

function revealAnswer() {
  document.getElementById("answer").hidden = false;
}

window.startGame = startGame;
window.revealAnswer = revealAnswer;

// Auto-start the first game
startGame();
