// Global variables
let pdfDoc = null;
let pdfPages = [];
let currentPage = 0;
let selectedFormat = 'standard';
let currentFileName = '';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

document.addEventListener("DOMContentLoaded", () => {
  const uploadZone = document.getElementById("upload-zone");
  const fileInput = document.getElementById("bookUpload");

  // Drag and drop handlers
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("dragover");
  });

  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  });

  // Click to upload
  uploadZone.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  });

  // Initialize styles for progress bar
  addProgressStyles();
});

/**
 * Handle file selection
 */
function handleFileSelection(file) {
  const uploadZone = document.getElementById("upload-zone");
  const validTypes = ['application/pdf', 'application/epub+zip', 'text/plain'];

  if (!validTypes.includes(file.type) && !file.name.endsWith('.epub')) {
    showError('Invalid file type', 'Please upload a PDF, EPUB, or TXT file.');
    return;
  }

  currentFileName = file.name;
  uploadZone.classList.add("uploading");
  uploadZone.innerHTML = `
    <div class="upload-progress">
      <div class="loading-dots">
        <span></span><span></span><span></span>
      </div>
      <p class="upload-progress-text">Processing ${file.name}...</p>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" id="uploadProgressFill"></div>
      </div>
    </div>
  `;

  if (file.type === 'application/pdf') {
    parsePDF(file);
  } else if (file.type === 'application/epub+zip' || file.name.endsWith('.epub')) {
    parseEPUB(file);
  } else if (file.type === 'text/plain') {
    parseTXT(file);
  }
}

/**
 * Add progress bar styles dynamically
 */
function addProgressStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .upload-progress {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .progress-bar-container {
      width: 80%;
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 10px;
      margin-top: 15px;
      overflow: hidden;
    }
    .progress-bar-fill {
      width: 0%;
      height: 100%;
      background: #4facfe;
      border-radius: 10px;
      transition: width 0.3s ease;
    }
    .loading-dots {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    .loading-dots span {
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .loading-dots span:nth-child(1) {
      animation-delay: -0.32s;
    }
    .loading-dots span:nth-child(2) {
      animation-delay: -0.16s;
    }
    .loading-dots span:nth-child(3) {
      animation-delay: 0s;
    }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
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
 * Parses a PDF file and stores pages separately.
 * @param {File} file - The PDF file to parse.
 */
async function parsePDF(file) {
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
        const numPages = pdf.numPages;
        pdfPages = []; // Reset pages array

        // Extract text from all pages
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');

          // Store each page separately
          pdfPages.push({
            number: pageNum,
            text: pageText.trim()
          });

          // Update progress
          const progress = 20 + (pageNum / numPages) * 70;
          updateProgress(progress, `Processing page ${pageNum} of ${numPages}...`);
        }

        updateProgress(100, 'Complete!');
        setTimeout(() => {
          uploadZone.classList.remove("uploading");
          // Show format selection modal
          showFormatSelectionModal();
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
 * Show format selection modal
 */
function showFormatSelectionModal() {
  const modal = document.getElementById('format-modal');
  modal.style.display = 'flex';

  // Add event listeners to format buttons
  const formatButtons = modal.querySelectorAll('.format-option');
  formatButtons.forEach(button => {
    button.onclick = () => {
      const format = button.getAttribute('data-format');
      selectFormat(format);
    };
  });

  // Add fade-in animation
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

/**
 * Handle format selection
 */
function selectFormat(format) {
  selectedFormat = format;
  const modal = document.getElementById('format-modal');

  // Hide modal with animation
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
    // Display first page with selected format
    currentPage = 0;
    displayCurrentPage();
    createPageNavigation();
    showSuccessNotification(`✓ ${currentFileName} loaded with ${getFormatName(format)} format!`);
  }, 300);
}

/**
 * Get format display name
 */
function getFormatName(format) {
  const names = {
    'standard': 'Standard',
    'dyslexic': 'Dyslexic-Friendly',
    'large': 'Large Print',
    'contrast': 'High Contrast'
  };
  return names[format] || 'Standard';
}

/**
 * Display the current page with selected format
 */
function displayCurrentPage() {
  if (pdfPages.length === 0) return;

  const bookDisplay = document.getElementById("bookDisplay");
  const pageData = pdfPages[currentPage];

  // Apply format to text
  const formattedText = applyTextFormat(pageData.text, selectedFormat);

  // Display with fade effect
  bookDisplay.style.opacity = '0';
  bookDisplay.innerHTML = formattedText;
  bookDisplay.className = `format-${selectedFormat}`;

  setTimeout(() => {
    bookDisplay.style.transition = 'opacity 0.3s ease';
    bookDisplay.style.opacity = '1';
  }, 50);

  // Update page navigation
  updatePageNavigation();
}

/**
 * Apply text formatting based on selected format
 */
function applyTextFormat(text, format) {
  let formattedText = text;

  switch (format) {
    case 'standard':
      formattedText = `<div class="text-standard">${text}</div>`;
      break;
    case 'dyslexic':
      formattedText = `<div class="text-dyslexic">${text}</div>`;
      break;
    case 'large':
      formattedText = `<div class="text-large">${text}</div>`;
      break;
    case 'contrast':
      formattedText = `<div class="text-contrast">${text}</div>`;
      break;
  }

  return formattedText;
}

/**
 * Create page navigation controls
 */
function createPageNavigation() {
  const pageNav = document.getElementById('page-navigation');

  pageNav.innerHTML = `
    <div class="page-nav-container">
      <button id="prev-page" class="page-nav-btn" title="Previous Page">
        <span>◀</span> Previous
      </button>
      <div class="page-info">
        <span class="page-current">Page <input type="number" id="page-jump" value="${currentPage + 1}" min="1" max="${pdfPages.length}"> of ${pdfPages.length}</span>
      </div>
      <button id="next-page" class="page-nav-btn" title="Next Page">
        Next <span>▶</span>
      </button>
    </div>
  `;

  pageNav.style.display = 'flex';

  // Add event listeners
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageJumpInput = document.getElementById('page-jump');

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (!prevBtn.classList.contains('disabled')) navigatePage(-1);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (!nextBtn.classList.contains('disabled')) navigatePage(1);
    };
  }

  if (pageJumpInput) {
    pageJumpInput.onchange = (e) => jumpToPage(parseInt(e.target.value) - 1);
  }

  updatePageNavigation();
}

/**
 * Navigate to previous or next page
 */
function navigatePage(direction) {
  const newPage = currentPage + direction;

  if (newPage >= 0 && newPage < pdfPages.length) {
    currentPage = newPage;
    displayCurrentPage();
  }
}

/**
 * Jump to specific page
 */
function jumpToPage(pageIndex) {
  if (pageIndex >= 0 && pageIndex < pdfPages.length) {
    currentPage = pageIndex;
    displayCurrentPage();
  }
}

/**
 * Update page navigation button states
 */
function updatePageNavigation() {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageJump = document.getElementById('page-jump');

  if (prevBtn) {
    if (currentPage === 0) {
      prevBtn.classList.add('disabled');
      prevBtn.setAttribute('aria-disabled', 'true');
    } else {
      prevBtn.classList.remove('disabled');
      prevBtn.setAttribute('aria-disabled', 'false');
    }
  }

  if (nextBtn) {
    if (currentPage === pdfPages.length - 1) {
      nextBtn.classList.add('disabled');
      nextBtn.setAttribute('aria-disabled', 'true');
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.setAttribute('aria-disabled', 'false');
    }
  }

  if (pageJump) {
    pageJump.value = currentPage + 1;
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
