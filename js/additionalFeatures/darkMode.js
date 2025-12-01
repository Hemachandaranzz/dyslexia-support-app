// darkMode.js

/**
 * Dark Mode functionality.
 * - Toggles between light and dark mode.
 * - Saves the user's preference in localStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });
  }

  function loadDarkMode() {
    const darkModeStatus = localStorage.getItem("darkMode");
    if (darkModeStatus === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }

  loadDarkMode();
});
