// wordTracking.js

/**
 * Word Tracking functionality.
 * - Tracks the total number of words read and highlights the words as they are read.
 * - Displays a word count at the top of the page.
 */

document.addEventListener("DOMContentLoaded", () => {
  const wordCountDisplay = document.getElementById("wordCountDisplay");
  const bookDisplay = document.getElementById("bookDisplay");

  let totalWordsRead = 0;

  bookDisplay.addEventListener("scroll", () => {
    const visibleText = getVisibleText();
    const words = visibleText.split(/\s+/);
    totalWordsRead = words.length;
    wordCountDisplay.textContent = `Words Read: ${totalWordsRead}`;
    saveWordCount(totalWordsRead);
  });

  function getVisibleText() {
    return bookDisplay.textContent;
  }

  function saveWordCount(count) {
    localStorage.setItem("wordCount", count);
  }

  function loadWordCount() {
    const savedWordCount = localStorage.getItem("wordCount");
    if (savedWordCount) {
      wordCountDisplay.textContent = `Words Read: ${savedWordCount}`;
    }
  }

  loadWordCount();
});
