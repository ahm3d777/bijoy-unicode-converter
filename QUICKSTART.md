# 🚀 Quick Start Guide

Get the Bijoy to Unicode converter running in 3 minutes!

## Prerequisites
Make sure you have Node.js installed (version 16 or higher).
Check with: `node --version`

## Installation Steps

### 1. Download/Clone the Project
```bash
# If you have git installed:
git clone <repository-url>
cd bijoy-unicode-converter

# Or simply extract the downloaded ZIP file and navigate to it
```

### 2. Install Dependencies
```bash
npm install
```
This will download all required packages (~200MB). Takes 1-2 minutes.

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Open in Browser
Your browser should automatically open to: `http://localhost:3000`

If not, manually open the URL shown in your terminal.

## That's It! 🎉

You should now see the Bijoy to Unicode converter running.

## First Time Using?

1. **Paste some Bijoy text** in the left text area
   - Example: `Avwg evsjv‡`k` 
   
2. **See instant conversion** in the right area
   - Output: `আমি বাংলাদেশ`

3. **Try the features:**
   - Upload a `.txt` file
   - Copy the result
   - Download as a file
   - Toggle dark mode

## Common Issues

### Port 3000 already in use?
The app will automatically try port 3001, 3002, etc.
Or manually specify: `npm run dev -- --port 3005`

### Module not found errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Slow installation?
Try using a different npm registry or check your internet connection.

## Build for Production

When you're ready to deploy:
```bash
npm run build
```
This creates an optimized build in the `dist/` folder.

## Deploy

### Netlify (Easiest)
1. Run `npm run build`
2. Drag the `dist` folder to https://app.netlify.com/drop
3. Done! You get a live URL instantly

### Vercel
1. Install: `npm install -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### GitHub Pages
1. Install: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Run: `npm run deploy`

## Need Help?

- Check the full README.md for detailed documentation
- Make sure all files are in the correct location
- Verify Node.js version: `node --version` (should be 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

## File Structure Check

Make sure you have these files:
```
├── index.html
├── main.jsx
├── App.jsx
├── BijoyConverter.jsx
├── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

Happy Converting! 🎉
