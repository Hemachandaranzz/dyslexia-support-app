// customization.js

/**
 * Customization Options for User Reading Experience.
 * - Allows users to change font style, font color, background color, line spacing, and margins.
 * - Saves preferences in localStorage for persistence across sessions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const fontStyleSelect = document.getElementById("fontStyle");
  const fontColorInput = document.getElementById("fontColor");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const lineSpacingSlider = document.getElementById("lineSpacing");
  const textMarginSlider = document.getElementById("textMargin");

  initializeCustomization();

  fontStyleSelect.addEventListener("change", applyFontStyle);
  fontColorInput.addEventListener("input", applyFontColor);
  backgroundColorInput.addEventListener("input", applyBackgroundColor);
  lineSpacingSlider.addEventListener("input", applyLineSpacing);
  textMarginSlider.addEventListener("input", applyTextMargin);
});

function initializeCustomization() {
  const savedPrefs = JSON.parse(localStorage.getItem("userPreferences")) || {};

  document.getElementById("fontStyle").value =
    savedPrefs.fontStyle || "OpenDyslexic";
  document.getElementById("fontColor").value =
    savedPrefs.fontColor || "#000000";
  document.getElementById("backgroundColor").value =
    savedPrefs.backgroundColor || "#FFFFFF";
  document.getElementById("lineSpacing").value = savedPrefs.lineSpacing || 1.6;
  document.getElementById("textMargin").value = savedPrefs.textMargin || 10;

  applyFontStyle();
  applyFontColor();
  applyBackgroundColor();
  applyLineSpacing();
  applyTextMargin();
}

function applyFontStyle() {
  const fontStyle = document.getElementById("fontStyle").value;
  const bookDisplay = document.getElementById("bookDisplay");

  // Map font selection to proper font-family CSS with fallbacks
  const fontMap = {
    "OpenDyslexic": "'OpenDyslexic', 'Comic Sans MS', sans-serif",
    "Lexend": "'Lexend', -apple-system, BlinkMacSystemFont, sans-serif",
    "Arial": "Arial, Helvetica, sans-serif",
    "Verdana": "Verdana, Geneva, sans-serif",
    "Comic Sans MS": "'Comic Sans MS', 'Comic Sans', cursive",
    "Tahoma": "Tahoma, Geneva, sans-serif"
  };

  const fontFamily = fontMap[fontStyle] || fontStyle;
  bookDisplay.style.fontFamily = fontFamily;

  // Also update font size for better readability
  if (fontStyle === "OpenDyslexic" || fontStyle === "Lexend") {
    bookDisplay.style.fontSize = "1.15rem";
  }

  savePreference("fontStyle", fontStyle);

  // Show feedback to user
  showFontChangeNotification(fontStyle);
}

function showFontChangeNotification(fontName) {
  // Remove any existing notifications
  const existing = document.querySelector('.font-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'font-notification';
  notification.textContent = `✓ Font changed to ${fontName}`;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function applyFontColor() {
  const fontColor = document.getElementById("fontColor").value;
  document.getElementById("bookDisplay").style.color = fontColor;
  savePreference("fontColor", fontColor);
}

function applyBackgroundColor() {
  const backgroundColor = document.getElementById("backgroundColor").value;
  document.getElementById("bookDisplay").style.backgroundColor =
    backgroundColor;
  savePreference("backgroundColor", backgroundColor);
}

function applyLineSpacing() {
  const lineSpacing = document.getElementById("lineSpacing").value;
  document.getElementById("bookDisplay").style.lineHeight = lineSpacing;
  savePreference("lineSpacing", lineSpacing);
}

function applyTextMargin() {
  const textMargin = document.getElementById("textMargin").value;
  document.getElementById("bookDisplay").style.margin = `${textMargin}px`;
  savePreference("textMargin", textMargin);
}

function savePreference(key, value) {
  const savedPrefs = JSON.parse(localStorage.getItem("userPreferences")) || {};
  savedPrefs[key] = value;
  localStorage.setItem("userPreferences", JSON.stringify(savedPrefs));
}
