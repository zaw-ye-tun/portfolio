# 🚀 SETUP INSTRUCTIONS

Follow these steps to get your macOS portfolio running:

## 1️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS
- Decap CMS
- react-draggable
- gray-matter
- markdown-it

## 2️⃣ Add Required Assets

### Wallpapers (Required)
Add two wallpaper images to `/public/wallpapers/`:
- `light.jpg` - For light mode (recommended: 1920x1080px)
- `dark.jpg` - For dark mode (recommended: 1920x1080px)

**Tip**: You can use macOS Big Sur wallpapers or any abstract/gradient images.

### Resume PDF
Add your resume to `/public/resume/`:
- `resume.pdf` - Your actual resume file

### Sample Photos (Optional)
Add sample images to `/public/photos/` for testing:
- `hobby-photography.jpg`
- `hobby-hiking.jpg`
- `pro-telecom.jpg`
- `pro-research.jpg`
- `story-intro.jpg`
- `story-personal.jpg`

You can use placeholder images from:
- https://unsplash.com (free high-quality images)
- https://picsum.photos (random placeholder images)
- https://placeholder.com

## 3️⃣ Run Development Server

```bash
npm run dev
```

Your site will be available at: http://localhost:3000

## 4️⃣ Test the Site

1. Open http://localhost:3000 in your browser
2. Click on dock icons to open windows
3. Test dragging windows (desktop)
4. Toggle light/dark mode
5. Resize browser to test mobile view

## 5️⃣ Customize Content

### Option A: Edit Markdown Files Directly
Navigate to `/content/` and edit:
- `/content/resume/resume.md`
- `/content/hobbies/*.md`
- `/content/professional/*.md`
- `/content/timeline/*.md`
- `/content/personal/story/*.md`
- `/content/personal/funfacts/*.md`
- `/content/settings.json`

### Option B: Use CMS (After Deployment)
1. Deploy to Netlify (recommended for CMS)
2. Enable Netlify Identity
3. Access CMS at `your-site.com/admin`

## 6️⃣ Build for Production

```bash
npm run build
npm start
```

Test the production build locally before deploying.

## 7️⃣ Deploy to Vercel

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Deploy (Vercel auto-detects Next.js)

## 📝 Quick Tips

- **Wallpapers**: Use 16:9 ratio images for best results
- **Icons**: Dock icons auto-generate from first letter (customize in Dock.tsx)
- **Mobile**: Test on actual mobile devices for best UX
- **Theme**: Default theme is set by system preference

## ❓ Need Help?

Check the main [README.md](README.md) for:
- Detailed feature documentation
- Troubleshooting guide
- Customization instructions
- Project structure overview

## 🎉 You're Ready!

Your macOS portfolio is now set up and ready to customize!
