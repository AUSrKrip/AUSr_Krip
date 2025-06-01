let currentCharacter = null;

// Start a new game round
async function startGame() {
  try {
    const response = await fetch('characters.json');
    const characters = await response.json();

    // Pick a random character
    currentCharacter = characters[Math.floor(Math.random() * characters.length)];

    // Update overlay with silhouette
    document.getElementById("silhouette").src = currentCharacter.silhouette;
    document.getElementById("reveal").src = currentCharacter.image;
    document.getElementById("name").textContent = currentCharacter.name;
    document.getElementById("answer").hidden = true;

    // Send selected character name to StreamerBot
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        action: "setCharacter",
        name: currentCharacter.name
      }));
    } else {
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({
          action: "setCharacter",
          name: currentCharacter.name
        }));
      });
    }
  } catch (err) {
    console.error("Failed to load characters:", err);
  }
}

// Reveal the answer
function revealAnswer() {
  document.getElementById("answer").hidden = false;
}

// Set up WebSocket to StreamerBot
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function () {
  console.log("[WebSocket] Connected to StreamerBot");
};

socket.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data);

    // Start round when StreamerBot sends { action: "startDragonball" }
    if (data.action === "startDragonball") {
      startGame();
    }

    // Reveal answer when StreamerBot sends { action: "revealDragonball" }
    if (data.action === "revealDragonball") {
      revealAnswer();
    }
  } catch (err) {
    console.error("WebSocket message error:", err);
  }
};

// Optional: auto-start for testing in browser
// window.addEventListener('DOMContentLoaded', startGame);
