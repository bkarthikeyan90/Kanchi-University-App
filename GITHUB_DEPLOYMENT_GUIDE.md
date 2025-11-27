# GitHub Deployment Guide - Step by Step

## 🔐 Important: Secure Authentication

We'll use **GitHub OAuth** (secure) instead of passwords. Vercel will connect to your GitHub account securely.

## Step 1: Install Git (if not installed)

**Download Git for Windows:**
- Go to: https://git-scm.com/download/win
- Download and install
- Restart your terminal/PowerShell after installation

**Verify installation:**
```bash
git --version
```

## Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `kanchi-university-app`
4. Description: "Kanchi University Official Mobile Application"
5. Choose: **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

## Step 4: Initialize and Push Code

**Open PowerShell in your project directory and run:**

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Kanchi University App"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kanchi-university-app.git

# Rename branch to main
git branch -M main

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

**When prompted for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

### How to Create GitHub Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Vercel Deployment`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

## Step 5: Deploy to Vercel via GitHub

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up/Login with your GitHub account (OAuth - secure!)

2. **Import Project:**
   - Click **"Add New Project"**
   - Click **"Import Git Repository"**
   - Select `kanchi-university-app`
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `.next` (auto)
   - **Install Command**: `npm install` (auto)

4. **Add Environment Variables:**
   Click **"Environment Variables"** and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://zqzfrlvqkycnasoqokzo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8
   SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard]
   DATABASE_URL=[Get from Supabase Dashboard]
   JWT_SECRET=[Generate: openssl rand -base64 32]
   NEXT_PUBLIC_APP_URL=[Will be your Vercel URL - update after deployment]
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click **"Deploy"**
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at: `https://your-project.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login (will open browser for OAuth)
vercel login

# Deploy
cd backend
vercel --prod
```

## Step 6: Post-Deployment Setup

### 1. Get Your Vercel URL
After deployment, copy your Vercel URL (e.g., `https://kanchi-university-app.vercel.app`)

### 2. Update Environment Variable
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
- Redeploy (or it will auto-deploy on next push)

### 3. Run Database Migrations

**Option A: Via Vercel CLI (Recommended)**
```bash
# Connect to your deployment
vercel link

# Run migrations
cd backend
npx prisma generate
npx prisma db push
```

**Option B: Via Supabase SQL Editor**
- Go to Supabase Dashboard → SQL Editor
- Run the Prisma migrations manually

### 4. Create Admin User

**Via Vercel CLI:**
```bash
cd backend
node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
```

**Or via Supabase Dashboard:**
- Go to Table Editor → `admin_users`
- Insert a new row with hashed password

### 5. Set Up Supabase Storage
- Go to Supabase Dashboard → Storage
- Create bucket: `university-files`
- Set to public or configure RLS policies

## Step 7: Test Your Deployment

✅ **Test these URLs:**
- Homepage: `https://your-project.vercel.app`
- Admin Login: `https://your-project.vercel.app/admin`
- API Docs: `https://your-project.vercel.app/api/swagger`
- Homepage API: `https://your-project.vercel.app/api/homepage`

## 🔄 Continuous Deployment

**Automatic Deployments:**
- Every push to `main` branch = Auto deploy to production
- Every push to other branches = Preview deployment

**Manual Deployment:**
```bash
git add .
git commit -m "Your changes"
git push origin main
# Vercel will automatically deploy!
```

## 📱 Mobile App Deployment

After backend is deployed:

1. **Update Mobile App API URL:**
   Edit `mobile/.env`:
   ```env
   API_BASE_URL=https://your-project.vercel.app
   ```

2. **Build Mobile App:**
   ```bash
   cd mobile
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform android --profile preview
   ```

## 🐛 Troubleshooting

### Git Push Fails?
- Make sure you're using Personal Access Token (not password)
- Check repository URL is correct
- Verify Git is installed

### Vercel Build Fails?
- Check Root Directory is set to `backend`
- Verify all environment variables are set
- Check build logs in Vercel dashboard

### Database Connection Error?
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Verify IP whitelist in Supabase

## 🔒 Security Best Practices

1. ✅ Use Personal Access Tokens (not passwords)
2. ✅ Use OAuth for Vercel (automatic)
3. ✅ Never commit `.env` files
4. ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret
5. ✅ Use strong `JWT_SECRET`
6. ✅ Enable 2FA on GitHub

## 📋 Quick Checklist

- [ ] Git installed
- [ ] Git configured (name & email)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created (via GitHub OAuth)
- [ ] Project imported in Vercel
- [ ] Root Directory set to `backend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Database migrations run
- [ ] Admin user created
- [ ] API tested

---

## 🚀 Ready to Deploy?

Follow the steps above. If you need help with any step, let me know!

**Remember:** 
- Use **GitHub OAuth** for Vercel (secure, automatic)
- Use **Personal Access Token** for Git push (not password)
- Set **Root Directory** to `backend` in Vercel

