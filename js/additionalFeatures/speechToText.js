// speechToText.js

/**
 * Speech-to-Text functionality.
 * - Converts spoken words into text and displays it in the app.
 * - Allows users to dictate notes or input without typing.
 */

document.addEventListener("DOMContentLoaded", () => {
  const startSTTButton = document.getElementById("startSTT");
  const stopSTTButton = document.getElementById("stopSTT");
  const speechOutput = document.getElementById("speechOutput");

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.interimResults = true;
  recognition.lang = "en-US";

  if (startSTTButton) {
    startSTTButton.addEventListener("click", () => {
      recognition.start();
    });
  }

  if (stopSTTButton) {
    stopSTTButton.addEventListener("click", () => {
      recognition.stop();
    });
  }

  recognition.addEventListener("result", (event) => {
    let transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");

    speechOutput.textContent = transcript;
  });

  recognition.addEventListener("end", () => {
    startSTTButton.disabled = false;
  });
});
