# Deployment Guide

## Backend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository
- Supabase project configured

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/kanchi-university-app.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `backend` directory as root

3. **Configure Environment Variables**
   Add all variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)

4. **Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your API will be available at `https://your-project.vercel.app`

## Mobile App Deployment

### Android (EAS Build)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   cd mobile
   eas build:configure
   ```

4. **Update app.json**
   - Set `eas.projectId` in `app.json`
   - Configure Android package name
   - Configure iOS bundle identifier

5. **Build Android APK/AAB**
   ```bash
   eas build --platform android
   ```

6. **Build iOS IPA**
   ```bash
   eas build --platform ios
   ```

### Manual Android Build

1. **Generate Keystore**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure app.json**
   Add Android signing config:
   ```json
   "android": {
     "package": "com.kanchiuniversity.app",
     "versionCode": 1
   }
   ```

3. **Build**
   ```bash
   expo build:android
   ```

## Supabase Setup

### Database

1. **Run Migrations**
   ```bash
   cd backend
   npx prisma db push
   ```

2. **Create Storage Bucket**
   - Go to Supabase Dashboard > Storage
   - Create bucket: `university-files`
   - Set to public or configure RLS

3. **Configure RLS Policies**
   - Enable RLS on all tables
   - Create policies for public read access
   - Create policies for admin write access

### Example RLS Policy

```sql
-- Allow public read access to published news
CREATE POLICY "Public read access" ON news
FOR SELECT
USING (is_published = true);

-- Allow admin write access
CREATE POLICY "Admin write access" ON news
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'SUPERADMIN'
  )
);
```

## Firebase Setup (Push Notifications)

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project

2. **Add Android App**
   - Add Android app with package name
   - Download `google-services.json`
   - Place in `mobile/android/app/`

3. **Add iOS App**
   - Add iOS app with bundle ID
   - Download `GoogleService-Info.plist`
   - Place in `mobile/ios/`

4. **Enable Cloud Messaging**
   - Go to Project Settings > Cloud Messaging
   - Enable FCM
   - Copy server key

5. **Configure Backend**
   - Add Firebase credentials to backend `.env`
   - Initialize Firebase Admin SDK

## Environment Variables Checklist

### Backend (.env)
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_PRIVATE_KEY
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] NEXT_PUBLIC_APP_URL

### Mobile (.env)
- [ ] API_BASE_URL (production backend URL)
- [ ] SUPABASE_URL (if needed)
- [ ] SUPABASE_ANON_KEY (if needed)

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify admin login works
- [ ] Test mobile app authentication
- [ ] Verify push notifications
- [ ] Test file uploads
- [ ] Check database connections
- [ ] Verify CORS settings
- [ ] Test on both Android and iOS
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics
- [ ] Set up backup strategy

## Monitoring & Maintenance

### Error Monitoring
- Set up Sentry for error tracking
- Configure alerts for critical errors

### Analytics
- Integrate Google Analytics
- Track user engagement
- Monitor API usage

### Backups
- Set up automated database backups in Supabase
- Regular backup of uploaded files
- Version control for code

### Updates
- Regular dependency updates
- Security patches
- Feature updates

## Troubleshooting

### Build Failures
- Check environment variables
- Verify Node.js version
- Check build logs

### Runtime Errors
- Check Supabase connection
- Verify Firebase credentials
- Check API endpoints

### Push Notification Issues
- Verify FCM tokens
- Check Firebase configuration
- Test notification sending

