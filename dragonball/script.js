let currentCharacter = null;

// Connect to StreamerBot WebSocket
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function () {
  console.log("[WebSocket] Connected to StreamerBot");
};

socket.onmessage = function (event) {
  console.log("📨 Message from StreamerBot:", event.data);

  try {
    const data = JSON.parse(event.data);

    if (data.action === "startDragonball") {
      console.log("🔥 Received startDragonball command");
      startGame();
    }

    if (data.action === "revealDragonball") {
      console.log("🎉 Revealing character");
      revealAnswer();
    }
  } catch (err) {
    console.error("❌ WebSocket message error:", err);
  }
};

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

    // Send the character name back to StreamerBot
    socket.send(JSON.stringify({
      action: "setCharacter",
      name: currentCharacter.name
    }));

  } catch (err) {
    console.error("❌ Failed to load characters.json:", err);
  }
}

// Reveal the character
function revealAnswer() {
  document.getElementById("answer").hidden = false;
}
