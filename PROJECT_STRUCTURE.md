# Project Structure

```
scsvmv/
├── backend/                          # Next.js Backend + Admin Dashboard
│   ├── app/
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   │   ├── login/
│   │   │   │   └── verify-otp/
│   │   │   ├── news/                 # News CRUD
│   │   │   ├── events/               # Events CRUD
│   │   │   ├── departments/          # Departments CRUD
│   │   │   ├── courses/              # Courses CRUD
│   │   │   ├── faculty/              # Faculty CRUD
│   │   │   ├── gallery/              # Gallery CRUD
│   │   │   ├── placements/           # Placements CRUD
│   │   │   ├── exams/                # Examinations CRUD
│   │   │   ├── circulars/            # Circulars CRUD
│   │   │   ├── notifications/        # Push notifications
│   │   │   ├── homepage/             # Homepage data
│   │   │   ├── upload/               # File upload
│   │   │   └── swagger/              # API documentation
│   │   ├── admin/                    # Admin Dashboard
│   │   │   ├── layout.tsx            # Admin layout
│   │   │   ├── login/                # Admin login page
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── news/                 # News management
│   │   │   ├── events/               # Events management
│   │   │   └── departments/          # Departments management
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css               # Global styles
│   ├── lib/                          # Utilities
│   │   ├── supabase.ts              # Supabase client
│   │   ├── prisma.ts                # Prisma client
│   │   ├── auth.ts                  # Authentication utilities
│   │   ├── middleware.ts            # API middleware
│   │   └── firebase.ts              # Firebase Admin SDK
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   ├── scripts/
│   │   └── create-admin.js          # Admin user creation script
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── mobile/                           # React Native Mobile App
│   ├── app/
│   │   └── screens/                 # App screens
│   │       ├── HomeScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       ├── NewsScreen.tsx
│   │       ├── NewsDetailScreen.tsx
│   │       ├── EventsScreen.tsx
│   │       ├── EventDetailScreen.tsx
│   │       ├── DepartmentsScreen.tsx
│   │       ├── DepartmentDetailScreen.tsx
│   │       ├── GalleryScreen.tsx
│   │       ├── PlacementsScreen.tsx
│   │       ├── ExaminationsScreen.tsx
│   │       └── ContactScreen.tsx
│   ├── store/
│   │   └── authStore.ts             # Zustand auth store
│   ├── services/
│   │   └── api.ts                   # API service layer
│   ├── components/                  # Reusable components (if any)
│   ├── App.tsx                      # Main app component
│   ├── app.json                     # Expo configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   └── .env.example
│
├── docs/                             # Documentation
│   ├── SETUP.md                     # Setup instructions
│   ├── API.md                       # API documentation
│   ├── DATABASE.md                  # Database schema
│   └── DEPLOYMENT.md                # Deployment guide
│
├── README.md                         # Main readme
├── PROJECT_STRUCTURE.md             # This file
├── package.json                     # Root package.json
└── .gitignore
```

## Directory Explanations

### Backend (`/backend`)
- **app/api/**: All API route handlers using Next.js App Router
- **app/admin/**: Admin dashboard pages and components
- **lib/**: Shared utilities, database clients, and helper functions
- **prisma/**: Database schema and migrations
- **scripts/**: Utility scripts for setup and maintenance

### Mobile (`/mobile`)
- **app/screens/**: All mobile app screens/components
- **store/**: State management using Zustand
- **services/**: API service layer for backend communication
- **components/**: Reusable UI components (if needed)

### Documentation (`/docs`)
- Setup guides, API docs, database schema, and deployment instructions

## Key Files

### Backend
- `backend/app/api/**/route.ts` - API route handlers
- `backend/lib/supabase.ts` - Supabase client configuration
- `backend/lib/prisma.ts` - Prisma ORM client
- `backend/lib/auth.ts` - JWT authentication utilities
- `backend/prisma/schema.prisma` - Database schema definition

### Mobile
- `mobile/App.tsx` - Main app entry point with navigation
- `mobile/store/authStore.ts` - Authentication state management
- `mobile/services/api.ts` - API service with axios
- `mobile/app/screens/*.tsx` - Individual app screens

## Technology Stack

### Backend
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Auth**: JWT + Supabase Auth
- **Storage**: Supabase Storage
- **Notifications**: Firebase Cloud Messaging

### Mobile
- **Framework**: React Native + Expo
- **Navigation**: React Navigation
- **State**: Zustand
- **HTTP**: Axios
- **UI**: React Native Paper (optional)

## Development Workflow

1. **Backend Development**
   - Create/modify API routes in `backend/app/api/`
   - Update database schema in `backend/prisma/schema.prisma`
   - Run `npx prisma db push` to sync schema
   - Test endpoints using Swagger at `/api/swagger`

2. **Mobile Development**
   - Create/modify screens in `mobile/app/screens/`
   - Update API service in `mobile/services/api.ts`
   - Test on Expo Go app or emulator

3. **Admin Dashboard**
   - Create/modify admin pages in `backend/app/admin/`
   - Use Tailwind CSS for styling
   - Test admin functionality

## File Naming Conventions

- **Components**: PascalCase (e.g., `HomeScreen.tsx`)
- **Utilities**: camelCase (e.g., `apiService.ts`)
- **API Routes**: lowercase with hyphens (e.g., `verify-otp/route.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

