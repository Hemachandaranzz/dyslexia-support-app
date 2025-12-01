// dictionary.js

/**
 * Dictionary functionality.
 * - Allows users to look up definitions of words by typing them or selecting them in the book content.
 * - Displays definitions fetched from an external API.
 */

document.addEventListener("DOMContentLoaded", () => {
  const dictionaryForm = document.getElementById("dictionaryForm");
  const dictionaryInput = document.getElementById("dictionaryInput");
  const definitionDisplay = document.getElementById("definitionDisplay");

  if (dictionaryForm) {
    dictionaryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const word = dictionaryInput.value.trim();
      if (word) {
        fetchDefinition(word);
      }
    });
  }

  function fetchDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0] && data[0].meanings) {
          displayDefinition(data[0].meanings);
        } else {
          definitionDisplay.textContent = "Definition not found.";
        }
      })
      .catch(() => {
        definitionDisplay.textContent = "Error fetching definition.";
      });
  }

  function displayDefinition(meanings) {
    definitionDisplay.innerHTML = "";
    meanings.forEach((meaning) => {
      const definition = meaning.definitions[0].definition;
      const partOfSpeech = meaning.partOfSpeech;
      const definitionItem = document.createElement("p");
      definitionItem.innerHTML = `<strong>${partOfSpeech}:</strong> ${definition}`;
      definitionDisplay.appendChild(definitionItem);
    });
  }
});
