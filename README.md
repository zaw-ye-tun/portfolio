# 🍎 macOS-Style Portfolio Website

A fully responsive, interactive portfolio website that replicates a macOS Big Sur desktop experience. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Decap CMS (Netlify CMS)** for content management.

## ✨ Features

### 🎨 macOS Desktop UI
- **Glassmorphic Windows**: Draggable windows with authentic macOS traffic light controls
- **Interactive Dock**: Icon magnification on hover (desktop)
- **Menu Bar**: Live clock and light/dark theme toggle
- **Light/Dark Mode**: Smooth transitions with theme-specific wallpapers
- **Fully Responsive**: Desktop dock transforms into mobile bottom navigation

### 📱 Responsive Design
- **Desktop**: Full macOS experience with draggable windows
- **Mobile**: Bottom navigation bar with full-screen modal windows
- **Adaptive UI**: Windows automatically adjust to screen size

### 🖥️ Five Main Sections

1. **Resume.app** - PDF viewer with download button
2. **Hobbies.app** - Photo gallery with descriptions
3. **Professional.app** - Professional life showcase (telecom/research)
4. **Timeline.app** - Interactive vertical timeline with categories
5. **About Me.app** - Two-tab layout (Story + Fun Facts)

### 🎯 Content Management
- **Decap CMS Integration**: Edit all content without coding
- **Markdown Support**: Rich text editing for stories
- **Image Upload**: Upload and manage photos directly
- **Organized Collections**: 
  - Resume
  - Hobbies
  - Professional Life
  - Timeline
  - Personal Story
  - Personal Fun Facts
  - Site Settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone or download this project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add placeholder images** (optional for initial testing)
   
   Add the following images to test the site:
   - `/public/wallpapers/light.jpg` - Light mode background
   - `/public/wallpapers/dark.jpg` - Dark mode background
   - `/public/resume/resume.pdf` - Your resume PDF
   - `/public/photos/` - Sample hobby/professional images

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Local Development (Without CMS)

Edit content directly in the `/content` folder:

```
/content
  /resume
    resume.md
  /hobbies
    hobby1.md
    hobby2.md
  /professional
    pro1.md
    pro2.md
  /timeline
    event1.md
    event2.md
  /personal
    /story
      story1.md
      story2.md
    /funfacts
      fun1.md
      fun2.md
  settings.json
```

### Using Decap CMS (Recommended for Production)

1. **Set up Git-based authentication** (required for Decap CMS)
   
   Decap CMS requires either:
   - **GitHub Backend** (recommended)
   - **GitLab Backend**
   - **Bitbucket Backend**

2. **Configure Git Gateway** (for Netlify deployment)
   
   The CMS is already configured at `/public/admin/config.yml`

3. **Access the CMS Dashboard**
   
   After deployment, visit: `https://your-site.com/admin`

4. **Edit Content**
   - Create, edit, and delete content through the clean dashboard
   - Upload images directly
   - Reorder items using the "Order" field
   - Changes are saved as commits to your repository

## 🌐 Deployment on Vercel

### Step 1: Prepare for Deployment

1. **Initialize Git repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository
   - Don't initialize with README (we already have files)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to [Vercel](https://vercel.com)**
   - Sign up or log in with your GitHub account

2. **Import your repository**
   - Click "New Project"
   - Select your portfolio repository
   - Vercel will auto-detect Next.js settings

3. **Configure build settings** (Vercel usually auto-configures these)
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Enable Decap CMS with Netlify Identity (Optional)

For full CMS functionality, you have two options:

#### Option A: Use Netlify (Recommended for CMS)

1. Deploy to Netlify instead of Vercel
2. Enable Netlify Identity in site settings
3. Enable Git Gateway
4. Invite yourself as a user
5. Access CMS at `/admin`

#### Option B: Use GitHub OAuth (Advanced)

1. Set up OAuth application on GitHub
2. Configure authentication in Decap CMS
3. More complex but works with Vercel

## 🛠️ Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  macos: {
    bg: {
      light: '#f5f5f7',  // Light background
      dark: '#1e1e1e',   // Dark background
    },
    // ... more colors
  },
}
```

### Adding New Dock Icons

1. Add icon image to `/public/icons/`
2. Edit `components/Dock.tsx`:

```typescript
const dockApps = [
  // ... existing apps
  { id: 'newapp', name: 'New App', icon: '/icons/newapp.png' },
];
```

### Modifying Window Sizes

Edit `app/page.tsx`:

```typescript
<Window
  title="Resume"
  width="900px"  // Change width
  height="700px" // Change height
>
```

### Changing Fonts

The site uses SF Pro font (Apple's system font). To change:

1. Edit `tailwind.config.js`:
   ```javascript
   fontFamily: {
     'sf-pro': ['Your Font', 'sans-serif'],
   }
   ```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Desktop.tsx         # Main desktop container
│   ├── MenuBar.tsx         # Top menu bar
│   ├── Dock.tsx            # Bottom dock (desktop)
│   ├── MobileNav.tsx       # Bottom nav (mobile)
│   ├── Window.tsx          # Draggable window component
│   ├── Timeline.tsx        # Timeline component
│   ├── StorySection.tsx    # Story section with scroll animations
│   ├── FunFactBubble.tsx   # Fun fact bubble tags
│   ├── ImageGallery.tsx    # Image gallery component
│   ├── PDFViewer.tsx       # PDF viewer component
│   └── windows/
│       ├── ResumeWindow.tsx
│       ├── HobbiesWindow.tsx
│       ├── ProfessionalWindow.tsx
│       ├── TimelineWindow.tsx
│       └── PersonalWindow.tsx
├── content/                # All content (markdown files)
│   ├── resume/
│   ├── hobbies/
│   ├── professional/
│   ├── timeline/
│   ├── personal/
│   │   ├── story/
│   │   └── funfacts/
│   └── settings.json
├── lib/
│   └── contentLoader.ts    # Content loading utilities
├── public/
│   ├── admin/
│   │   ├── config.yml      # Decap CMS configuration
│   │   └── index.html      # CMS entry point
│   ├── icons/              # Dock icons
│   ├── photos/             # CMS uploaded photos
│   ├── resume/             # Resume PDF
│   └── wallpapers/         # Background wallpapers
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Design Guidelines

### macOS Style Elements

- **Rounded Corners**: Use `rounded-xl` or `rounded-2xl`
- **Glassmorphism**: Use `.glass-effect` or `.window-glass` classes
- **Traffic Lights**: Red, yellow, green buttons (12px diameter)
- **Shadows**: Subtle shadows with `shadow-xl` or `shadow-2xl`
- **Transitions**: Use `duration-300` for smooth animations

### Responsive Breakpoints

- **Mobile**: `< 768px` - Full-screen modals, bottom nav
- **Desktop**: `≥ 768px` - Dock, draggable windows

## 🐛 Troubleshooting

### Issue: Draggable windows not working
**Solution**: Make sure `react-draggable` is installed:
```bash
npm install react-draggable
npm install --save-dev @types/react-draggable
```

### Issue: Dark mode not persisting
**Solution**: Clear browser localStorage and refresh

### Issue: PDF not displaying
**Solution**: 
1. Ensure `resume.pdf` exists in `/public/resume/`
2. Check browser console for CORS errors
3. PDF must be served from same domain

### Issue: Images not loading from CMS
**Solution**:
1. Check file paths in markdown files
2. Ensure images are in `/public/photos/`
3. Restart dev server after adding images

### Issue: Content changes not reflecting
**Solution**:
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📦 Build for Production

```bash
# Build the application
npm run build

# Test production build locally
npm start
```

## 🔧 Environment Variables (Optional)

Create `.env.local` for custom configuration:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CMS_BACKEND=github
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS
- **Decap CMS** - Content management
- **Lucide React** - Icon library
- **react-draggable** - Draggable components

## 💡 Tips for Best Experience

1. **Use high-quality images** (recommended 1920x1080 for wallpapers)
2. **Keep descriptions concise** for better mobile UX
3. **Organize timeline by date** using the "order" field
4. **Use emojis** in fun facts for visual interest
5. **Test on multiple devices** before deploying

## 🚀 What's Next?

Consider adding:
- Contact form integration
- Blog section
- Project showcase with live demos
- Analytics integration
- SEO optimization
- Social media links
- Email subscription
- Multi-language support

---

**Built with ❤️ using Next.js and Tailwind CSS**

For questions or issues, please create an issue in the repository.
