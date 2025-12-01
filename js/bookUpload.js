// bookUpload.js - Enhanced with Drag & Drop and Animations

/**
 * Book Upload functionality with drag & drop support.
 * - Allows users to upload books (PDF, EPUB, TXT).
 * - Drag and drop interface with visual feedback
 * - Animated progress indicators
 * - Parses the uploaded file and displays its content in the app.
 */

document.addEventListener("DOMContentLoaded", () => {
  const bookUploadInput = document.getElementById("bookUpload");
  const uploadZone = document.getElementById("upload-zone");

  if (bookUploadInput && uploadZone) {
    // File input change event
    bookUploadInput.addEventListener("change", handleBookUpload);

    // Make upload zone clickable
    uploadZone.addEventListener("click", () => {
      bookUploadInput.click();
    });

    // Drag and drop events
    uploadZone.addEventListener("dragover", handleDragOver);
    uploadZone.addEventListener("dragleave", handleDragLeave);
    uploadZone.addEventListener("drop", handleDrop);
  }

  // Configure PDF.js worker
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
});

/**
 * Handle drag over event
 */
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const uploadZone = document.getElementById("upload-zone");
  uploadZone.classList.add("dragover");
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  const uploadZone = document.getElementById("upload-zone");
  uploadZone.classList.remove("dragover");
}

/**
 * Handle drop event
 */
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const uploadZone = document.getElementById("upload-zone");
  uploadZone.classList.remove("dragover");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileSelection(files[0]);
  }
}

/**
 * Handles the book upload event by processing the selected file.
 * Supports PDF, EPUB, and TXT file formats.
 */
function handleBookUpload(event) {
  const file = event.target.files[0];
  if (file) {
    handleFileSelection(file);
  }
}

/**
 * Process the selected file
 */
function handleFileSelection(file) {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  const bookDisplay = document.getElementById("bookDisplay");
  const uploadZone = document.getElementById("upload-zone");

  // Add uploading state
  uploadZone.classList.add("uploading");

  // Show loading state with animation
  bookDisplay.innerHTML = `
    <div style="text-align: center; padding: 3rem;">
      <div class="upload-animation">
        <div class="book-icon">📖</div>
        <div class="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
      <p style="margin-top: 1.5rem; color: #667eea; font-size: 1.1rem; font-weight: 600;">
        Loading ${file.name}
      </p>
      <div class="upload-progress">
        <div class="upload-progress-bar">
          <div class="upload-progress-fill" id="uploadProgressFill"></div>
        </div>
        <div class="upload-progress-text">Preparing...</div>
      </div>
    </div>
  `;

  // Add upload animation styles dynamically
  addUploadAnimationStyles();

  // Determine file type and parse accordingly
  setTimeout(() => {
    if (fileType === "application/pdf" || fileName.endsWith('.pdf')) {
      parsePDF(file);
    } else if (fileType === "application/epub+zip" || fileName.endsWith('.epub')) {
      parseEPUB(file);
    } else if (fileType.startsWith("text/") || fileName.endsWith('.txt')) {
      parseTXT(file);
    } else {
      uploadZone.classList.remove("uploading");
      bookDisplay.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #f5576c;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <p><strong>Unsupported file format</strong></p>
          <p>Please upload a PDF, EPUB, or TXT file.</p>
        </div>
      `;
    }
  }, 300);
}

/**
 * Add upload animation styles dynamically
 */
function addUploadAnimationStyles() {
  if (document.getElementById('upload-animation-styles')) return;

  const style = document.createElement('style');
  style.id = 'upload-animation-styles';
  style.textContent = `
    .upload-animation {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .book-icon {
      font-size: 4rem;
      animation: bookFlip 2s ease-in-out infinite;
    }
    
    @keyframes bookFlip {
      0%, 100% { transform: rotateY(0deg) scale(1); }
      50% { transform: rotateY(180deg) scale(1.1); }
    }
    
    .loading-dots {
      display: flex;
      gap: 0.5rem;
      font-size: 2rem;
      color: #667eea;
    }
    
    .loading-dots span {
      animation: bounce 1.4s ease-in-out infinite;
    }
    
    .loading-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .loading-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: 1; }
      40% { transform: translateY(-20px); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Update progress bar
 */
function updateProgress(percent, text) {
  const progressFill = document.getElementById('uploadProgressFill');
  const progressText = document.querySelector('.upload-progress-text');

  if (progressFill) {
    progressFill.style.width = percent + '%';
  }
  if (progressText) {
    progressText.textContent = text;
  }
}

/**
 * Parses a PDF file and displays its content.
 * @param {File} file - The PDF file to parse.
 */
async function parsePDF(file) {
  const bookDisplay = document.getElementById("bookDisplay");
  const uploadZone = document.getElementById("upload-zone");

  try {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js library not loaded');
    }

    const reader = new FileReader();

    reader.onload = async function (e) {
      try {
        const arrayBuffer = e.target.result;
        updateProgress(20, 'Loading PDF...');

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        const numPages = pdf.numPages;

        // Extract text from all pages
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n\n';

          // Update progress
          const progress = 20 + (pageNum / numPages) * 70;
          updateProgress(progress, `Processing page ${pageNum} of ${numPages}...`);
        }

        updateProgress(100, 'Complete!');
        setTimeout(() => {
          uploadZone.classList.remove("uploading");
          displayBookContent(fullText, file.name);
        }, 500);
      } catch (error) {
        console.error('Error parsing PDF:', error);
        uploadZone.classList.remove("uploading");
        showError('Error loading PDF', error.message);
      }
    };

    reader.onerror = function () {
      uploadZone.classList.remove("uploading");
      showError('Error reading file', 'Could not read the PDF file.');
    };

    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error('Error initializing PDF parser:', error);
    uploadZone.classList.remove("uploading");
    showError('PDF support not available', 'PDF.js library failed to load. Please refresh the page.');
  }
}

/**
 * Parses an EPUB file and displays its content.
 * @param {File} file - The EPUB file to parse.
 */
function parseEPUB(file) {
  const bookDisplay = document.getElementById("bookDisplay");
  const uploadZone = document.getElementById("upload-zone");

  try {
    if (typeof ePub === 'undefined') {
      throw new Error('ePub.js library not loaded');
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        updateProgress(50, 'Loading EPUB...');
        const epubData = e.target.result;
        const book = ePub(epubData);

        updateProgress(100, 'Complete!');
        setTimeout(() => {
          uploadZone.classList.remove("uploading");
          // Render the epub book
          book.renderTo("bookDisplay", {
            width: "100%",
            height: "100%"
          });
          showSuccessNotification(`EPUB loaded: ${file.name}`);
        }, 500);
      } catch (error) {
        console.error('Error parsing EPUB:', error);
        uploadZone.classList.remove("uploading");
        showError('Error loading EPUB', error.message);
      }
    };

    reader.onerror = function () {
      uploadZone.classList.remove("uploading");
      showError('Error reading file', 'Could not read the EPUB file.');
    };

    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error('Error initializing EPUB parser:', error);
    uploadZone.classList.remove("uploading");
    showError('EPUB support not available', 'ePub.js library failed to load. Please refresh the page.');
  }
}

/**
 * Parses a TXT file and displays its content.
 * @param {File} file - The TXT file to parse.
 */
function parseTXT(file) {
  const reader = new FileReader();
  const uploadZone = document.getElementById("upload-zone");

  updateProgress(30, 'Reading text file...');

  reader.onload = function (e) {
    const text = e.target.result;
    updateProgress(100, 'Complete!');
    setTimeout(() => {
      uploadZone.classList.remove("uploading");
      displayBookContent(text, file.name);
    }, 500);
  };

  reader.onerror = function () {
    uploadZone.classList.remove("uploading");
    showError('Error reading file', 'Could not read the text file.');
  };

  reader.readAsText(file);
}

/**
 * Displays the uploaded book content in the designated area.
 * @param {string} content - The book content to display.
 * @param {string} fileName - Name of the uploaded file
 */
function displayBookContent(content, fileName) {
  const bookDisplay = document.getElementById("bookDisplay");

  if (!content || content.trim() === '') {
    showError('No content found', 'The file appears to be empty or could not be read.');
    return;
  }

  // Fade in effect
  bookDisplay.style.opacity = '0';
  bookDisplay.textContent = content;

  setTimeout(() => {
    bookDisplay.style.transition = 'opacity 0.5s ease';
    bookDisplay.style.opacity = '1';
  }, 100);

  // Show success notification
  showSuccessNotification(`✓ ${fileName} loaded successfully!`);
}

/**
 * Show error message
 */
function showError(title, message) {
  const bookDisplay = document.getElementById("bookDisplay");
  bookDisplay.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: #f5576c; animation: fadeIn 0.3s ease-out;">
      <div style="font-size: 3rem; margin-bottom: 1rem; animation: shake 0.5s ease;">⚠️</div>
      <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">${title}</p>
      <p>${message}</p>
    </div>
  `;
}

/**
 * Show success notification
 */
function showSuccessNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
