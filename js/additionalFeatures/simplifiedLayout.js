// simplifiedLayout.js

/**
 * Simplified Layout functionality.
 * - Provides a simplified and cleaner reading layout for dyslexic students.
 * - Toggles between the default and simplified layouts.
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggleLayoutButton = document.getElementById("toggleLayoutButton");

  if (toggleLayoutButton) {
    toggleLayoutButton.addEventListener("click", () => {
      document.body.classList.toggle("simplified-layout");
      const isSimplified = document.body.classList.contains("simplified-layout");
      localStorage.setItem(
        "simplifiedLayout",
        isSimplified ? "enabled" : "disabled"
      );
    });
  }

  function loadSimplifiedLayout() {
    const layoutStatus = localStorage.getItem("simplifiedLayout");
    if (layoutStatus === "enabled") {
      document.body.classList.add("simplified-layout");
    }
  }

  loadSimplifiedLayout();
});
