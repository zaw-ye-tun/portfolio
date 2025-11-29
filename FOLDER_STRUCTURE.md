# 📁 FOLDER STRUCTURE GUIDE

## Visual Overview

```
f:\Lab arena\portfolio\
│
├─── 📄 ROOT CONFIGURATION FILES
│    ├── package.json              ← Dependencies & scripts
│    ├── next.config.js            ← Next.js settings
│    ├── tailwind.config.js        ← Tailwind + macOS theme
│    ├── postcss.config.js         ← CSS processor
│    ├── tsconfig.json             ← TypeScript config
│    ├── .gitignore                ← Git ignore rules
│    ├── .eslintrc.json            ← Code linting
│    └── next-env.d.ts             ← Type definitions
│
├─── 📱 APP/ (Next.js App Router)
│    ├── layout.tsx                ← Root layout wrapper
│    ├── page.tsx                  ← Main homepage (contains all windows)
│    └── globals.css               ← Global styles + Tailwind directives
│
├─── 🧩 COMPONENTS/ (React Components)
│    │
│    ├── 🖥️ Layout Components
│    │   ├── Desktop.tsx           ← Main container + wallpaper
│    │   ├── MenuBar.tsx           ← Top bar + clock + theme toggle
│    │   ├── Dock.tsx              ← Bottom dock (desktop)
│    │   └── MobileNav.tsx         ← Bottom nav (mobile)
│    │
│    ├── 🪟 Window System
│    │   └── Window.tsx            ← Draggable window component
│    │
│    ├── 🎨 UI Components
│    │   ├── Timeline.tsx          ← Interactive timeline
│    │   ├── StorySection.tsx      ← Story with scroll animations
│    │   ├── FunFactBubble.tsx     ← Fun fact bubbles
│    │   ├── ImageGallery.tsx      ← Photo gallery
│    │   └── PDFViewer.tsx         ← PDF viewer + download
│    │
│    └── 📂 windows/ (Window Content)
│        ├── ResumeWindow.tsx      ← Resume app content
│        ├── HobbiesWindow.tsx     ← Hobbies app content
│        ├── ProfessionalWindow.tsx← Professional app content
│        ├── TimelineWindow.tsx    ← Timeline app content
│        └── PersonalWindow.tsx    ← Personal app (Story + Fun Facts)
│
├─── 📚 LIB/ (Utilities)
│    └── contentLoader.ts          ← Markdown file loader functions
│
├─── 📝 CONTENT/ (Your Editable Content)
│    │
│    ├── 📄 resume/
│    │   └── resume.md             ← Resume info + PDF link
│    │
│    ├── 🎨 hobbies/
│    │   ├── hobby1.md             ← Hobby #1 (Photography sample)
│    │   └── hobby2.md             ← Hobby #2 (Hiking sample)
│    │
│    ├── 💼 professional/
│    │   ├── pro1.md               ← Professional #1 (Telecom sample)
│    │   └── pro2.md               ← Professional #2 (Research sample)
│    │
│    ├── ⏰ timeline/
│    │   ├── event1.md             ← Timeline event #1 (PhD sample)
│    │   └── event2.md             ← Timeline event #2 (Work sample)
│    │
│    ├── 👤 personal/
│    │   ├── story/
│    │   │   ├── story1.md         ← Story section #1
│    │   │   └── story2.md         ← Story section #2
│    │   └── funfacts/
│    │       ├── fun1.md           ← Fun fact #1 (Coffee)
│    │       ├── fun2.md           ← Fun fact #2 (Guitar)
│    │       ├── fun3.md           ← Fun fact #3 (Travel)
│    │       └── fun4.md           ← Fun fact #4 (Books)
│    │
│    └── settings.json             ← Site settings (title, description)
│
├─── 🌐 PUBLIC/ (Static Assets)
│    │
│    ├── 🎛️ admin/ (Decap CMS)
│    │   ├── config.yml            ← CMS configuration
│    │   └── index.html            ← CMS entry point
│    │
│    ├── 🎯 icons/                 ← Dock icons (add yours)
│    │   └── .gitkeep
│    │
│    ├── 📷 photos/                ← Uploaded photos (from CMS or manual)
│    │   └── .gitkeep
│    │
│    ├── 📄 resume/                ← Resume PDF file
│    │   └── .gitkeep
│    │
│    └── 🖼️ wallpapers/           ← Background images
│        ├── .gitkeep
│        └── README.md             ← Wallpaper instructions
│
└─── 📖 DOCUMENTATION/
     ├── README.md                 ← Complete documentation (READ THIS!)
     ├── SETUP.md                  ← Detailed setup instructions
     ├── QUICKSTART.md             ← 3-minute quick start
     ├── PROJECT_SUMMARY.md        ← Project overview & checklist
     └── FOLDER_STRUCTURE.md       ← This file
```

---

## 🎯 KEY FOLDERS EXPLAINED

### `/app` - Next.js App Router
**What it does**: Main application entry point
**You'll edit**: Rarely (only for major structural changes)
**Files**:
- `layout.tsx` - Root wrapper (metadata, html, body)
- `page.tsx` - Homepage with all window components
- `globals.css` - Global styles + Tailwind directives

---

### `/components` - React Components
**What it does**: All UI building blocks
**You'll edit**: Sometimes (for customization)
**Structure**:
- **Layout**: Desktop shell, menu bar, dock, mobile nav
- **Window**: Draggable window system
- **UI**: Reusable components (timeline, gallery, etc.)
- **windows/**: Content for each app window

---

### `/content` - Your Content (MOST IMPORTANT!)
**What it does**: All your portfolio content
**You'll edit**: FREQUENTLY (this is where you work!)
**Format**: Markdown files with frontmatter

**Example structure**:
```markdown
---
title: "My Hobby"
image: "/photos/my-photo.jpg"
description: "Description here"
order: 1
---

Optional body content here
```

---

### `/public` - Static Files
**What it does**: Publicly accessible files
**You'll edit**: Sometimes (when adding images/files)
**Folders**:
- `admin/` - CMS dashboard (don't edit)
- `icons/` - Add your dock icons here
- `photos/` - Add your photos here
- `resume/` - Add your resume.pdf here
- `wallpapers/` - Add light.jpg and dark.jpg here

---

### `/lib` - Utilities
**What it does**: Helper functions
**You'll edit**: Rarely (advanced users only)
**Files**:
- `contentLoader.ts` - Loads markdown files from `/content`

---

## 📝 CONTENT WORKFLOW

### Adding New Hobby

1. Create new file: `content/hobbies/hobby3.md`
2. Add frontmatter:
   ```markdown
   ---
   title: "Coding"
   image: "/photos/coding.jpg"
   description: "I love building web apps"
   order: 3
   ---
   ```
3. Save file
4. Refresh browser - it appears automatically!

### Adding Timeline Event

1. Create: `content/timeline/event3.md`
2. Add:
   ```markdown
   ---
   date: "2025"
   title: "New Achievement"
   description: "Description here"
   category: "achievement"
   order: 3
   ---
   ```
3. Save & refresh

### Updating Fun Facts

1. Edit: `content/personal/funfacts/fun1.md`
2. Change:
   ```markdown
   ---
   emoji: "🎮"
   text: "Gaming enthusiast"
   color: "purple"
   ---
   ```
3. Save & refresh

---

## 🎨 ASSET WORKFLOW

### Adding Photos

**Method 1: Direct Upload**
1. Add image to `public/photos/my-image.jpg`
2. Reference in markdown: `image: "/photos/my-image.jpg"`

**Method 2: Via CMS** (after deployment)
1. Go to `/admin`
2. Upload through CMS interface
3. CMS automatically saves to `public/photos/`

### Adding Resume

1. Save your PDF as `resume.pdf`
2. Place in `public/resume/resume.pdf`
3. Update `content/resume/resume.md`:
   ```markdown
   ---
   description: "My updated resume"
   pdfUrl: "/resume/resume.pdf"
   ---
   ```

### Adding Wallpapers

1. Find two images (1920x1080 recommended)
2. Save as:
   - `public/wallpapers/light.jpg`
   - `public/wallpapers/dark.jpg`
3. Restart dev server to see changes

---

## 🔍 FILE NAMING CONVENTIONS

### Markdown Files
- **Lowercase with numbers**: `hobby1.md`, `pro2.md`
- **Descriptive names OK**: `photography.md`, `telecom-research.md`
- **No spaces**: Use hyphens `-` instead

### Images
- **Lowercase**: `hobby-photography.jpg`
- **Hyphens not underscores**: `my-photo.jpg` not `my_photo.jpg`
- **Descriptive**: `story-intro.jpg` better than `img1.jpg`

### Components
- **PascalCase**: `MyComponent.tsx`
- **Descriptive**: `ImageGallery.tsx` not `Gallery.tsx`
- **tsx extension**: Always use `.tsx` for React components

---

## 🚀 DEPLOYMENT FILES

When deploying to Vercel, these files are important:

```
Essential for Deployment:
├── package.json         ← Dependencies
├── next.config.js       ← Build settings
├── tsconfig.json        ← TypeScript
└── All content files    ← Your portfolio content
```

Vercel auto-detects Next.js and handles the rest!

---

## 📊 SIZE REFERENCE

**Typical Sizes**:
- Wallpapers: 1920x1080px (1-2 MB)
- Photos: 800x600px to 1920x1080px (500 KB - 1 MB)
- Resume PDF: < 2 MB
- Icons: 512x512px (< 100 KB)

**Total Project** (with assets): ~10-50 MB

---

## 🎯 EDITING PRIORITY

**High Priority** (Edit Often):
- ✅ `/content/` - All your content
- ✅ `/public/photos/` - Your images
- ✅ `/public/resume/` - Your resume

**Medium Priority** (Edit Sometimes):
- ⚠️ `tailwind.config.js` - Colors/theme
- ⚠️ `components/` - UI customization

**Low Priority** (Rarely Edit):
- 🔒 `app/page.tsx` - Window setup
- 🔒 `lib/contentLoader.ts` - Data loading
- 🔒 Config files - Build settings

---

## ✅ QUICK REFERENCE

**To add content**: Edit files in `/content/`
**To add images**: Add to `/public/photos/`
**To change colors**: Edit `tailwind.config.js`
**To add features**: Edit `components/`
**To deploy**: Push to GitHub → Import to Vercel

---

## 🆘 LOST? START HERE:

1. **Want to update content?** → Go to `/content/`
2. **Want to add photos?** → Go to `/public/photos/`
3. **Want to change colors?** → Edit `tailwind.config.js`
4. **Want to add features?** → Check `components/`
5. **Want to deploy?** → Read `README.md` deployment section

---

**This folder structure is designed for easy content management while keeping code organized!**
