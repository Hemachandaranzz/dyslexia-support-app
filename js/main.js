// main.js

/**
 * Main JavaScript file to handle overall app functionality.
 * - Initializes event listeners for dark mode toggle.
 * - Ensures smooth navigation between sections.
 * - Calls appropriate functions for each feature.
 */

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
  toggleDarkModeButton.addEventListener("click", toggleDarkMode);

  // Initialize other features
  initializeFeatures();
});

/**
 * Toggles dark mode by adding/removing the "dark-mode" class on the body.
 */
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

/**
 * Initializes features based on user preferences (like dark mode).
 */
function initializeFeatures() {
  // Check if dark mode was previously enabled
  const darkModeStatus = localStorage.getItem("darkMode");
  if (darkModeStatus === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // More feature initialization logic can be added here
}
