// sequenceRecall.js - Enhanced and Fixed

/**
 * Sequence Recall Game
 * Enhances memory by challenging users to recall a sequence of numbers.
 * Features:
 * - Displays a sequence to the user which they must recall
 * - Progressive difficulty levels
 * - Visual feedback for correct and incorrect entries
 * - Animated sequence display
 */

document.addEventListener("DOMContentLoaded", () => {
  const sequenceRecallButton = document.getElementById("sequenceRecallGame");
  if (sequenceRecallButton) {
    sequenceRecallButton.addEventListener("click", launchSequenceRecallGame);
  }
});

function launchSequenceRecallGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
    <div id="sequence-game" style="width: 100%; max-width: 600px; margin: 0 auto; text-align: center;">
      <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.75rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem;">
        🔢 Sequence Recall Game
      </h3>
      <div id="sequence-display" style="display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; min-height: 100px; align-items: center; flex-wrap: wrap;"></div>
      <p style="margin: 1rem 0; color: #667eea; font-weight: 600;">Memorize the sequence and enter it below:</p>
      <input type="text" id="input-sequence" placeholder="Enter sequence (space-separated)" 
        style="width: 100%; max-width: 400px; padding: 1rem; font-size: 1rem; border: 2px solid #667eea; border-radius: 12px; text-align: center; margin: 1rem 0;" />
      <div style="margin: 1rem 0;">
        <button id="submit-sequence" style="padding: 1rem 2rem; font-size: 1.1rem;">✓ Submit Answer</button>
        <button id="new-sequence" style="padding: 1rem 2rem; font-size: 1.1rem; margin-left: 1rem;">🔄 New Sequence</button>
      </div>
      <div id="sequence-stats" style="display: flex; justify-content: center; gap: 2rem; margin-top: 2rem; flex-wrap: wrap;">
        <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem 2rem; border-radius: 12px; border: 2px solid rgba(102, 126, 234, 0.3);">
          <p style="margin: 0; font-weight: 600;">Level: <span id="level" style="color: #667eea; font-size: 1.3rem;">1</span></p>
        </div>
        <div style="background: rgba(79, 172, 254, 0.1); padding: 1rem 2rem; border-radius: 12px; border: 2px solid rgba(79, 172, 254, 0.3);">
          <p style="margin: 0; font-weight: 600;">Score: <span id="score" style="color: #4facfe; font-size: 1.3rem;">0</span></p>
        </div>
      </div>
      <div id="feedback" style="margin-top: 1.5rem; min-height: 60px;"></div>
    </div>
  `;
  initializeSequenceRecallGame();
}

function initializeSequenceRecallGame() {
  let level = 1;
  let score = 0;
  let currentSequence = [];

  const sequenceDisplay = document.getElementById("sequence-display");
  const inputSequence = document.getElementById("input-sequence");
  const submitButton = document.getElementById("submit-sequence");
  const newSequenceButton = document.getElementById("new-sequence");
  const levelSpan = document.getElementById("level");
  const scoreSpan = document.getElementById("score");
  const feedback = document.getElementById("feedback");

  function generateNewSequence() {
    const length = 3 + level; // Start with 4 items, increase with level
    currentSequence = generateSequence(length);
    displaySequence(currentSequence);
    inputSequence.value = "";
    inputSequence.focus();
    feedback.innerHTML = "";
  }

  function displaySequence(sequence) {
    sequenceDisplay.innerHTML = "";
    sequence.forEach((num, index) => {
      setTimeout(() => {
        const item = document.createElement("div");
        item.className = "sequence-item";
        item.textContent = num;
        item.style.cssText = `
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: sequenceAppear 0.3s ease-out;
        `;
        sequenceDisplay.appendChild(item);
      }, index * 300);
    });
  }

  function checkSequence() {
    const userInput = inputSequence.value.trim();
    if (!userInput) {
      showFeedback("Please enter a sequence!", "warning");
      return;
    }

    const userSequence = userInput.split(/\s+/).map(s => s.trim());

    if (compareSequences(userSequence, currentSequence)) {
      score += level * 10;
      level++;
      scoreSpan.textContent = score;
      levelSpan.textContent = level;
      showFeedback("🎉 Correct! Moving to next level...", "success");
      setTimeout(generateNewSequence, 1500);
    } else {
      showFeedback(`❌ Incorrect! The correct sequence was: ${currentSequence.join(" ")}`, "error");
      if (level > 1) level--;
      levelSpan.textContent = level;
    }
  }

  function showFeedback(message, type) {
    const colors = {
      success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      error: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    };

    feedback.innerHTML = `
      <div style="
        background: ${colors[type]};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        animation: fadeIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      ">
        ${message}
      </div>
    `;
  }

  // Event listeners
  submitButton.addEventListener("click", checkSequence);
  newSequenceButton.addEventListener("click", generateNewSequence);

  inputSequence.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkSequence();
    }
  });

  // Start the game
  generateNewSequence();
}

function generateSequence(length) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * 10));
  }
  return sequence;
}

function compareSequences(userSequence, originalSequence) {
  if (userSequence.length !== originalSequence.length) return false;
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== originalSequence[i].toString()) return false;
  }
  return true;
}
