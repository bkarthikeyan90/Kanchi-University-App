# 🚀 GitHub Setup - Ready to Deploy!

I've prepared everything for GitHub deployment. Here's what you need to do:

## ✅ What's Ready

- ✅ All code files
- ✅ Git configuration files
- ✅ GitHub Actions workflow
- ✅ Deployment documentation

## 📝 What You Need to Do

### 1. Install Git (if not installed)

**Download:** https://git-scm.com/download/win

After installation, restart PowerShell.

### 2. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `kanchi-university-app`
3. **Leave all checkboxes UNCHECKED**
4. Click: **"Create repository"**

### 3. Get GitHub Personal Access Token

**IMPORTANT:** GitHub no longer accepts passwords. You need a token.

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Vercel Deployment`
4. Expiration: `90 days` (or `No expiration`)
5. Select scopes:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
6. Click: **"Generate token"**
7. **COPY THE TOKEN** - You won't see it again!

### 4. Push Code to GitHub

**Open PowerShell in your project folder and run:**

```powershell
# Initialize git
git init

# Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit - Kanchi University App"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kanchi-university-app.git

# Rename branch
git branch -M main

# Push (when asked for password, use your Personal Access Token)
git push -u origin main
```

**When prompted:**
- **Username:** Your GitHub username
- **Password:** Your Personal Access Token (not your GitHub password!)

### 5. Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub (click "Continue with GitHub")
3. **Click:** "Add New Project"
4. **Import:** Select `kanchi-university-app`
5. **Configure:**
   - **Root Directory:** `backend` ⚠️ **VERY IMPORTANT!**
   - Framework: Next.js (auto-detected)
6. **Add Environment Variables:**
   - See list in [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md)
7. **Click:** "Deploy"
8. **Wait:** 2-3 minutes
9. **Done!** Your app is live!

## 🔑 Environment Variables Needed

Add these in Vercel Dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://zqzfrlvqkycnasoqokzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8
SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard → Settings → API]
DATABASE_URL=[Get from Supabase Dashboard → Settings → Database]
JWT_SECRET=[Generate with: openssl rand -base64 32]
NEXT_PUBLIC_APP_URL=[Your Vercel URL - update after first deployment]
NODE_ENV=production
```

## 📚 Detailed Guides

- **Full Guide:** [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md)
- **Quick Commands:** [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

## 🆘 Need Help?

If you get stuck:
1. Check [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed steps
2. Make sure Git is installed
3. Verify you're using Personal Access Token (not password)
4. Check Root Directory is set to `backend` in Vercel

---

**Ready?** Start with Step 1 above! 🚀

