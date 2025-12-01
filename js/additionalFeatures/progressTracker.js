// progressTracker.js

/**
 * Progress Tracker functionality.
 * - Tracks and saves the user's progress within the uploaded book.
 * - Displays a progress bar showing how much of the book has been read.
 */

document.addEventListener("DOMContentLoaded", () => {
  const bookDisplay = document.getElementById("bookDisplay");
  const progressBar = document.getElementById("progressBar");

  bookDisplay.addEventListener("scroll", updateProgress);

  function updateProgress() {
    const scrollTop = bookDisplay.scrollTop;
    const scrollHeight = bookDisplay.scrollHeight - bookDisplay.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
    saveProgress(progress);
  }

  function saveProgress(progress) {
    localStorage.setItem("readingProgress", progress);
  }

  function loadProgress() {
    const savedProgress = localStorage.getItem("readingProgress");
    if (savedProgress) {
      progressBar.style.width = `${savedProgress}%`;
    }
  }

  loadProgress();
});
