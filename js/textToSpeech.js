// textToSpeech.js

/**
 * Text-to-Speech functionality.
 * - Converts displayed book content into speech.
 * - Allows users to choose different voices and control speech rate.
 */

document.addEventListener("DOMContentLoaded", () => {
  const ttsButton = document.getElementById("startTTS");
  const voiceSelect = document.getElementById("voiceSelect");
  const rateSlider = document.getElementById("rateSlider");
  const stopButton = document.getElementById("stopTTS");

  let voices = [];
  let synth = window.speechSynthesis;

  // Load available voices for the TTS engine
  synth.onvoiceschanged = function () {
    voices = synth.getVoices();
    populateVoiceList();
  };

  ttsButton.addEventListener("click", startTTS);
  stopButton.addEventListener("click", stopTTS);

  function populateVoiceList() {
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
  }

  function startTTS() {
    const text = document.getElementById("bookDisplay").textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(
      (voice) => voice.name === voiceSelect.value
    );
    const rate = rateSlider.value;

    utterance.voice = selectedVoice;
    utterance.rate = rate;
    synth.speak(utterance);
  }

  function stopTTS() {
    if (synth.speaking) {
      synth.cancel();
    }
  }
});
