// utilities.js

/**
 * Utility functions used throughout the app.
 * - Includes helper functions like saving/loading data from localStorage, formatting text, etc.
 */

/**
 * Saves data to localStorage.
 * @param {string} key - The key under which the data should be saved.
 * @param {any} value - The value to save.
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads data from localStorage.
 * @param {string} key - The key from which to retrieve the data.
 * @returns {any} - The loaded data or null if not found.
 */
function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Formats text by trimming excess whitespace.
 * @param {string} text - The text to format.
 * @returns {string} - The formatted text.
 */
function formatText(text) {
  return text.trim().replace(/\s+/g, " ");
}
