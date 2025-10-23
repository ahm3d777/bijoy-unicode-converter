# 🔧 Troubleshooting Guide

Common issues and their solutions for the Bijoy to Unicode Converter.

---

## 🚨 Installation Issues

### Issue: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

**Option 1: Use --legacy-peer-deps**
```bash
npm install --legacy-peer-deps
```

**Option 2: Clear cache and reinstall**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Option 3: Update npm**
```bash
npm install -g npm@latest
npm install
```

**Option 4: Use different package manager**
```bash
# Try yarn instead
npm install -g yarn
yarn install
```

---

### Issue: Node version too old

**Symptoms:**
```
error Unsupported Node.js version
```

**Solution:**
```bash
# Check your version
node --version

# If below v16, update Node.js:
# Visit https://nodejs.org and download latest LTS version
# Or use nvm:
nvm install --lts
nvm use --lts
```

---

### Issue: Permission denied (Mac/Linux)

**Symptoms:**
```
Error: EACCES: permission denied
```

**Solution:**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then try again:
npm install
```

---

## 🏃 Runtime Issues

### Issue: `npm run dev` won't start

**Symptoms:**
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
# Reinstall dependencies
npm install

# If still failing, install vite explicitly
npm install vite --save-dev

# Try again
npm run dev
```

---

### Issue: Port already in use

**Symptoms:**
```
Port 3000 is already in use
```

**Solutions:**

**Option 1: Let Vite choose another port**
Vite will automatically try 3001, 3002, etc.

**Option 2: Specify a different port**
```bash
npm run dev -- --port 3005
```

**Option 3: Kill the process using port 3000**

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows:**
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

### Issue: Blank white page

**Symptoms:**
- Page loads but shows nothing
- No errors in terminal

**Solutions:**

**Step 1: Check browser console**
```
1. Open browser (Chrome/Firefox)
2. Press F12 or Ctrl+Shift+I
3. Go to Console tab
4. Look for error messages
```

**Step 2: Common console errors:**

**Error: "Uncaught SyntaxError"**
```bash
# Clear dist and rebuild
rm -rf dist
npm run build
npm run dev
```

**Error: "Failed to fetch dynamically"**
```bash
# Clear browser cache
# Or open in incognito/private mode
```

**Step 3: Verify files exist**
```bash
# Check if all files are present
ls -la
# Should see: index.html, main.jsx, App.jsx, BijoyConverter.jsx, etc.
```

---

### Issue: Dark mode not working

**Symptoms:**
- Toggle button does nothing
- Theme doesn't change

**Solution:**
```javascript
// Check browser console for errors
// Try clearing localStorage:
localStorage.clear()
// Then refresh page
```

---

## 📝 Conversion Issues

### Issue: Text not converting

**Symptoms:**
- Input text appears but output is empty
- No conversion happening

**Solutions:**

**Check 1: Is it actually Bijoy text?**
Bijoy text looks like: `Avwg evsjv‡`k`
Unicode text looks like: `আমি বাংলাদেশ`

**Check 2: Try these test cases:**
```
Input: Avwg
Expected output: আমি

Input: evsjv
Expected output: বাংলা
```

**Check 3: Check browser console**
Look for JavaScript errors

---

### Issue: Incorrect conversion

**Symptoms:**
- Text converts but looks wrong
- Some characters missing

**Possible Causes:**

**1. Not Bijoy format**
- Make sure text is in Bijoy ANSI encoding
- Not all Bengali text is Bijoy

**2. Rare characters**
- Some very rare Bijoy characters may not be mapped
- Report these for future updates

**3. Encoding issues**
- File might be in wrong encoding
- Try re-saving file as ANSI encoding

---

## 📁 File Handling Issues

### Issue: Can't upload file

**Symptoms:**
- Click upload but nothing happens
- Error message appears

**Solutions:**

**Check 1: File type**
- Only `.txt` files are supported
- Not `.doc`, `.docx`, or `.pdf`

**Check 2: File size**
- Very large files (>50MB) may cause issues
- Try with smaller file first

**Check 3: Browser permissions**
- Browser might be blocking file access
- Try different browser

---

### Issue: Download not working

**Symptoms:**
- Click download but no file appears
- Download starts but file is empty

**Solutions:**

**Solution 1: Check download folder**
- File might be downloading to unexpected location
- Check browser's download settings

**Solution 2: Browser blocking**
- Browser might be blocking download
- Check for popup blocker
- Allow downloads from this site

**Solution 3: Try different browser**
```
Chrome, Firefox, or Edge usually work best
```

---

## 📋 Copy/Paste Issues

### Issue: Copy to clipboard fails

**Symptoms:**
- Click copy but nothing copied
- Error message appears

**Solutions:**

**Solution 1: Browser permissions**
```
1. Check if browser allows clipboard access
2. Try in HTTPS context (localhost is OK)
3. Some browsers block clipboard in HTTP
```

**Solution 2: Manual copy**
```
1. Select all text in output area
2. Right-click → Copy
3. Or use Ctrl+C (Cmd+C on Mac)
```

**Solution 3: Browser compatibility**
```
Modern browsers (Chrome 66+, Firefox 63+, Safari 13+)
Update browser if too old
```

---

## 🎨 UI/Display Issues

### Issue: Text overlapping

**Symptoms:**
- Text areas overlap
- Buttons misaligned

**Solutions:**

**Solution 1: Zoom level**
```
Browser zoom should be 100%
Press Ctrl+0 (Cmd+0 on Mac) to reset
```

**Solution 2: Clear cache**
```
Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
Or clear browser cache
```

**Solution 3: Update browser**
```
Ensure using modern browser
Chrome, Firefox, or Safari (latest versions)
```

---

### Issue: Bengali text not displaying properly

**Symptoms:**
- Boxes instead of Bengali characters
- Garbled text

**Solutions:**

**Solution 1: Font issue**
```
1. Browser should load Noto Sans Bengali from Google Fonts
2. Check internet connection
3. Try offline Bengali font
```

**Solution 2: System fonts**
```
Install Bengali Unicode font on your system:
- Windows: Download from Google Fonts
- Mac: Usually included
- Linux: apt-get install fonts-bengali
```

**Solution 3: Browser settings**
```
Ensure browser language support is enabled
Clear font cache
Restart browser
```

---

## 🌐 Deployment Issues

### Issue: Build fails

**Symptoms:**
```
npm run build
ERROR: Build failed
```

**Solutions:**

**Solution 1: Clean build**
```bash
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

**Solution 2: Check disk space**
```bash
# Ensure enough disk space
df -h  # Linux/Mac
# Need at least 500MB free
```

**Solution 3: Memory issues**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

### Issue: Deployed site shows 404

**Symptoms:**
- Site deployed but shows "Not Found"
- Only index works, refresh gives 404

**Solutions:**

**For Netlify:**
Create `_redirects` file in `public/` folder:
```
/*    /index.html   200
```

**For Vercel:**
Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**For GitHub Pages:**
Add this to `vite.config.js`:
```javascript
base: '/your-repo-name/'
```

---

## 🔐 Browser-Specific Issues

### Chrome

**Issue: "Site can't be reached"**
```bash
# Check if dev server is running
# Should see: "Local: http://localhost:3000"
```

**Issue: Extensions interfering**
```
Try in incognito mode
If works, disable extensions one by one
```

---

### Firefox

**Issue: Mixed content warning**
```
Make sure you're on localhost or HTTPS
HTTP won't work for clipboard API
```

---

### Safari

**Issue: Clipboard not working**
```
Safari requires HTTPS for clipboard
Or use localhost (which is OK)
```

---

## 📱 Mobile Issues

### Issue: App not responsive on mobile

**Symptoms:**
- Text too small
- Buttons hard to tap
- Layout broken

**Solutions:**

**Solution 1: Meta viewport**
Check `index.html` has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Solution 2: Clear mobile cache**
```
Settings → Safari/Chrome → Clear History and Data
```

**Solution 3: Try landscape mode**
```
Rotate device to landscape
Better view for text areas
```

---

## 🐛 Debugging Tips

### Enable verbose logging

Add to `BijoyConverter.jsx`:
```javascript
const handleInputChange = (e) => {
  const text = e.target.value;
  console.log('Input:', text);
  setInputText(text);
  
  if (text.trim()) {
    const converted = convertBijoyToUnicode(text);
    console.log('Output:', converted);
    setOutputText(converted);
  }
};
```

---

### Check React DevTools

1. Install React DevTools extension
2. Open DevTools (F12)
3. Go to "Components" tab
4. Inspect BijoyConverter state

---

### Network issues

Check browser Network tab:
```
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check for failed requests (red)
```

---

## 📊 Performance Issues

### Issue: App is slow

**Symptoms:**
- Typing has lag
- Conversion takes time

**Solutions:**

**Solution 1: Large text**
```
Break into smaller chunks
Conversion is instant for normal text
Very large text (>100,000 chars) may slow down
```

**Solution 2: Browser resources**
```
Close other tabs
Browser using too much memory
Restart browser
```

**Solution 3: Clear cache**
```bash
# In project directory
rm -rf dist .vite
npm run dev
```

---

## 🔄 Reset Everything

If all else fails, complete reset:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Remove everything
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm package-lock.json

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall
npm install

# 5. Try again
npm run dev
```

---

## 📞 Still Having Issues?

### Before asking for help:

1. ✅ Read this troubleshooting guide
2. ✅ Check README.md
3. ✅ Try solutions above
4. ✅ Clear cache and restart
5. ✅ Test in different browser

### When asking for help, provide:

1. **Your environment:**
   - OS: Windows/Mac/Linux
   - Node version: `node --version`
   - npm version: `npm --version`
   - Browser: Chrome/Firefox/Safari + version

2. **The problem:**
   - What you're trying to do
   - What's happening instead
   - Error messages (exact text)
   - Screenshots if relevant

3. **What you tried:**
   - Solutions from this guide
   - Any changes you made

### Where to get help:

- 📖 Check documentation first
- 💬 Open GitHub issue
- 🔍 Search existing issues
- 📧 Contact maintainer

---

## ✅ Common Fixes Checklist

Try these in order:

- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Try different browser
- [ ] Check Node.js version (16+)
- [ ] Reinstall dependencies
- [ ] Check browser console for errors
- [ ] Verify all files exist
- [ ] Update browser
- [ ] Restart computer
- [ ] Complete reset (see above)

---

## 🎓 Prevention Tips

**To avoid issues:**

1. ✅ Use Node.js 16+ (LTS version)
2. ✅ Keep npm updated
3. ✅ Use modern browser
4. ✅ Don't modify core files unless needed
5. ✅ Read documentation before starting
6. ✅ Test with sample file first
7. ✅ Keep dependencies updated
8. ✅ Regular `npm install` if pulling updates

---

## 📈 Optimization Tips

**For better performance:**

1. Close unnecessary tabs
2. Use production build for deployment
3. Enable browser caching
4. Use CDN for fonts (automatic)
5. Minimize browser extensions

---

**Remember: Most issues are solved by:**
1. Clearing cache
2. Reinstalling dependencies
3. Using updated software

**Good luck! 🚀**
