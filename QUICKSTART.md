# 🚀 QUICK START GUIDE

## Prerequisites Check

Before you begin, make sure you have:
- ✅ Node.js 18.x or higher installed
- ✅ npm or yarn package manager
- ✅ A code editor (VS Code recommended)
- ✅ Git installed (for deployment)

---

## ⚡ 3-Minute Setup

### Step 1: Install Dependencies (1 min)

Open terminal in the project folder and run:

```bash
npm install
```

This installs all required packages. You'll see progress bars.

### Step 2: Add Placeholder Assets (1 min)

**Option A: Use Temporary Solid Colors**

The site will work with CSS backgrounds if you don't have wallpapers yet.

**Option B: Download Sample Wallpapers**

Quick links for free wallpapers:
- Light: https://unsplash.com/photos/pastel-gradient (search "pastel gradient")
- Dark: https://unsplash.com/photos/dark-gradient (search "dark abstract")

Save as:
- `public/wallpapers/light.jpg`
- `public/wallpapers/dark.jpg`

**Resume PDF:**
Create a dummy PDF or add yours to:
- `public/resume/resume.pdf`

### Step 3: Start Development Server (30 seconds)

```bash
npm run dev
```

Wait for "Ready" message, then open:
- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP:3000 (for mobile testing)

---

## 🎯 First Look Checklist

Once the server is running:

1. ✅ Page loads without errors
2. ✅ Menu bar shows at top with clock
3. ✅ Dock shows at bottom (desktop) or nav bar (mobile)
4. ✅ Click "Resume" icon
5. ✅ Window opens with glassmorphic effect
6. ✅ Try dragging window (desktop only)
7. ✅ Click theme toggle (sun/moon icon)
8. ✅ Background changes light/dark
9. ✅ Test other dock icons

---

## 🎨 Quick Customization (5 minutes)

### Change Site Title

Edit `content/settings.json`:
```json
{
  "siteTitle": "Your Name - Portfolio",
  "siteDescription": "Your custom description",
  "authorName": "Your Name"
}
```

### Update Resume Info

Edit `content/resume/resume.md`:
```markdown
---
description: "Download my resume"
pdfUrl: "/resume/resume.pdf"
---
```

### Add Your First Hobby

Edit `content/hobbies/hobby1.md`:
```markdown
---
title: "Your Hobby"
image: "/photos/your-image.jpg"
description: "Your description here"
order: 1
---
```

### Update Fun Facts

Edit `content/personal/funfacts/fun1.md`:
```markdown
---
emoji: "☕"
text: "Your fun fact here"
color: "blue"
---
```

---

## 📱 Mobile Testing

### View on Your Phone

1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` (look for inet)

2. Make sure phone and computer are on same WiFi

3. On phone browser, visit:
   ```
   http://YOUR_COMPUTER_IP:3000
   ```

4. Test:
   - Bottom navigation works
   - Windows open full-screen
   - Tabs work in Personal section
   - Theme toggle works

---

## 🏗️ Project Structure at a Glance

```
📁 portfolio/
├── 📱 app/              → Next.js pages
├── 🧩 components/       → React components
├── 📝 content/          → Your editable content (EDIT THIS!)
├── 🌐 public/           → Static files (images, PDFs)
└── 📚 lib/              → Helper functions
```

**Content is King**: Everything in `/content` is what you'll edit most!

---

## 🛠️ Common Issues & Solutions

### Issue: npm install fails
**Solution**: 
```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Issue: Module not found errors
**Solution**:
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Dark mode doesn't work
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Clear localStorage in DevTools
- Hard refresh (Ctrl+Shift+R)

---

## ✅ Success Indicators

You'll know everything is working when:

- ✅ No red errors in terminal
- ✅ No errors in browser console (F12)
- ✅ Clock updates every second
- ✅ Theme toggle works
- ✅ All 5 windows open correctly
- ✅ Content from markdown files displays

---

## 📚 What to Read Next

After getting it running:

1. **SETUP.md** - Detailed setup with asset preparation
2. **README.md** - Complete feature documentation
3. **PROJECT_SUMMARY.md** - Full file structure overview

---

## 🎓 Learning Path

### Day 1: Get It Running
- ✅ Install dependencies
- ✅ Add basic assets
- ✅ Run dev server
- ✅ Test all features

### Day 2: Customize Content
- ✅ Update all markdown files
- ✅ Add your real photos
- ✅ Update resume PDF
- ✅ Write your story

### Day 3: Polish & Deploy
- ✅ Test on mobile devices
- ✅ Check all images load
- ✅ Build production version
- ✅ Deploy to Vercel

---

## 🎯 Your First Hour Goals

- [ ] Run `npm install` successfully
- [ ] Add wallpaper images (or skip for now)
- [ ] Run `npm run dev`
- [ ] See the site load at localhost:3000
- [ ] Click each dock icon
- [ ] Toggle dark mode
- [ ] Edit one markdown file and see changes

---

## 💡 Pro Tips

1. **Keep Dev Server Running**: Edit files and see instant updates
2. **Browser DevTools**: Press F12 to debug issues
3. **VSCode Extensions**: Install ESLint and Tailwind CSS IntelliSense
4. **Git Commits**: Commit after each major change
5. **Test Often**: Check mobile view frequently

---

## 🚀 Ready to Start?

Open your terminal and run:

```bash
npm install && npm run dev
```

Then visit: http://localhost:3000

**That's it! You're up and running!** 🎉

---

## 🆘 Need Help?

1. Check `README.md` Troubleshooting section
2. Look at browser console for errors (F12)
3. Check terminal for build errors
4. Make sure all required files exist
5. Try deleting `.next` folder and restarting

---

**Happy Coding! 🚀**
