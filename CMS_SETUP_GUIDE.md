# 🚀 COMPLETE LOCAL + PRODUCTION CMS SETUP GUIDE

## 📋 TABLE OF CONTENTS
1. [Local Development Setup](#local-development)
2. [Production Deployment (Vercel + GitHub OAuth)](#production-deployment)
3. [GitHub OAuth Setup](#github-oauth-setup)
4. [Environment Variables](#environment-variables)
5. [Workflow & Commands](#workflow)
6. [Troubleshooting](#troubleshooting)

---

## 🏠 LOCAL DEVELOPMENT

### Step 1: Use Local Config
Your current `public/admin/config.yml` is already set up with:
```yaml
local_backend: true
```
✅ This is correct for local development!

### Step 2: Install Decap Server (One-time)
```powershell
npm install -D decap-server
```

### Step 3: Run Local Development

**Terminal 1** - Start Decap CMS Proxy Server:
```powershell
npx decap-server
```
Output should show:
```
Decap CMS File System Proxy Server configured
Decap CMS Proxy Server listening on port 8081
```

**Terminal 2** - Start Next.js Dev Server:
```powershell
npm run dev
```
Output should show:
```
▲ Next.js 15.5.6
- Local: http://localhost:3000
✓ Ready in 2s
```

### Step 4: Access Local CMS
Open in browser:
```
http://localhost:3000/admin
```

✅ **You're now editing offline!**
- No Netlify needed
- No GitHub authentication
- Changes save directly to local files

---

## 📁 FOLDER STRUCTURE (What CMS Reads)

```
portfolio/
├── content/
│   ├── resume/
│   │   └── resume.md                    ← Resume info
│   ├── hobbies/
│   │   ├── hobby1.md
│   │   ├── hobby2.md
│   │   └── ...
│   ├── professional/
│   │   ├── pro1.md
│   │   ├── pro2.md
│   │   └── ...
│   ├── timeline/
│   │   ├── event1.md
│   │   ├── event2.md
│   │   └── ...
│   └── personal/
│       ├── story/
│       │   ├── story1.md
│       │   └── story2.md
│       └── funfacts/
│           ├── fun1.md
│           └── fun2.md
│
├── public/
│   ├── photos/                          ← Uploaded images
│   ├── resume/
│   │   └── resume.pdf                   ← Resume PDF
│   └── admin/
│       ├── index.html                   ← CMS UI
│       └── config.yml                   ← CMS config
│
└── ...
```

---

## 🔄 LOCAL EDITING WORKFLOW

### 1. Edit Content via CMS
```
http://localhost:3000/admin
```
- Click any collection (Timeline, Hobbies, etc.)
- Edit or create entries
- Click "Publish" (saves to local files)

### 2. Check Changes
```powershell
git status
```
You'll see modified files like:
```
modified:   content/timeline/event1.md
modified:   content/hobbies/hobby1.md
new file:   public/photos/new-image.jpg
```

### 3. Commit Changes
```powershell
git add .
git commit -m "Update timeline and hobbies content"
```

### 4. Push to GitHub
```powershell
git push origin main
```

### 5. View Changes
Refresh `http://localhost:3000` to see updates immediately.

---

## ☁️ PRODUCTION DEPLOYMENT (VERCEL + GITHUB OAUTH)

### When You're Ready to Deploy:

### Step 1: Replace config.yml for Production

**BEFORE deploying**, update `public/admin/config.yml`:

```yaml
# Remove or comment out local_backend
# local_backend: true  ← REMOVE THIS LINE

backend:
  name: github
  repo: zaw-ye-tun/portfolio
  branch: main

media_folder: "public/photos"
public_folder: "/photos"

# ... rest of collections stay the same
```

**OR** copy from `CONFIG_PRODUCTION.yml` I provided above.

### Step 2: Create GitHub OAuth App

Go to: https://github.com/settings/developers

Click **"New OAuth App"**

Fill in:
```
Application name: Portfolio CMS
Homepage URL: https://your-portfolio.vercel.app
Authorization callback URL: https://your-portfolio.vercel.app/api/callback
```

Click **"Register application"**

You'll get:
- **Client ID**: `Ov23liAaBbCcDd...` (save this)
- **Client Secret**: Click "Generate a new client secret" → `1234567890abcdef...` (save this)

⚠️ **IMPORTANT**: Save these secrets immediately. You won't see them again!

### Step 3: Deploy to Vercel

#### Option A: Vercel CLI
```powershell
npm install -g vercel
vercel login
vercel
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import `zaw-ye-tun/portfolio`
3. Click "Deploy"

### Step 4: Add Environment Variables to Vercel

Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these:

| Name | Value | Environment |
|------|-------|-------------|
| `GITHUB_CLIENT_ID` | `Ov23liAaBbCcDd...` | Production |
| `GITHUB_CLIENT_SECRET` | `1234567890abcdef...` | Production |

Click **Save**

### Step 5: Create OAuth Handler (API Route)

Create this file: `app/api/callback/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // Redirect back to CMS with token
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
        </head>
        <body>
          <script>
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(data)}',
              window.location.origin
            );
            window.close();
          </script>
        </body>
      </html>
    `;

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
```

### Step 6: Redeploy Vercel

After adding the API route and environment variables:

```powershell
git add .
git commit -m "Add GitHub OAuth for CMS"
git push origin main
```

Vercel will auto-deploy.

### Step 7: Access Production CMS

Go to:
```
https://your-portfolio.vercel.app/admin
```

Click **"Login with GitHub"**

✅ You're now authenticated via GitHub!

---

## 🔑 GITHUB OAUTH SETUP (DETAILED)

### URLs You Need:

**Authorization URL:**
```
https://github.com/login/oauth/authorize
```

**Token URL:**
```
https://github.com/login/oauth/access_token
```

**Callback URL:**
```
https://your-portfolio.vercel.app/api/callback
```

### OAuth Flow:
1. User clicks "Login with GitHub" in CMS
2. Redirected to GitHub authorization
3. User approves access
4. GitHub redirects to `/api/callback?code=...`
5. Your API exchanges code for access token
6. Token returned to CMS
7. CMS can now read/write to GitHub repo

---

## 🔐 ENVIRONMENT VARIABLES

### Local Development (.env.local)
**Not needed** - local_backend bypasses authentication

### Production (Vercel)
Add these in Vercel Dashboard:

```env
GITHUB_CLIENT_ID=Ov23liAaBbCcDdEeFfGg
GITHUB_CLIENT_SECRET=1234567890abcdef1234567890abcdef12345678
```

⚠️ **Never commit these to Git!**

Add to `.gitignore`:
```
.env.local
.env*.local
```

---

## 🛠️ COMMANDS CHEAT SHEET

### Local Development
```powershell
# Terminal 1
npx decap-server

# Terminal 2
npm run dev

# Open CMS
start http://localhost:3000/admin
```

### Commit & Push Changes
```powershell
git status
git add .
git commit -m "Update content via CMS"
git push origin main
```

### Deploy to Vercel
```powershell
vercel --prod
```

### Check Vercel Logs
```powershell
vercel logs
```

---

## ⚠️ BEST PRACTICES & WARNINGS

### ✅ DO:
- Use `local_backend: true` for development
- Commit changes regularly
- Test locally before deploying
- Keep GitHub OAuth secrets secure
- Use environment variables in Vercel

### ❌ DON'T:
- Commit `local_backend: true` to production
- Share OAuth secrets publicly
- Edit files manually AND via CMS simultaneously (conflicts)
- Deploy without testing locally first

### 🔄 Switching Between Local & Production

**For Local:**
```yaml
local_backend: true
backend:
  name: git-gateway
```

**For Production:**
```yaml
# local_backend: true  ← REMOVE
backend:
  name: github
  repo: zaw-ye-tun/portfolio
  branch: main
```

---

## 🐛 TROUBLESHOOTING

### CMS Not Loading at /admin
- Check `public/admin/index.html` exists
- Verify dev server is running on port 3000
- Clear browser cache (Ctrl+Shift+R)

### Proxy Server Error
```powershell
# Kill existing process
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process

# Restart
npx decap-server
```

### GitHub OAuth Not Working
- Verify callback URL matches exactly
- Check environment variables in Vercel
- Look at Vercel function logs for errors

### Changes Not Showing
```powershell
# Restart dev server
# Terminal: Ctrl+C, then
npm run dev
```

### Merge Conflicts
```powershell
git pull origin main
# Resolve conflicts in VS Code
git add .
git commit -m "Resolve conflicts"
git push origin main
```

---

## 📚 QUICK REFERENCE

| Task | Command |
|------|---------|
| Start local CMS | `npx decap-server` |
| Start dev server | `npm run dev` |
| Access local CMS | http://localhost:3000/admin |
| Commit changes | `git add . && git commit -m "..."` |
| Push to GitHub | `git push origin main` |
| Deploy to Vercel | `vercel --prod` |
| View production CMS | https://your-site.vercel.app/admin |

---

## ✨ NEXT STEPS

1. ✅ **NOW**: Edit content locally via CMS
2. ✅ **WHEN READY**: Create GitHub OAuth app
3. ✅ **THEN**: Deploy to Vercel
4. ✅ **FINALLY**: Add env vars and test production CMS

---

**You're all set!** 🎉

Any issues? Check the troubleshooting section above.
