let currentCharacter = null;

// Start a new game round
async function startGame() {
  try {
    const response = await fetch('characters.json');
    const characters = await response.json();

    currentCharacter = characters[Math.floor(Math.random() * characters.length)];

    document.getElementById("silhouette").src = currentCharacter.silhouette;
    document.getElementById("reveal").src = currentCharacter.image;
    document.getElementById("name").textContent = currentCharacter.name;
    document.getElementById("answer").hidden = true;

    console.log("🎯 Selected:", currentCharacter.name);
    console.log("🟢 Silhouette URL:", currentCharacter.silhouette);

    // Optional: display name in console only (not reveal)
  } catch (err) {
    console.error("❌ Failed to load characters.json:", err);
  }
}

// Reveal the character visually
function revealAnswer() {
  document.getElementById("answer").hidden = false;
}

// ✅ Allow StreamerBot or manual trigger to call revealAnswer()
window.revealAnswer = revealAnswer;

// ✅ Start the game automatically when overlay loads
window.onload = () => {
  startGame();
};
