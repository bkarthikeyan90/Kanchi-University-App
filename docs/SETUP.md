# Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- Supabase account
- Firebase account (for push notifications)
- Git

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase private key
- `FIREBASE_CLIENT_EMAIL` - Firebase client email

### 4. Set up database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Create initial admin user

Run this script to create your first admin user:

```bash
node scripts/create-admin.js
```

Or seed sample data (includes admin user + demo content):

```bash
npm run db:seed
```

Or manually insert into database:

```sql
INSERT INTO admin_users (id, username, email, "passwordHash", role, "isActive")
VALUES (
  gen_random_uuid(),
  'admin',
  'admin@kanchiuniv.ac.in',
  '$2a$10$...', -- bcrypt hash of your password
  'SUPERADMIN',
  true
);
```

### 6. Set up Supabase Storage

1. Go to Supabase Dashboard > Storage
2. Create a new bucket named `university-files`
3. Set it to public or configure RLS policies

### 7. Run the development server

```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

## Mobile App Setup

### 1. Navigate to mobile directory

```bash
cd mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env` file:

```bash
API_BASE_URL=http://localhost:3000
# For production, use your deployed backend URL
# API_BASE_URL=https://your-backend.vercel.app
```

### 4. Configure Firebase (for push notifications)

1. Create a Firebase project
2. Add Android/iOS apps to your Firebase project
3. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
4. Place them in the appropriate directories

### 5. Run the app

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Admin Dashboard

The admin dashboard is accessible at:
- Development: `http://localhost:3000/admin`
- Login with your admin credentials

## Production Deployment

### Backend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Mobile App (EAS Build)

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build --platform android` or `eas build --platform ios`

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure IP is whitelisted in Supabase

### Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure admin user exists in database

### Push Notification Issues

- Verify Firebase credentials
- Check FCM token is being saved
- Ensure notification permissions are granted

