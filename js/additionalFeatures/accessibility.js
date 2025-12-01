// accessibility.js

/**
 * Accessibility functionality.
 * - Enhances accessibility for users with visual impairments or reading difficulties.
 * - Includes features like text enlargement, color contrast adjustments, and keyboard navigation support.
 */

document.addEventListener("DOMContentLoaded", () => {
  const increaseFontSizeButton = document.getElementById("increaseFontSize");
  const decreaseFontSizeButton = document.getElementById("decreaseFontSize");
  const contrastToggleButton = document.getElementById("toggleContrast");
  const bookDisplay = document.getElementById("bookDisplay");

  let fontSize = 16;
  let isHighContrast = false;

  increaseFontSizeButton.addEventListener("click", () => {
    fontSize += 2;
    updateFontSize();
  });

  decreaseFontSizeButton.addEventListener("click", () => {
    fontSize -= 2;
    updateFontSize();
  });

  contrastToggleButton.addEventListener("click", () => {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle("high-contrast", isHighContrast);
    localStorage.setItem(
      "highContrast",
      isHighContrast ? "enabled" : "disabled"
    );
  });

  function updateFontSize() {
    bookDisplay.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }

  function loadAccessibilitySettings() {
    const savedFontSize = localStorage.getItem("fontSize");
    const contrastStatus = localStorage.getItem("highContrast");

    if (savedFontSize) {
      fontSize = parseInt(savedFontSize, 10);
      updateFontSize();
    }

    if (contrastStatus === "enabled") {
      isHighContrast = true;
      document.body.classList.add("high-contrast");
    }
  }

  loadAccessibilitySettings();
});
