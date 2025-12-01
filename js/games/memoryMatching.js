// memoryMatching.js - Enhanced with Inline SVG Cards

/**
 * Memory Matching Game
 * Enhances memory and concentration skills through card matching.
 * Features:
 * - Inline SVG cards (no external images needed)
 * - Shuffles and displays a grid of cards with pairs
 * - Tracks number of attempts and matches
 * - Victory animation
 */

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const memoryMatchingButton = document.getElementById("memoryMatchingGame");
  if (memoryMatchingButton) {
    memoryMatchingButton.addEventListener("click", launchMemoryMatchingGame);
  }
});

function launchMemoryMatchingGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
    <div id="memory-game">
      <h3>🧠 Memory Matching Game</h3>
      <div id="game-stats">
        <p>Attempts: <span id="attempts">0</span></p>
        <p>Matches: <span id="matches">0</span></p>
      </div>
      <div id="memory-grid"></div>
      <button id="restart-game">🔄 Restart Game</button>
    </div>
  `;
  initializeMemoryGame();
}

// SVG Card Designs (inline, no external files needed)
const cardDesigns = [
  {
    id: 1,
    name: "star",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 10 L61 38 L90 38 L67 55 L77 83 L50 65 L23 83 L33 55 L10 38 L39 38 Z" 
        fill="#9333ea" stroke="#7c3aed" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 2,
    name: "circle",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="35" fill="#ec4899" stroke="#db2777" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 3,
    name: "triangle",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 10 L90 90 L10 90 Z" fill="#84cc16" stroke="#65a30d" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 4,
    name: "square",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <rect x="15" y="15" width="70" height="70" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 5,
    name: "heart",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 15, 40 15 C45 15, 50 20, 50 20 C50 20, 55 15, 60 15 C70 15, 80 25, 80 40 C80 60, 50 85, 50 85 Z" 
        fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 6,
    name: "hexagon",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z" 
        fill="#06b6d4" stroke="#0891b2" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 7,
    name: "diamond",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="#8b5cf6" stroke="#7c3aed" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 8,
    name: "pentagon",
    svg: `<svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M50 10 L90 40 L75 85 L25 85 L10 40 Z" fill="#14b8a6" stroke="#0d9488" stroke-width="3"/>
    </svg>`,
  },
];

function initializeMemoryGame() {
  const cards = [...cardDesigns, ...cardDesigns]; // Duplicate for matching pairs
  const shuffledCards = shuffleArray(cards);
  let firstCard, secondCard;
  let lockBoard = false;
  let moves = 0;
  let matches = 0;
  const gameGrid = document.getElementById("memory-grid");
  gameGrid.innerHTML = "";

  shuffledCards.forEach((cardData) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = cardData.id;
    cardElement.dataset.name = cardData.name;

    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="front-face">
          ${cardData.svg}
        </div>
        <div class="back-face"></div>
      </div>
    `;

    cardElement.addEventListener("click", () => flipCard(cardElement));
    gameGrid.appendChild(cardElement);
  });

  function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;
    moves++;
    document.getElementById("attempts").innerText = moves;

    checkMatch();
  }

  function checkMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
      disableCards();
      matches++;
      document.getElementById("matches").innerText = matches;

      // Check if game is complete
      if (matches === cardDesigns.length) {
        setTimeout(showVictory, 500);
      }
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  function showVictory() {
    const victoryMsg = document.createElement("div");
    victoryMsg.className = "victory-message";
    victoryMsg.innerHTML = `
      🎉 Congratulations! 🎉<br>
      <small style="font-size: 1.2rem; font-weight: 500;">You won in ${moves} moves!</small>
    `;
    document.body.appendChild(victoryMsg);

    // Create confetti
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createConfetti(), i * 30);
    }

    setTimeout(() => {
      victoryMsg.remove();
    }, 3000);
  }

  function createConfetti() {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
    ][Math.floor(Math.random() * 6)];
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }

  // Restart button
  const restartBtn = document.getElementById("restart-game");
  if (restartBtn) {
    restartBtn.addEventListener("click", initializeMemoryGame);
  }
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
