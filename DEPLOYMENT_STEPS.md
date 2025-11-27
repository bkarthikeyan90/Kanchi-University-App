# Deployment Steps - Quick Guide

## 🚀 Backend Deployment (Vercel)

### Step 1: Prepare Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/kanchi-university-app.git
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Add Environment Variables (see below)
6. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd backend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? kanchi-university-backend
# - Directory? ./
# - Override settings? No
```

### Step 3: Environment Variables in Vercel

Go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://zqzfrlvqkycnasoqokzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemZybHZxa3ljbmFzb3Fva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY3NTUsImV4cCI6MjA3OTgyMjc1NX0.iVy6IoKOD5MJ1_M7DQ7CJIvqx17rx3OfmNQcp2YObU8
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.zqzfrlvqkycnasoqokzo.supabase.co:5432/postgres
JWT_SECRET=your_secure_random_string_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NODE_ENV=production
```

**Important**: 
- Get `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard > Settings > API
- Get `DATABASE_URL` from Supabase Dashboard > Settings > Database
- Generate `JWT_SECRET` using: `openssl rand -base64 32`

### Step 4: Run Database Migrations

After deployment, run:
```bash
# Via Vercel CLI or SSH
cd backend
npx prisma generate
npx prisma db push
```

Or use Supabase SQL Editor to run migrations manually.

### Step 5: Create Admin User

After deployment, create admin user:
```bash
# Via Vercel CLI or local connection
cd backend
node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
```

Or use Prisma Studio:
```bash
npx prisma studio
```

## 📱 Mobile App Deployment

### Step 1: Update API URL

Update `mobile/.env`:
```env
API_BASE_URL=https://your-backend.vercel.app
```

### Step 2: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 3: Login to Expo
```bash
eas login
```

### Step 4: Configure EAS
```bash
cd mobile
eas build:configure
```

### Step 5: Update app.json
Update the `eas.projectId` in `mobile/app.json` after running `eas build:configure`

### Step 6: Build Android APK
```bash
# For testing (APK)
eas build --platform android --profile preview

# For production (AAB)
eas build --platform android --profile production
```

### Step 7: Build iOS IPA
```bash
eas build --platform ios --profile production
```

### Step 8: Download Builds
- Builds will be available in Expo dashboard
- Download APK/AAB for Android
- Download IPA for iOS (requires Apple Developer account)

## 🔧 Post-Deployment Checklist

### Backend
- [ ] Verify API is accessible at Vercel URL
- [ ] Test admin login at `/admin/login`
- [ ] Verify database connection
- [ ] Test file upload functionality
- [ ] Check API documentation at `/api/swagger`
- [ ] Verify CORS settings for mobile app

### Mobile App
- [ ] Update API_BASE_URL in `.env`
- [ ] Test app with production backend
- [ ] Verify authentication flow
- [ ] Test push notifications
- [ ] Test all screens and features

### Database
- [ ] Run Prisma migrations
- [ ] Create admin user
- [ ] Set up Supabase Storage bucket
- [ ] Configure RLS policies
- [ ] Seed sample data (optional)

### Security
- [ ] Change default admin password
- [ ] Verify JWT_SECRET is secure
- [ ] Check environment variables are set
- [ ] Review CORS settings
- [ ] Enable Supabase RLS

## 🐛 Troubleshooting

### Backend Issues

**Build Fails:**
- Check Node.js version (should be 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

**Database Connection Error:**
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Verify IP whitelist in Supabase

**API Not Working:**
- Check environment variables
- Verify CORS settings
- Check Vercel function logs

### Mobile App Issues

**Build Fails:**
- Check Expo SDK version
- Verify all dependencies
- Check EAS build logs

**API Connection Error:**
- Verify API_BASE_URL is correct
- Check CORS settings on backend
- Verify backend is deployed and running

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor API usage and performance

### Error Tracking
- Set up Sentry (optional)
- Monitor Vercel function logs

### Database Monitoring
- Use Supabase dashboard
- Monitor query performance
- Set up alerts

## 🔄 Continuous Deployment

### Automatic Deployments
- Vercel automatically deploys on git push
- Set up branch protection rules
- Use preview deployments for testing

### Manual Deployments
```bash
# Backend
cd backend
vercel --prod

# Mobile (after code changes)
cd mobile
eas build --platform android --profile production
```

## 📝 Next Steps After Deployment

1. **Test Everything**
   - Test all API endpoints
   - Test mobile app flows
   - Test admin dashboard

2. **Set Up Monitoring**
   - Configure error tracking
   - Set up analytics
   - Monitor performance

3. **Security Hardening**
   - Change default passwords
   - Review security settings
   - Enable 2FA for admin accounts

4. **Backup Strategy**
   - Set up database backups
   - Backup uploaded files
   - Version control all code

5. **Documentation**
   - Update API documentation
   - Document deployment process
   - Create runbooks

---

**Need Help?** Check the detailed guides:
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Full deployment guide
- [SETUP.md](./docs/SETUP.md) - Setup instructions
- [API.md](./docs/API.md) - API documentation

