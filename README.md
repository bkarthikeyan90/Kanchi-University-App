# Kanchi University Official Mobile Application

A comprehensive mobile application for Kanchi University with dynamic content management, admin dashboard, and full-stack backend.

## Project Structure

```
scsvmv/
├── backend/              # Next.js 14 App Router + Supabase Backend
│   ├── app/             # Next.js app directory
│   ├── prisma/          # Prisma schema and migrations
│   ├── lib/             # Utilities and Supabase client
│   └── public/          # Static files
├── admin/               # Admin Dashboard (Next.js)
│   └── (same as backend, shared codebase)
└── mobile/              # React Native + Expo Mobile App
    ├── app/            # App screens
    ├── components/     # Reusable components
    ├── services/       # API services
    └── store/          # State management
```

## Technology Stack

### Backend & Admin
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Auth**: Supabase Auth + Firebase Auth (for OTP)
- **Storage**: Supabase Storage
- **UI**: Tailwind CSS + Shadcn UI

### Mobile App
- **Framework**: React Native + Expo
- **Navigation**: React Navigation
- **State**: Zustand
- **HTTP**: Axios
- **Notifications**: Firebase Cloud Messaging

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Supabase account
- Firebase account (for FCM)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your Supabase credentials
npx prisma generate
npx prisma db push
npm run dev
```

### Admin Dashboard

The admin dashboard runs on the same Next.js server at `/admin` route.

### Mobile App Setup

```bash
cd mobile
npm install
cp .env.example .env
# Fill in your API and Firebase credentials
npx expo start
```

## Environment Variables

See `.env.example` files in each directory for required variables.

## Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## License

Proprietary - Kanchi University

