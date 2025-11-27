# Database Schema

## Overview

The application uses PostgreSQL via Supabase with Prisma ORM. All tables are defined in `backend/prisma/schema.prisma`.

## Tables

### admin_users
Stores admin user accounts for the CMS dashboard.

**Fields:**
- `id` (UUID, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `passwordHash` (String) - bcrypt hashed password
- `role` (Enum: SUPERADMIN, STAFF)
- `isActive` (Boolean)
- `twoFactorEnabled` (Boolean)
- `twoFactorSecret` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### app_users
Stores mobile app user accounts.

**Fields:**
- `id` (UUID, Primary Key)
- `email` (String, Unique, Optional)
- `mobile` (String, Unique, Optional)
- `name` (String, Optional)
- `fcmToken` (String, Optional) - Firebase Cloud Messaging token
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### news
Stores news articles.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `content` (Text)
- `imageUrl` (String, Optional)
- `category` (String, Optional)
- `isPublished` (Boolean)
- `publishedAt` (DateTime, Optional)
- `views` (Int)
- `authorId` (UUID, Foreign Key -> admin_users)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `isPublished`, `publishedAt`

### events
Stores events.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `imageUrl` (String, Optional)
- `startDate` (DateTime)
- `endDate` (DateTime, Optional)
- `location` (String, Optional)
- `category` (String, Optional)
- `isPublished` (Boolean)
- `publishedAt` (DateTime, Optional)
- `views` (Int)
- `authorId` (UUID, Foreign Key -> admin_users)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `isPublished`, `startDate`

### circulars
Stores circulars/notices.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `content` (Text)
- `documentUrl` (String, Optional)
- `category` (String, Optional)
- `targetAudience` (String) - ALL, DEPARTMENT, STUDENT, STAFF
- `departmentId` (UUID, Optional, Foreign Key -> departments)
- `isPublished` (Boolean)
- `publishedAt` (DateTime, Optional)
- `views` (Int)
- `authorId` (UUID, Foreign Key -> admin_users)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `isPublished`, `publishedAt`

### departments
Stores department information.

**Fields:**
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `code` (String, Unique)
- `description` (Text, Optional)
- `imageUrl` (String, Optional)
- `headName` (String, Optional)
- `headEmail` (String, Optional)
- `headPhone` (String, Optional)
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `courses` (One-to-Many -> courses)
- `faculty` (One-to-Many -> faculty)
- `circulars` (One-to-Many -> circulars)

### courses
Stores course information.

**Fields:**
- `id` (UUID, Primary Key)
- `name` (String)
- `code` (String)
- `departmentId` (UUID, Foreign Key -> departments)
- `level` (Enum: UG, PG, PHD)
- `duration` (String, Optional)
- `description` (Text, Optional)
- `eligibility` (Text, Optional)
- `syllabusUrl` (String, Optional)
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Unique Constraint:**
- `code`, `departmentId`

### faculty
Stores faculty member information.

**Fields:**
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String, Optional)
- `designation` (String)
- `departmentId` (UUID, Foreign Key -> departments)
- `imageUrl` (String, Optional)
- `bio` (Text, Optional)
- `qualifications` (Text, Optional)
- `researchAreas` (Text, Optional)
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### gallery
Stores gallery items (images/videos).

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text, Optional)
- `type` (Enum: IMAGE, VIDEO)
- `imageUrl` (String, Optional)
- `videoUrl` (String, Optional)
- `albumId` (UUID, Optional, Foreign Key -> gallery_albums)
- `isPublished` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `albumId`, `isPublished`

### gallery_albums
Stores gallery albums.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text, Optional)
- `coverImageUrl` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `items` (One-to-Many -> gallery)

### placements
Stores placement company information.

**Fields:**
- `id` (UUID, Primary Key)
- `companyName` (String)
- `logoUrl` (String, Optional)
- `description` (Text, Optional)
- `website` (String, Optional)
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `stats` (One-to-Many -> placement_stats)

### placement_stats
Stores placement statistics.

**Fields:**
- `id` (UUID, Primary Key)
- `placementId` (UUID, Foreign Key -> placements)
- `year` (Int)
- `studentsPlaced` (Int)
- `averagePackage` (String, Optional)
- `highestPackage` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Unique Constraint:**
- `placementId`, `year`

### examinations
Stores examination information.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text, Optional)
- `examDate` (DateTime, Optional)
- `timetableUrl` (String, Optional)
- `hallTicketUrl` (String, Optional)
- `resultsUrl` (String, Optional)
- `departmentId` (UUID, Optional)
- `courseId` (UUID, Optional)
- `isPublished` (Boolean)
- `publishedAt` (DateTime, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `isPublished`, `examDate`

### notifications
Stores push notification records.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `body` (Text)
- `type` (Enum: NEWS, EVENT, CIRCULAR, EXAM, GENERAL)
- `targetAudience` (String) - ALL, DEPARTMENT, USER
- `departmentId` (UUID, Optional)
- `userId` (UUID, Optional)
- `data` (Text, Optional) - JSON data
- `isSent` (Boolean)
- `sentAt` (DateTime, Optional)
- `createdAt` (DateTime)
- `createdBy` (UUID, Foreign Key -> admin_users)

**Indexes:**
- `isSent`, `createdAt`

### banners
Stores homepage banners.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String)
- `imageUrl` (String)
- `linkUrl` (String, Optional)
- `order` (Int)
- `isActive` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- `isActive`, `order`

### app_settings
Stores application settings.

**Fields:**
- `id` (UUID, Primary Key)
- `key` (String, Unique)
- `value` (Text)
- `description` (String, Optional)
- `updatedAt` (DateTime)

## Row Level Security (RLS)

Supabase RLS policies should be configured for:
- Public read access to published content
- Admin write access to all content
- User-specific access to their own data

## Migrations

Run migrations using Prisma:

```bash
npx prisma migrate dev --name migration_name
npx prisma db push
```

