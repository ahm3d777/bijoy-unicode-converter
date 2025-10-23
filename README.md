# 🔤 Bijoy to Unicode Converter | বিজয় থেকে ইউনিকোড কনভার্টার

A complete, fully functional web application for converting **Bijoy ANSI-encoded Bengali text** to **Unicode Bengali** format. Built with React, this tool provides instant conversion with file upload/download capabilities and a beautiful, responsive UI.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- ✅ **Accurate Bijoy to Unicode Conversion** - Based on standard Bijoy keyboard mapping
- ✅ **Auto-Detection** - Automatically detects Bijoy ANSI encoded text
- ✅ **Real-time Conversion** - Instant conversion as you type
- ✅ **File Upload** - Upload `.txt` files containing Bijoy text
- ✅ **Download Output** - Save converted text as a `.txt` file
- ✅ **Copy to Clipboard** - One-click copy functionality with visual feedback
- ✅ **Character Counter** - Track input and output character counts

### User Interface
- 🎨 **Beautiful Design** - Modern, clean interface with gradient backgrounds
- 🌓 **Dark Mode** - Toggle between light and dark themes (respects system preference)
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🎯 **Intuitive UX** - Simple drag-and-drop file upload
- ⚡ **Fast Performance** - Client-side conversion for instant results
- 🔤 **Bengali Font Support** - Uses Noto Sans Bengali for proper Unicode display

### Technical Features
- 🚀 **No Backend Required** - Runs entirely in the browser
- 📦 **Easy Deployment** - Can be deployed to Netlify, Vercel, or any static host
- 🔒 **Privacy Focused** - All conversion happens locally, no data sent to servers
- 🎭 **Comprehensive Mapping** - Supports all Bijoy characters, vowels, consonants, and special symbols

## 🖼️ Screenshots

### Light Mode
The app features a clean, modern interface with a gradient background in light mode.

### Dark Mode
Eye-friendly dark theme that respects your system preferences.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project files**
2. **Navigate to the project directory**
   ```bash
   cd bijoy-unicode-converter
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in your terminal

## 📋 Usage Guide

### Method 1: Direct Text Input
1. Paste or type your Bijoy ANSI text in the left text area
2. The converted Unicode text appears instantly on the right
3. Use the "Copy to Clipboard" or "Download as .txt" buttons to save your result

### Method 2: File Upload
1. Click on the file upload area or drag and drop a `.txt` file
2. The file content will be loaded and converted automatically
3. Download the converted version with the same filename plus `_unicode` suffix

### Example Conversion

**Input (Bijoy ANSI):**
```
Avwg evsjv‡`k
```

**Output (Unicode):**
```
আমি বাংলাদেশ
```

## 🏗️ Project Structure

```
bijoy-unicode-converter/
├── index.html              # Main HTML template
├── main.jsx               # React entry point
├── App.jsx                # Main App component
├── BijoyConverter.jsx     # Core converter component with all logic
├── index.css              # Global styles with Tailwind directives
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🔧 Build Commands

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
```

The production build will be created in the `dist/` folder.

## 🌐 Deployment

### Deploy to Netlify

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

   Or simply drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

   Or connect your GitHub repository to Vercel for automatic deployments

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔤 Bijoy to Unicode Mapping

The converter includes comprehensive mapping for:

- **Vowels** (স্বরবর্ণ): অ, আ, ই, ঈ, উ, ঊ, ঋ, এ, ঐ, ও, ঔ
- **Consonants** (ব্যঞ্জনবর্ণ): ক-হ, ড়, ঢ়, য়, ৎ
- **Vowel Signs** (কার): া, ি, ী, ু, ূ, ৃ, ে, ৈ, ো, ৌ
- **Modifiers**: ং, ঃ, ঁ, ্ (hasant)
- **Numbers** (সংখ্যা): ০-৯
- **Special Characters**: ।, ॥, ৳

## 🛠️ Technologies Used

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Noto Sans Bengali)
- **Language**: JavaScript (ES6+)

## 📝 Key Features Explained

### Auto-Detection Algorithm
The app intelligently detects Bijoy ANSI text by checking for:
- Special Bijoy characters (†, ‡, ˆ, Õ, ×, etc.)
- Uppercase letters combined with kar symbols
- ANSI Bengali character ranges

### Conversion Logic
- Two-pass character matching (2-char sequences first, then single chars)
- Preserves non-Bijoy characters
- Handles complex character combinations
- Maintains text formatting and line breaks

### Dark Mode Implementation
- Respects system preferences on initial load
- Persistent toggle with smooth transitions
- Optimized color schemes for readability
- All UI elements adapt to theme changes

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- Some rare or archaic Bijoy character combinations may not convert perfectly
- Very large files (>10MB) may cause browser slowdown
- The app requires a modern browser with ES6 support

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for the Bengali language community.

**Powered by AI Converter — Bijoy to Unicode**

## 🙏 Acknowledgments

- Bijoy keyboard layout by Mustafa Jabbar
- Unicode Consortium for Bengali Unicode standards
- OmicronLab Avro for conversion reference
- React and Vite communities

## 📞 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Check the documentation at [docs](./docs)
- Join our community discussions

## 🔮 Future Enhancements

- [ ] Reverse conversion (Unicode to Bijoy)
- [ ] Support for multiple file formats (DOC, DOCX)
- [ ] Batch file conversion
- [ ] Custom mapping editor
- [ ] Mobile app version
- [ ] Browser extension
- [ ] API endpoint for programmatic access

---

**Star ⭐ this repository if you found it helpful!**

Made with React • Tailwind • Love for Bengali Language 🇧🇩
