// userProfiles.js

/**
 * User Profiles functionality.
 * - Allows users to create and switch between different reading profiles.
 * - Saves preferences (font, color, line spacing) for each profile.
 */

document.addEventListener("DOMContentLoaded", () => {
  const profileSelect = document.getElementById("profileSelect");
  const saveProfileButton = document.getElementById("saveProfileButton");
  const profiles = JSON.parse(localStorage.getItem("userProfiles")) || {};

  saveProfileButton.addEventListener("click", saveProfile);
  profileSelect.addEventListener("change", loadProfile);

  function saveProfile() {
    const profileName = profileSelect.value;
    profiles[profileName] = {
      fontStyle: document.getElementById("fontStyle").value,
      fontColor: document.getElementById("fontColor").value,
      backgroundColor: document.getElementById("backgroundColor").value,
      lineSpacing: document.getElementById("lineSpacing").value,
    };
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
    alert(`Profile "${profileName}" saved.`);
  }

  function loadProfile() {
    const profileName = profileSelect.value;
    if (profiles[profileName]) {
      const { fontStyle, fontColor, backgroundColor, lineSpacing } =
        profiles[profileName];
      document.getElementById("fontStyle").value = fontStyle;
      document.getElementById("fontColor").value = fontColor;
      document.getElementById("backgroundColor").value = backgroundColor;
      document.getElementById("lineSpacing").value = lineSpacing;
      applyProfileSettings();
    }
  }

  function applyProfileSettings() {
    document.getElementById("fontStyle").dispatchEvent(new Event("change"));
    document.getElementById("fontColor").dispatchEvent(new Event("input"));
    document
      .getElementById("backgroundColor")
      .dispatchEvent(new Event("input"));
    document.getElementById("lineSpacing").dispatchEvent(new Event("input"));
  }
});
