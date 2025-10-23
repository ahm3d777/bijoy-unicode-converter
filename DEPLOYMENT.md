# 🚀 Deployment Guide

Complete guide to deploy your Bijoy to Unicode converter to various platforms.

## 📦 Build First

Before deploying to any platform, build the production version:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder (~300KB).

---

## 1. 🟦 Netlify (Recommended - Easiest)

### Method A: Drag & Drop (No Account Needed)

1. Build the project: `npm run build`
2. Open https://app.netlify.com/drop
3. Drag the entire `dist` folder onto the page
4. Done! You get an instant live URL like `https://random-name.netlify.app`

### Method B: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Login to Netlify (opens browser)
netlify login

# Deploy
netlify deploy --prod --dir=dist

# Follow the prompts:
# - Create new site or select existing
# - Choose a site name (optional)
```

### Method C: Continuous Deployment (GitHub)

1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub account
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

**Custom Domain:**
- Go to Site settings → Domain management
- Add custom domain

---

## 2. ▲ Vercel

### Method A: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (run from project root)
vercel

# For production deployment
vercel --prod

# Follow prompts to:
# - Set up project
# - Choose name
# - Configure settings
```

### Method B: GitHub Integration

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

**Environment:**
- Framework Preset: Vite
- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)

---

## 3. 📄 GitHub Pages

### Setup

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Update vite.config.js

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/bijoy-unicode-converter/', // Replace with your repo name
  // ... rest of config
});
```

### Deploy

```bash
npm run deploy
```

Your site will be live at:
`https://yourusername.github.io/bijoy-unicode-converter/`

**Note:** May take 5-10 minutes for first deployment.

---

## 4. 🔥 Firebase Hosting

### Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase in your project
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds with GitHub: No (unless you want)
```

### Deploy

```bash
# Build first
npm run build

# Deploy
firebase deploy --only hosting
```

---

## 5. 🌊 Surge

Simple static hosting:

```bash
# Install Surge
npm install -g surge

# Build
npm run build

# Deploy
cd dist
surge

# Or specify domain:
surge --domain bijoy-converter.surge.sh
```

---

## 6. 🟩 Render

### Static Site Deployment

1. Push code to GitHub
2. Go to https://render.com
3. Click "New Static Site"
4. Connect your repository
5. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Click "Create Static Site"

---

## 7. ☁️ Cloudflare Pages

### Via Dashboard

1. Push code to GitHub
2. Go to https://dash.cloudflare.com
3. Pages → Create a project
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy

### Via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
npm run build
wrangler pages publish dist
```

---

## 8. 📱 Self-Hosted (Apache/Nginx)

### Apache

1. Build: `npm run build`
2. Upload `dist/*` to your web server
3. Create `.htaccess` in the root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔧 Platform Comparison

| Platform | Difficulty | Free Tier | Custom Domain | Build Time | Best For |
|----------|-----------|-----------|---------------|------------|----------|
| Netlify | ⭐ Easy | 100GB/month | Yes | 1-2 min | Beginners |
| Vercel | ⭐ Easy | Unlimited | Yes | 1-2 min | React apps |
| GitHub Pages | ⭐⭐ Medium | Unlimited | Yes | 2-5 min | Open source |
| Firebase | ⭐⭐ Medium | 10GB/month | Yes | 2-3 min | Google users |
| Surge | ⭐ Easy | Unlimited | Custom only | 30 sec | Quick tests |
| Render | ⭐⭐ Medium | 100GB/month | Yes | 2-3 min | Full-stack |
| Cloudflare | ⭐⭐ Medium | Unlimited | Yes | 1-2 min | Performance |

---

## 🎯 Recommended Flow

**For Quick Testing:**
1. Netlify Drop (no account needed)

**For Personal Projects:**
1. Netlify or Vercel (both excellent)

**For Professional Projects:**
1. Vercel (if using GitHub)
2. Cloudflare Pages (best performance)

**For Learning:**
1. GitHub Pages (free, good practice)

---

## 🔍 Post-Deployment Checklist

- [ ] Test the converter with Bijoy text
- [ ] Try file upload feature
- [ ] Test copy and download buttons
- [ ] Check dark mode toggle
- [ ] Test on mobile device
- [ ] Verify all links work
- [ ] Check browser console for errors
- [ ] Test with various Bijoy character combinations

---

## 🐛 Common Deployment Issues

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### 404 on Refresh
- Make sure your platform is configured for Single Page Apps
- Check routing configuration

### Assets Not Loading
- Verify `base` path in `vite.config.js`
- Check if files are in the correct directory

### Blank Page
- Check browser console for errors
- Verify all files are uploaded
- Check if JavaScript is enabled

---

## 📊 Performance Optimization

After deployment, check:
- Lighthouse score (should be 90+)
- Page load time (should be < 2s)
- Bundle size (should be < 500KB)

---

## 🔐 Security Notes

- No environment variables needed (all client-side)
- No API keys to protect
- No backend to secure
- HTTPS automatically provided by most platforms

---

## 📈 Analytics (Optional)

Add Google Analytics or other analytics by adding to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

---

Need help? Check the platform's documentation or open an issue!

Happy Deploying! 🚀
