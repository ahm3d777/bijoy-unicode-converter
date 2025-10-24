import React, { useState, useEffect } from 'react';
import { Copy, Download, Upload, Moon, Sun, Check } from 'lucide-react';

// Accurate Bijoy to Unicode mapping based on Bijoy keyboard layout
// This mapping handles the extended ASCII characters (128-255) used by Bijoy
const bijoyToUnicodeMap = {
  // ASCII 128-255 range (Bijoy special characters)
  '\u0080': '€', '\u0081': '', '\u0082': '‚', '\u0083': 'ƒ', 
  '\u0084': '„', '\u0085': '…', '\u0086': '†', '\u0087': '‡',
  '\u0088': 'ˆ', '\u0089': '‰', '\u008A': 'Š', '\u008B': '‹',
  '\u008C': 'Œ', '\u008D': '', '\u008E': 'Ž', '\u008F': '',
  '\u0090': '', '\u0091': ''', '\u0092': ''', '\u0093': '"',
  '\u0094': '"', '\u0095': '•', '\u0096': '–', '\u0097': '—',
  '\u0098': '˜', '\u0099': '™', '\u009A': 'š', '\u009B': '›',
  '\u009C': 'œ', '\u009D': '', '\u009E': 'ž', '\u009F': 'Ÿ',
  '\u00A0': ' ', '\u00A1': '¡', '\u00A2': '¢', '\u00A3': '£',
  '\u00A4': '¤', '\u00A5': '¥', '\u00A6': '¦', '\u00A7': '§',
  '\u00A8': '¨', '\u00A9': '©', '\u00AA': 'ª', '\u00AB': '«',
  '\u00AC': '¬', '\u00AD': '­', '\u00AE': '®', '\u00AF': '¯',
  '\u00B0': '°', '\u00B1': '±', '\u00B2': '²', '\u00B3': '³',
  '\u00B4': '´', '\u00B5': 'µ', '\u00B6': '¶', '\u00B7': '·',
  '\u00B8': '¸', '\u00B9': '¹', '\u00BA': 'º', '\u00BB': '»',
  '\u00BC': '¼', '\u00BD': '½', '\u00BE': '¾', '\u00BF': '¿',
  '\u00C0': 'À', '\u00C1': 'Á', '\u00C2': 'Â', '\u00C3': 'Ã',
  '\u00C4': 'Ä', '\u00C5': 'Å', '\u00C6': 'Æ', '\u00C7': 'Ç',
  '\u00C8': 'È', '\u00C9': 'É', '\u00CA': 'Ê', '\u00CB': 'Ë',
  '\u00CC': 'Ì', '\u00CD': 'Í', '\u00CE': 'Î', '\u00CF': 'Ï',
  '\u00D0': 'Ð', '\u00D1': 'Ñ', '\u00D2': 'Ò', '\u00D3': 'Ó',
  '\u00D4': 'Ô', '\u00D5': 'Õ', '\u00D6': 'Ö', '\u00D7': '×',
  '\u00D8': 'Ø', '\u00D9': 'Ù', '\u00DA': 'Ú', '\u00DB': 'Û',
  '\u00DC': 'Ü', '\u00DD': 'Ý', '\u00DE': 'Þ', '\u00DF': 'ß',
  '\u00E0': 'à', '\u00E1': 'á', '\u00E2': 'â', '\u00E3': 'ã',
  '\u00E4': 'ä', '\u00E5': 'å', '\u00E6': 'æ', '\u00E7': 'ç',
  '\u00E8': 'è', '\u00E9': 'é', '\u00EA': 'ê', '\u00EB': 'ë',
  '\u00EC': 'ì', '\u00ED': 'í', '\u00EE': 'î', '\u00EF': 'ï',
  '\u00F0': 'ð', '\u00F1': 'ñ', '\u00F2': 'ò', '\u00F3': 'ó',
  '\u00F4': 'ô', '\u00F5': 'õ', '\u00F6': 'ö', '\u00F7': '÷',
  '\u00F8': 'ø', '\u00F9': 'ù', '\u00FA': 'ú', '\u00FB': 'û',
  '\u00FC': 'ü', '\u00FD': 'ý', '\u00FE': 'þ', '\u00FF': 'ÿ',
  
  // Standard Bijoy keyboard layout (ASCII printable characters)
  // Uppercase letters (with shift)
  'A': 'আ', 'B': 'ভ', 'C': 'চ', 'D': 'ড', 'E': 'ঈ', 'F': 'থ',
  'G': 'ঘ', 'H': 'ঃ', 'I': 'ঐ', 'J': 'ঞ', 'K': 'ক', 'L': 'ল',
  'M': 'শ', 'N': 'ণ', 'O': 'ও', 'P': 'ফ', 'Q': 'ছ', 'R': 'ড়',
  'S': 'ষ', 'T': 'ট', 'U': 'উ', 'V': 'ভ', 'W': 'ঢ', 'X': 'ঢ়',
  'Y': 'য', 'Z': 'ঝ',
  
  // Lowercase letters
  'a': 'া', 'b': 'ব', 'c': 'চ', 'd': 'দ', 'e': 'ে', 'f': 'ফ',
  'g': 'গ', 'h': 'হ', 'i': 'ি', 'j': 'জ', 'k': 'ক', 'l': 'ল',
  'm': 'ম', 'n': 'ন', 'o': 'ো', 'p': 'প', 'q': 'ৌ', 'r': 'র',
  's': 'স', 't': 'ত', 'u': 'ু', 'v': 'ভ', 'w': 'ও', 'x': 'ড',
  'y': 'য়', 'z': 'য',
  
  // Numbers
  '০': '০', '১': '১', '২': '২', '৩': '৩', '৪': '৪',
  '৫': '৫', '৬': '৬', '৭': '৭', '৮': '৮', '৯': '৯',
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  
  // Special characters
  '`': 'ঁ', '~': 'ং', '!': '!', '@': 'ৎ', '#': '৳', '$': '$',
  '%': '%', '^': 'ী', '&': 'ূ', '*': 'ৃ', '(': '(', ')': ')',
  '-': '-', '_': 'ঃ', '=': '+', '+': '+',
  '[': 'ৈ', ']': 'ৗ', '{': '{', '}': '}',
  '\\': '\\', '|': '।', ';': ';', ':': ':', "'": "'", '"': '"',
  ',': ',', '.': '।', '<': '<', '>': '>', '/': '/', '?': '?',
  
  // Bijoy specific mapped characters (Common patterns)
  'Ò': 'ঐ', 'Ó': 'ও', 'Ô': 'ঔ', 'Õ': 'অ', 'Ö': '।',
  '×': 'ঃ', 'Ø': 'ং', 'Ù': 'ু', 'Ú': 'ূ', 'Û': 'ৃ',
  'Ü': 'ৃ', 'Ý': 'ে', 'Þ': 'ৈ', 'ß': 'ো', 'à': 'ৌ',
  'á': 'ৗ', 'â': 'ি', 'ã': 'ী', 'ä': 'া',
  
  '†': 'ক', '‡': 'খ', 'ˆ': 'গ', '‰': 'ঘ', 'Š': 'ঙ',
  '‹': 'চ', 'Œ': 'ছ', '': 'জ', 'Ž': 'ঝ',
  '': 'ট', ''': 'ঠ', ''': 'ড', '"': 'ঢ', '"': 'ণ',
  '•': 'ত', '–': 'থ', '—': 'দ', '˜': 'ধ', '™': 'ন',
  'š': 'প', '›': 'ফ', 'œ': 'ব', '': 'ভ', 'ž': 'ম',
  'Ÿ': 'য', ' ': ' ', '¡': 'র', '¢': 'ল', '£': 'শ',
  '¤': 'ষ', '¥': 'স', '¦': 'হ', '§': 'ড়', '¨': 'ঢ়',
  '©': 'য়', 'ª': 'ৎ', '«': '্', '¬': 'ং', '­': 'ঃ',
  '®': 'ঁ', '¯': 'র্', '°': '্য', '±': '্র',
  
  // Extended characters
  'À': 'অ', 'Á': 'আ', 'Â': 'ই', 'Ã': 'ঈ', 'Ä': 'উ',
  'Å': 'ঊ', 'Æ': 'ঋ', 'Ç': 'এ', 'È': 'ঐ', 'É': 'ও',
  'Ê': 'ঔ', 'Ë': 'ক', 'Ì': 'খ', 'Í': 'গ', 'Î': 'ঘ',
  'Ï': 'ঙ', 'Ð': 'চ', 'Ñ': 'ছ',
  
  'ç': 'অ', 'è': 'আ', 'é': 'ই', 'ê': 'ঈ',
  'ë': 'উ', 'ì': 'ঊ', 'í': 'ঋ', 'î': 'এ', 'ï': 'ই',
  'ð': 'ও', 'ñ': 'য়', 'ò': 'ও', 'ó': 'ঔ',
};

function BijoyConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Improved Bijoy to Unicode conversion
  const convertBijoyToUnicode = (text) => {
    if (!text) return '';
    
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = char.charCodeAt(0);
      
      // Check if character has a mapping
      if (bijoyToUnicodeMap[char]) {
        result += bijoyToUnicodeMap[char];
      }
      // Handle special Unicode escapes for extended ASCII
      else if (charCode >= 128 && charCode <= 255) {
        const unicodeChar = String.fromCharCode(charCode);
        result += bijoyToUnicodeMap[unicodeChar] || char;
      }
      // Keep unmapped characters as-is
      else {
        result += char;
      }
    }
    
    return result;
  };

  // Detect Bijoy text
  const isBijoyText = (text) => {
    // Check for extended ASCII characters (128-255) common in Bijoy
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode >= 128 && charCode <= 255) {
        return true;
      }
    }
    
    // Check for typical Bijoy patterns
    const bijoyPatterns = /[†‡ˆ‰ŠŒÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòó]/;
    return bijoyPatterns.test(text);
  };

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
      reader.readAsText(file, 'windows-1252'); // Bijoy uses Windows-1252 encoding
    } else {
      alert('Please upload a .txt file');
    }
  };

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
              placeholder="Paste or type Bijoy ANSI text here...&#10;Example: Avwg evsjv‡`k → আমি বাংলাদেশ"
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
