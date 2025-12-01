// puzzleSolver.js - Enhanced with Number Puzzle (No Image Required!)

/**
 * Puzzle Solver Game - Number Sliding Puzzle
 * Enhances problem-solving skills with a classic sliding number puzzle.
 * Features:
 * - No external images needed - uses numbers
 * - Click tiles to slide them
 * - Tracks moves and time
 * - Win detection
 */

document.addEventListener("DOMContentLoaded", () => {
  const puzzleSolverButton = document.getElementById("puzzleSolverGame");
  if (puzzleSolverButton) {
    puzzleSolverButton.addEventListener("click", launchPuzzleSolverGame);
  }
});

function launchPuzzleSolverGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
    <div id="puzzle-game" style="width: 100%; max-width: 600px; margin: 0 auto; text-align: center;">
      <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.75rem; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem;">
        🧩 Number Sliding Puzzle
      </h3>
      <p style="color: #667eea; margin-bottom: 1.5rem;">Click tiles to slide them into the empty space!</p>
      <div id="puzzle-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 2rem auto; padding: 15px; background: linear-gradient(135deg, rgba(250, 112, 154, 0.1) 0%, rgba(254, 225, 64, 0.1) 100%); border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"></div>
      <div id="puzzle-controls" style="margin-top: 1.5rem;">
        <button id="shuffle-puzzle" style="padding: 1rem 2rem; margin: 0.5rem;">🔀 Shuffle</button>
        <button id="solve-hint" style="padding: 1rem 2rem; margin: 0.5rem;">💡 Hint</button>
      </div>
      <div id="puzzle-stats" style="display: flex; justify-content: center; gap: 2rem; margin-top: 2rem; flex-wrap: wrap;">
        <div style="background: rgba(250, 112, 154, 0.1); padding: 1rem 2rem; border-radius: 12px; border: 2px solid rgba(250, 112, 154, 0.3);">
          <p style="margin: 0; font-weight: 600;">Moves: <span id="puzzle-moves" style="color: #fa709a; font-size: 1.3rem;">0</span></p>
        </div>
        <div style="background: rgba(254, 225, 64, 0.1); padding: 1rem 2rem; border-radius: 12px; border: 2px solid rgba(254, 225, 64, 0.3);">
          <p style="margin: 0; font-weight: 600;">Time: <span id="puzzle-time" style="color: #fee140; font-size: 1.3rem;">0</span>s</p>
        </div>
      </div>
    </div>
  `;
  initializePuzzleSolver();
}

function initializePuzzleSolver() {
  const GRID_SIZE = 4;
  let tiles = [];
  let emptyIndex = 15; // Bottom-right corner
  let moves = 0;
  let startTime = Date.now();
  let timerInterval = null;

  const gridElement = document.getElementById("puzzle-grid");
  const movesSpan = document.getElementById("puzzle-moves");
  const timeSpan = document.getElementById("puzzle-time");
  const shuffleButton = document.getElementById("shuffle-puzzle");
  const hintButton = document.getElementById("solve-hint");

  // Initialize tiles in solved state
  function initializeTiles() {
    tiles = [];
    for (let i = 0; i < 15; i++) {
      tiles.push(i + 1);
    }
    tiles.push(0); // 0 represents empty space
    emptyIndex = 15;
  }

  // Render the puzzle grid
  function renderPuzzle() {
    gridElement.innerHTML = "";
    tiles.forEach((value, index) => {
      const tile = document.createElement("div");

      if (value === 0) {
        // Empty space
        tile.style.cssText = `
          aspect-ratio: 1;
          background: transparent;
          border-radius: 12px;
        `;
      } else {
        // Number tile
        tile.textContent = value;
        tile.style.cssText = `
          aspect-ratio: 1;
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
          font-size: 2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          user-select: none;
        `;

        tile.addEventListener("mouseenter", function () {
          if (canMove(index)) {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0 6px 12px rgba(250, 112, 154, 0.4)";
          }
        });

        tile.addEventListener("mouseleave", function () {
          this.style.transform = "scale(1)";
          this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        });

        tile.addEventListener("click", () => moveTile(index));
      }

      gridElement.appendChild(tile);
    });
  }

  // Check if a tile can move
  function canMove(index) {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    // Can move if in same row or column and adjacent
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  }

  // Move a tile
  function moveTile(index) {
    if (!canMove(index)) return;

    // Swap tile with empty space
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    emptyIndex = index;
    moves++;
    movesSpan.textContent = moves;

    renderPuzzle();

    // Check if solved
    if (isSolved()) {
      clearInterval(timerInterval);
      showVictory();
    }
  }

  // Check if puzzle is solved
  function isSolved() {
    for (let i = 0; i < 15; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return tiles[15] === 0;
  }

  // Shuffle puzzle
  function shufflePuzzle() {
    // Make random valid moves to shuffle
    for (let i = 0; i < 100; i++) {
      const validMoves = getValidMoves();
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [tiles[randomMove], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[randomMove]];
      emptyIndex = randomMove;
    }

    moves = 0;
    movesSpan.textContent = moves;
    startTime = Date.now();
    renderPuzzle();
  }

  // Get all valid moves
  function getValidMoves() {
    const validMoves = [];
    for (let i = 0; i < 16; i++) {
      if (canMove(i)) validMoves.push(i);
    }
    return validMoves;
  }

  // Show hint
  function showHint() {
    const validMoves = getValidMoves();
    if (validMoves.length > 0) {
      const hint = validMoves[0];
      const tiles = gridElement.children;
      tiles[hint].style.animation = "pulse 0.5s ease-in-out 3";
    }
  }

  // Show victory message
  function showVictory() {
    const victoryMsg = document.createElement("div");
    victoryMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
      padding: 3rem 4rem;
      border-radius: 24px;
      font-size: 2rem;
      font-weight: 700;
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: victoryPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      text-align: center;
    `;
    victoryMsg.innerHTML = `
      🎉 Puzzle Solved! 🎉<br>
      <div style="font-size: 1.2rem; margin-top: 1rem;">
        Moves: ${moves} | Time: ${Math.floor((Date.now() - startTime) / 1000)}s
      </div>
    `;
    document.body.appendChild(victoryMsg);

    setTimeout(() => victoryMsg.remove(), 3000);
  }

  // Start timer
  function startTimer() {
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timeSpan.textContent = elapsed;
    }, 1000);
  }

  // Event listeners
  shuffleButton.addEventListener("click", shufflePuzzle);
  hintButton.addEventListener("click", showHint);

  // Initialize and start
  initializeTiles();
  shufflePuzzle();
  startTimer();

  // Add pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(250, 112, 154, 0.8); }
    }
  `;
  document.head.appendChild(style);
}
