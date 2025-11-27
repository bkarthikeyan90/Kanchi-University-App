# 🚀 Deploy Now - Quick Commands

## Backend Deployment (Vercel)

### Option 1: Using Vercel Dashboard (Recommended for First Time)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/kanchi-university-app.git
   git push -u origin main
   ```

2. **Deploy via Dashboard:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Set Root Directory to `backend`
   - Add environment variables (see below)
   - Click "Deploy"

### Option 2: Using Vercel CLI

**Windows (PowerShell):**
```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd backend
vercel --prod
```

**Mac/Linux:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd backend
vercel --prod
```

### Required Environment Variables

Add these in Vercel Dashboard > Project Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://zqzfrlvqkycnasoqokzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8
SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard > Settings > API]
DATABASE_URL=[Get from Supabase Dashboard > Settings > Database]
JWT_SECRET=[Generate with: openssl rand -base64 32]
FIREBASE_PROJECT_ID=[Your Firebase Project ID]
FIREBASE_PRIVATE_KEY=[Your Firebase Private Key]
FIREBASE_CLIENT_EMAIL=[Your Firebase Client Email]
NEXT_PUBLIC_APP_URL=[Your Vercel URL after deployment]
NODE_ENV=production
```

### After Deployment

1. **Get your Vercel URL** (e.g., `https://your-project.vercel.app`)

2. **Run Database Setup:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

3. **Create Admin User:**
   ```bash
   node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
   ```

4. **Test:**
   - Visit: `https://your-project.vercel.app`
   - Admin: `https://your-project.vercel.app/admin`
   - API Docs: `https://your-project.vercel.app/api/swagger`

## Mobile App Deployment

### Update API URL

Edit `mobile/.env`:
```env
API_BASE_URL=https://your-project.vercel.app
```

### Build Android APK

```bash
cd mobile

# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform android --profile preview
```

### Build iOS IPA

```bash
eas build --platform ios --profile production
```

## Quick Checklist

- [ ] Backend deployed to Vercel
- [ ] Environment variables added
- [ ] Database migrations run
- [ ] Admin user created
- [ ] API tested
- [ ] Mobile app API URL updated
- [ ] Mobile app built

## Need Help?

- Full guide: [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md)
- Setup: [docs/SETUP.md](./docs/SETUP.md)
- API Docs: [docs/API.md](./docs/API.md)

