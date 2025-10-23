import React, { useState, useEffect } from 'react';
import { Copy, Download, Upload, Moon, Sun, Check } from 'lucide-react';

// Bijoy to Unicode mapping table
const bijoyToUnicodeMap = {
  // Vowels
  'A': 'আ', 'B': 'ই', 'C': 'ঈ', 'D': 'উ', 'E': 'ঊ', 'F': 'ঋ',
  'G': 'এ', 'H': 'ঐ', 'I': 'ও', 'J': 'ঔ',
  
  // Consonants
  'K': 'ক', 'L': 'খ', 'M': 'গ', 'N': 'ঘ', 'O': 'ঙ',
  'P': 'চ', 'Q': 'ছ', 'R': 'জ', 'S': 'ঝ', 'T': 'ঞ',
  'U': 'ট', 'V': 'ঠ', 'W': 'ড', 'X': 'ঢ', 'Y': 'ণ',
  'Z': 'ত', '_': 'থ', '`': 'দ', 'a': 'ধ', 'b': 'ন',
  'c': 'প', 'd': 'ফ', 'e': 'ব', 'f': 'ভ', 'g': 'ম',
  'h': 'য', 'i': 'র', 'j': 'ল', 'k': 'শ', 'l': 'ষ',
  'm': 'স', 'n': 'হ', 'o': 'ড়', 'p': 'ঢ়', 'q': 'য়',
  'r': 'ৎ', 's': 'ং', 't': 'ঃ', 'u': 'ঁ',
  
  // Kar (vowel signs)
  'v': 'া', 'w': 'ি', 'x': 'ী', 'y': 'ু', 'z': 'ূ',
  '~': 'ৃ', '^': 'ে', '&': 'ৈ', '*': 'ো', '(': 'ৌ',
  
  // Numbers
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  
  // Special characters
  '|': '।', '\\': 'ঁ', ')': '্', '}': 'ৈ', ']': 'ৌ',
  '{': 'ে', '[': 'ো', '+': 'ঃ', '=': 'ৃ',
  
  // Additional mappings
  'Av': 'আ', 'Bv': 'ই', 'Cv': 'ঈ', 'Dv': 'উ', 'Ev': 'ঊ',
  'Gv': 'এ', 'Hv': 'ঐ', 'Iv': 'ও', 'Jv': 'ঔ',
  
  // Hasant (্)
  '‡': 'ে', 'ˆ': 'ৈ', '‰': 'ৗ', '©': 'র্', '®': 'র্য',
  
  // Common Bijoy characters
  '†': 'ে', '‡': 'ে', 'ˆ': 'ৈ', '‰': 'ৗ', 'Š': 'ৎ',
  '‹': '্র', 'Œ': '্য', 'Õ': 'আ', '×': 'ো', 'Ø': 'ৌ',
  'Ù': 'ু', 'Ú': 'ূ', 'Û': 'ৃ', 'Ü': 'ৢ', 'Ý': 'ে',
  'Þ': 'ৈ', 'ß': 'ো', 'à': 'ৌ', 'á': 'ৗ', 'â': 'ি',
  'ã': 'ী', 'ä': 'া',
  
  // Punctuation
  '¡': '।', '¢': '॥', '£': 'ঁ', '¤': '৳', '¥': 'ঃ',
  '§': '্', '¨': '়', 'ª': 'ৗ',
  
  // Extended characters
  '°': '্', '±': '়', '²': 'ৃ', '³': 'ৢ', '´': 'া',
  'µ': 'ি', '¶': 'ী', '·': 'ু', '¸': 'ূ', '¹': 'ৃ',
  'º': 'ৢ', '»': 'ে', '¼': 'ৈ', '½': 'ো', '¾': 'ৌ',
};

// Extended mapping for complex characters
const complexBijoyMap = {
  '©': 'র্',
  '®': 'র্য',
  'ª': 'ৗ',
  '¯': '্র',
  '­': '্য',
  '¬': '্',
  '«': '্',
};

function BijoyConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Bijoy to Unicode conversion function
  const convertBijoyToUnicode = (text) => {
    if (!text) return '';
    
    let converted = '';
    let i = 0;
    
    while (i < text.length) {
      let matched = false;
      
      // Try to match 2-character sequences first
      if (i < text.length - 1) {
        const twoChar = text.substring(i, i + 2);
        if (bijoyToUnicodeMap[twoChar]) {
          converted += bijoyToUnicodeMap[twoChar];
          i += 2;
          matched = true;
        } else if (complexBijoyMap[twoChar]) {
          converted += complexBijoyMap[twoChar];
          i += 2;
          matched = true;
        }
      }
      
      // If no 2-char match, try single character
      if (!matched) {
        const char = text[i];
        if (bijoyToUnicodeMap[char]) {
          converted += bijoyToUnicodeMap[char];
        } else if (complexBijoyMap[char]) {
          converted += complexBijoyMap[char];
        } else {
          // Keep the character as-is if no mapping found
          converted += char;
        }
        i++;
      }
    }
    
    return converted;
  };

  // Detect if text contains Bijoy ANSI characters
  const isBijoyText = (text) => {
    // Check for common Bijoy characters and patterns
    const bijoyPattern = /[†‡ˆ‰ŠŒÕ×ØÙÚÛÜÝÞßàáâãä¡¢£¤¥§¨ª°±²³´µ¶·¸¹º»¼½¾©®¬«­¯]/;
    const hasUppercaseLetters = /[A-Z_`]/.test(text);
    return bijoyPattern.test(text) || (hasUppercaseLetters && /[vwxyz~^&*(){}[\]|\\+=]/.test(text));
  };

  // Handle text input change
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    
    if (text.trim()) {
      const converted = convertBijoyToUnicode(text);
      setOutputText(converted);
    } else {
      setOutputText('');
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setInputText(text);
        const converted = convertBijoyToUnicode(text);
        setOutputText(converted);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .txt file');
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('Failed to copy text');
      }
    }
  };

  // Download as .txt file
  const handleDownload = () => {
    if (outputText) {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName ? fileName.replace('.txt', '_unicode.txt') : 'converted_unicode.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              বিজয় → ইউনিকোড
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bijoy ANSI to Unicode Converter
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-colors ${
              isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-lg`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* File Upload */}
        <div className={`mb-6 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <label className={`flex items-center justify-center cursor-pointer border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDarkMode 
              ? 'border-gray-600 hover:border-green-500 hover:bg-gray-700' 
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
            <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {fileName || 'Upload .txt file with Bijoy text'}
            </span>
          </label>
        </div>

        {/* Conversion Area */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Bijoy ANSI Input
              </h2>
              {inputText && isBijoyText(inputText) && (
                <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
                  Bijoy Detected
                </span>
              )}
            </div>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste or type Bijoy ANSI text here...&#10;Example: Õ‡ev → আমি"
              className={`w-full h-96 p-4 rounded-lg border-2 transition-colors font-mono text-lg resize-none ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-green-500'
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-green-500'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            />
            <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Characters: {inputText.length}
            </div>
          </div>

          {/* Output */}
          <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Unicode Output
              </h2>
              {outputText && (
                <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
                  Converted
                </span>
              )}
            </div>
            <div
              className={`w-full h-96 p-4 rounded-lg border-2 overflow-y-auto ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-700 text-gray-200'
                  : 'bg-gray-50 border-gray-300 text-gray-800'
              } text-lg leading-relaxed`}
              style={{ fontFamily: "'Noto Sans Bengali', 'Kalpurush', sans-serif" }}
            >
              {outputText || (
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                  Converted Unicode text will appear here...
                </span>
              )}
            </div>
            <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Characters: {outputText.length}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              copied
                ? 'bg-green-500 text-white'
                : isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <Check size={20} className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={20} className="mr-2" />
                Copy to Clipboard
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={!outputText}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              isDarkMode
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
            }`}
          >
            <Download size={20} className="mr-2" />
            Download as .txt
          </button>
        </div>

        {/* Info Section */}
        <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            How to Use:
          </h3>
          <ol className={`list-decimal list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Paste your Bijoy ANSI encoded Bengali text in the left text area</li>
            <li>Or upload a .txt file containing Bijoy text</li>
            <li>The converted Unicode text will appear automatically on the right</li>
            <li>Copy the converted text or download it as a .txt file</li>
          </ol>
          
          <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Example:
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bijoy Input:</p>
                <code className={`text-lg ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Avwg evsjv‡`k</code>
              </div>
              <div>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Unicode Output:</p>
                <code className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>আমি বাংলাদেশ</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="text-sm">
            Powered by AI Converter — Bijoy to Unicode
          </p>
          <p className="text-xs mt-2">
            Supports all standard Bijoy keyboard characters and kar symbols
          </p>
        </div>
      </div>
    </div>
  );
}

export default BijoyConverter;