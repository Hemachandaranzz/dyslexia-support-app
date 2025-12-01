# 🧠 Dyslexia Support App

A comprehensive, modern web application designed to help individuals with dyslexia improve their reading experience, enhance memory, and develop problem-solving skills through an accessible and customizable interface.

## ✨ Features

### 📚 Reading Support
- **Multi-Format Book Upload**: Support for PDF, EPUB, and TXT files
- **Customizable Reading Experience**:
  - Multiple dyslexia-friendly fonts
  - Adjustable font colors and background colors
  - Customizable line spacing and text margins
  - Text highlighting for important passages
- **Reading Progress Tracker**: Visual progress bar to track reading achievements

### 🔊 Accessibility Features
- **Text-to-Speech**: Natural voice synthesis with adjustable speech rate
- **Speech-to-Text**: Voice input capability for hands-free interaction
- **Dark Mode**: Eye-friendly dark theme with smooth transitions
- **Keyboard Navigation**: Full keyboard accessibility support

### 🎮 Interactive Games
- **Memory Matching Game**: Enhance visual memory with colorful card matching
- **Sequence Recall Game**: Improve short-term memory and pattern recognition
- **Puzzle Solver Game**: Develop problem-solving skills with sliding puzzles

### 📖 Learning Tools
- **Dictionary Lookup**: Quick word definitions to improve vocabulary
- **User Profiles**: Save and load personal preferences
- **Simplified Layout Mode**: Distraction-free reading interface

## 🎨 Design Highlights

- **Modern Premium UI**: Vibrant gradients, glassmorphism effects, and smooth animations
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **Accessibility First**: High contrast, clear typography, and intuitive interactions
- **Smooth Transitions**: Micro-animations enhance user experience

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation required!

### Usage
1. Open `index.html` in your web browser
2. Upload a book file (PDF, EPUB, or TXT)
3. Customize your reading experience using the controls
4. Explore games and learning tools

### File Structure
```
dyslexia-app/
├── index.html              # Main application file
├── css/
│   ├── styles.css         # Modern main styles with gradients
│   ├── dark-mode.css      # Dark theme styling
│   └── games.css          # Game-specific styles
├── js/
│   ├── main.js            # Core application logic
│   ├── bookUpload.js      # File upload and parsing
│   ├── customization.js   # Reading customization
│   ├── textToSpeech.js    # TTS functionality
│   ├── games/
│   │   ├── memoryMatching.js   # Memory card game
│   │   ├── sequenceRecall.js   # Sequence memory game
│   │   └── puzzleSolver.js     # Sliding puzzle game
│   ├── additionalFeatures/
│   │   ├── darkMode.js         # Dark mode toggle
│   │   ├── dictionary.js       # Word lookup
│   │   ├── speechToText.js     # Voice input
│   │   ├── highlighting.js     # Text highlighting
│   │   ├── progressTracker.js  # Reading progress
│   │   ├── userProfiles.js     # User preferences
│   │   └── accessibility.js    # Accessibility features
│   └── utilities.js       # Helper functions
└── assets/
    ├── images/            # Game images
    ├── sounds/            # Sound effects (optional)
    └── fonts/             # Custom fonts
```

## 🎯 Key Technologies

- **PDF.js**: PDF file parsing and rendering
- **ePub.js**: EPUB file support
- **Web Speech API**: Text-to-speech and speech-to-text
- **LocalStorage API**: Persistent user preferences
- **Modern CSS**: Gradients, glassmorphism, animations
- **Vanilla JavaScript**: No framework dependencies

## 🎮 Game Instructions

### Memory Matching Game
1. Click "Play Memory Matching Game"
2. Click cards to flip and reveal symbols
3. Match all pairs to win
4. Try to complete in the fewest moves!

### Sequence Recall Game
1. Memorize the displayed number sequence
2. Enter the sequence in the input field
3. Submit to check if you remembered correctly
4. Challenge yourself with longer sequences!

### Puzzle Solver Game
1. Click and drag puzzle pieces
2. Arrange tiles to complete the picture
3. Track your moves and time
4. Use shuffle for a new challenge!

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard control
- **High Contrast**: Clear visual hierarchy
- **Focus Indicators**: Visible focus states
- **Responsive Text**: Scalable for different needs

## 🎨 Customization Options

### Reading Preferences
- Font style selection (OpenDyslexic, Arial, Verdana)
- Custom font colors
- Background color adjustment
- Line spacing control (1.0x - 2.5x)
- Text margin adjustment

### Interface Preferences
- Light/Dark theme toggle
- Simplified layout mode
- User profile save/load

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Note**: PDF.js and Web Speech API work best in modern browsers with JavaScript enabled.

## 🔧 Advanced Features

### Text-to-Speech
- Multiple voice options
- Adjustable speech rate (0.5x - 2.0x)
- Start/Stop controls
- Highlight sync (reads aloud selected text)

### Book Upload
- Drag-and-drop support
- Multiple file format handling
- Error handling and user feedback
- Loading progress indicators

## 💾 Data Storage

User preferences are stored locally in your browser using LocalStorage:
- Font preferences
- Color schemes
- Reading progress
- Custom settings

**Privacy**: No data is sent to external servers. All processing happens locally in your browser.

## 🎓 Educational Benefits

### For Students with Dyslexia
- **Improved Reading Comprehension**: Customizable text presentation
- **Enhanced Memory**: Interactive memory games
- **Vocabulary Building**: Integrated dictionary
- **Independent Learning**: Self-paced tools

### For Educators
- **Assistive Tool**: Support diverse learning needs
- **Progress Tracking**: Monitor reading progress
- **Engagement**: Gamified learning elements

## 🤝 Contributing

This is an open-source project. Contributions, suggestions, and feedback are welcome!

## 📄 License

This project is created for educational and accessibility purposes.

## 🙏 Acknowledgments

- **OpenDyslexic Font**: Dyslexia-friendly typography
- **PDF.js**: Mozilla's PDF rendering library
- **ePub.js**: EPUB reader library
- **Web Speech API**: Browser-native speech synthesis

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Use a modern browser

---

**Built with ❤️ for accessibility and inclusive learning**

*Making reading easier, one page at a time.*
