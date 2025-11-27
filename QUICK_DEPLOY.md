# ⚡ Quick Deploy - Copy & Paste Commands

## Prerequisites Check

```powershell
# Check if Git is installed
git --version

# If not installed, download from: https://git-scm.com/download/win
```

## Step 1: Install Git (if needed)

1. Download: https://git-scm.com/download/win
2. Install with default settings
3. Restart PowerShell

## Step 2: Configure Git (First Time)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Vercel Deployment`
4. Select: ✅ `repo` ✅ `workflow`
5. Click: **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

## Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `kanchi-university-app`
3. **DO NOT** check any boxes (no README, .gitignore, license)
4. Click: **"Create repository"**

## Step 5: Push Code to GitHub

**Replace `YOUR_USERNAME` with your GitHub username:**

```powershell
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Kanchi University App"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kanchi-university-app.git

# Rename branch
git branch -M main

# Push (use your GitHub username and Personal Access Token as password)
git push -u origin main
```

## Step 6: Deploy to Vercel

### Via Dashboard (Easiest):

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub (OAuth - secure!)
3. **Click:** "Add New Project"
4. **Import:** `kanchi-university-app`
5. **Configure:**
   - Root Directory: `backend` ⚠️ **IMPORTANT!**
   - Framework: Next.js (auto)
6. **Add Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://zqzfrlvqkycnasoqokzo.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8`
   - `SUPABASE_SERVICE_ROLE_KEY` = [Get from Supabase Dashboard]
   - `DATABASE_URL` = [Get from Supabase Dashboard]
   - `JWT_SECRET` = [Generate: `openssl rand -base64 32`]
   - `NODE_ENV` = `production`
7. **Click:** "Deploy"
8. **Wait:** 2-3 minutes
9. **Done!** Your app is live!

### Get Supabase Keys:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. **Settings → API:**
   - Copy "service_role" key (secret!)
4. **Settings → Database:**
   - Copy "Connection string" (URI format)

## Step 7: Post-Deployment

```powershell
# After deployment, get your Vercel URL and update:
# 1. Go to Vercel Dashboard → Settings → Environment Variables
# 2. Update NEXT_PUBLIC_APP_URL with your Vercel URL
# 3. Redeploy

# Run database migrations (via Vercel CLI or Supabase SQL Editor)
cd backend
npx prisma db push

# Create admin user
node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
```

## ✅ Test Your Deployment

- Homepage: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`
- API: `https://your-project.vercel.app/api/homepage`

## 🎉 Done!

Your app is now live! Every push to GitHub will auto-deploy.

---

**Need Help?** See [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed steps.

