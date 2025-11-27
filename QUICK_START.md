# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

### Step 2: Set Up Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
```

**Mobile:**
```bash
cd mobile
cp .env.example .env
# Edit .env with your API URL
```

### Step 3: Set Up Database

```bash
cd backend
npx prisma generate
npx prisma db push
```

### Step 4: Create Admin User

```bash
cd backend
node scripts/create-admin.js admin admin@kanchiuniv.ac.in admin123 SUPERADMIN
```

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Mobile:**
```bash
cd mobile
npm start
```

### Step 6: Access Applications

- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Docs**: http://localhost:3000/api/swagger
- **Mobile App**: Scan QR code with Expo Go app

## 📱 Testing the Mobile App

1. Install Expo Go on your phone
2. Scan the QR code from `npm start`
3. Login with OTP (for now, use any 6-digit code)
4. Explore the app!

## 🔐 Admin Login

- URL: http://localhost:3000/admin/login
- Username: `admin` (or what you created)
- Password: `admin123` (or what you set)

## 📚 Next Steps

- Read [SETUP.md](./docs/SETUP.md) for detailed setup
- Check [API.md](./docs/API.md) for API documentation
- See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for production deployment

## ⚠️ Important Notes

1. **Supabase Setup Required**: You need to:
   - Create a Supabase project
   - Get your project URL and keys
   - Create a storage bucket named `university-files`

2. **Firebase Setup** (for push notifications):
   - Create a Firebase project
   - Add Android/iOS apps
   - Get credentials and add to `.env`

3. **Database**: Make sure your Supabase database is accessible and the connection string is correct.

## 🐛 Troubleshooting

**Database connection error?**
- Check your `DATABASE_URL` in `.env`
- Verify Supabase project is active
- Check IP whitelist in Supabase

**Mobile app not connecting?**
- Verify `API_BASE_URL` in mobile `.env`
- Make sure backend is running
- Check CORS settings

**Admin login not working?**
- Make sure admin user exists in database
- Check password hash is correct
- Verify JWT_SECRET is set

## 📞 Support

For issues, check:
- [Setup Guide](./docs/SETUP.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

