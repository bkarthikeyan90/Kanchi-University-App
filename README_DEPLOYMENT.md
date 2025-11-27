# 🚀 Quick Deployment Guide

## Step 1: Install Git (if not installed)

**Download Git for Windows:**
- Go to: https://git-scm.com/download/win
- Download and install
- **Restart PowerShell** after installation

## Step 2: Run Deployment Script

**In PowerShell, run:**
```powershell
.\DEPLOY_NOW.ps1
```

The script will:
- ✅ Check if Git is installed
- ✅ Configure Git (if needed)
- ✅ Initialize repository
- ✅ Add all files
- ✅ Commit changes
- ✅ Guide you through GitHub setup
- ✅ Push to GitHub

## Step 3: Create GitHub Repository

**Before pushing, create the repository:**

1. Go to: https://github.com/new
2. Repository name: `kanchi-university-app`
3. **DO NOT** check any boxes
4. Click: **"Create repository"**

## Step 4: Get GitHub Personal Access Token

**GitHub requires a token (not password):**

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Vercel Deployment`
4. Select scopes:
   - ✅ **repo** (Full control)
   - ✅ **workflow** (Update workflows)
5. Click: **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

**When the script asks for password, use this token!**

## Step 5: Deploy to Vercel

**After code is pushed to GitHub:**

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub (OAuth - secure!)
3. **Click:** "Add New Project"
4. **Import:** `kanchi-university-app`
5. **Configure:**
   - **Root Directory:** `backend` ⚠️ **VERY IMPORTANT!**
   - Framework: Next.js (auto)
6. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://zqzfrlvqkycnasoqokzo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8
   SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard]
   DATABASE_URL=[Get from Supabase Dashboard]
   JWT_SECRET=[Generate: openssl rand -base64 32]
   NEXT_PUBLIC_APP_URL=[Your Vercel URL - update after deployment]
   NODE_ENV=production
   ```
7. **Click:** "Deploy"
8. **Wait:** 2-3 minutes
9. **Done!** 🎉

## Step 6: Post-Deployment

**After deployment:**

1. **Get your Vercel URL** (e.g., `https://kanchi-university-app.vercel.app`)
2. **Update `NEXT_PUBLIC_APP_URL`** in Vercel environment variables
3. **Run database migrations:**
   ```bash
   cd backend
   npx prisma db push
   ```
4. **Create admin user:**
   ```bash
   node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
   ```

## ✅ Test Your Deployment

- Homepage: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`
- API: `https://your-project.vercel.app/api/homepage`

## 🆘 Troubleshooting

**Git not found?**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell

**Push fails?**
- Use Personal Access Token (not password)
- Verify repository URL is correct
- Check token has `repo` and `workflow` scopes

**Vercel build fails?**
- Check Root Directory is `backend`
- Verify all environment variables are set
- Check build logs in Vercel dashboard

---

**Ready?** Run `.\DEPLOY_NOW.ps1` and follow the prompts! 🚀

