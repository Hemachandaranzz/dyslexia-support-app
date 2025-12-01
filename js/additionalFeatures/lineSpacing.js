// lineSpacing.js

/**
 * Line Spacing functionality.
 * - Allows users to adjust the line spacing of the book content for better readability.
 */

document.addEventListener("DOMContentLoaded", () => {
  const lineSpacingInput = document.getElementById("lineSpacingInput");
  const bookDisplay = document.getElementById("bookDisplay");

  lineSpacingInput.addEventListener("input", () => {
    const lineSpacingValue = lineSpacingInput.value;
    bookDisplay.style.lineHeight = lineSpacingValue;
    saveLineSpacing(lineSpacingValue);
  });

  function saveLineSpacing(lineSpacingValue) {
    localStorage.setItem("lineSpacing", lineSpacingValue);
  }

  function loadLineSpacing() {
    const savedLineSpacing = localStorage.getItem("lineSpacing");
    if (savedLineSpacing) {
      bookDisplay.style.lineHeight = savedLineSpacing;
      lineSpacingInput.value = savedLineSpacing;
    }
  }

  loadLineSpacing();
});
