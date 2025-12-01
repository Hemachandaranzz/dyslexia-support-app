// highlighting.js

/**
 * Text Highlighting functionality.
 * - Allows users to select text within the book content and highlight it for reference.
 * - The highlighted text remains persistent across sessions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const bookDisplay = document.getElementById("bookDisplay");
  const highlightButton = document.getElementById("highlightText");

  highlightButton.addEventListener("click", highlightSelection);

  function highlightSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      const span = document.createElement("span");
      span.classList.add("highlight");
      span.textContent = selectedText;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);

      saveHighlight(span.textContent);
    }
  }

  function saveHighlight(text) {
    const highlights = JSON.parse(localStorage.getItem("highlights")) || [];
    highlights.push(text);
    localStorage.setItem("highlights", JSON.stringify(highlights));
  }
});
