# API Documentation

Base URL: `http://localhost:3000` (development) or your production URL

## Authentication

### Admin Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}

Response:
{
  "admin": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@kanchiuniv.ac.in",
    "role": "SUPERADMIN"
  },
  "token": "jwt_token"
}
```

### Verify OTP (Mobile App)
```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "mobile": "+919876543210",
  "otp": "123456",
  "fcmToken": "fcm_token_here"
}

Response:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "mobile": "+919876543210",
    "name": "User Name"
  },
  "token": "jwt_token"
}
```

## News

### Get News List
```
GET /api/news?page=1&limit=10&search=query&category=category&published=true

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Get News Detail
```
GET /api/news/:id

Response: News object
```

### Create News (Admin)
```
POST /api/news
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "News Title",
  "content": "News content...",
  "imageUrl": "https://...",
  "category": "General",
  "isPublished": true
}
```

### Update News (Admin)
```
PUT /api/news/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "isPublished": true
}
```

### Delete News (Admin)
```
DELETE /api/news/:id
Authorization: Bearer {token}
```

## Events

### Get Events List
```
GET /api/events?page=1&limit=10&upcoming=true&published=true

Response:
{
  "data": [...],
  "pagination": {...}
}
```

### Get Event Detail
```
GET /api/events/:id
```

### Create Event (Admin)
```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Event Title",
  "description": "Event description...",
  "startDate": "2024-01-01T10:00:00Z",
  "endDate": "2024-01-01T18:00:00Z",
  "location": "Main Hall",
  "category": "Academic",
  "isPublished": true
}
```

## Departments

### Get Departments List
```
GET /api/departments?active=true

Response:
{
  "data": [...]
}
```

### Get Department Detail
```
GET /api/departments/:id

Response: Department with courses and faculty
```

### Create Department (Admin)
```
POST /api/departments
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Computer Science",
  "code": "CS",
  "description": "Department description...",
  "headName": "Dr. John Doe",
  "headEmail": "head@kanchiuniv.ac.in"
}
```

## Courses

### Get Courses List
```
GET /api/courses?departmentId=uuid&level=UG&active=true

Response:
{
  "data": [...]
}
```

### Create Course (Admin)
```
POST /api/courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Bachelor of Computer Science",
  "code": "BCS",
  "departmentId": "uuid",
  "level": "UG",
  "duration": "3 years",
  "description": "Course description...",
  "eligibility": "12th pass"
}
```

## Faculty

### Get Faculty List
```
GET /api/faculty?departmentId=uuid&active=true

Response:
{
  "data": [...]
}
```

### Create Faculty (Admin)
```
POST /api/faculty
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Dr. Jane Smith",
  "email": "jane@kanchiuniv.ac.in",
  "phone": "+919876543210",
  "designation": "Professor",
  "departmentId": "uuid",
  "bio": "Faculty bio...",
  "qualifications": "Ph.D. in Computer Science"
}
```

## Gallery

### Get Gallery Items
```
GET /api/gallery?page=1&limit=20&albumId=uuid&type=IMAGE&published=true

Response:
{
  "data": [...],
  "pagination": {...}
}
```

### Create Gallery Item (Admin)
```
POST /api/gallery
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Gallery Item",
  "description": "Description...",
  "type": "IMAGE",
  "imageUrl": "https://...",
  "albumId": "uuid",
  "isPublished": true
}
```

## Placements

### Get Placements List
```
GET /api/placements?active=true

Response:
{
  "data": [...]
}
```

### Create Placement (Admin)
```
POST /api/placements
Authorization: Bearer {token}
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "logoUrl": "https://...",
  "description": "Company description...",
  "website": "https://techcorp.com"
}
```

## Examinations

### Get Examinations List
```
GET /api/exams?upcoming=true&published=true

Response:
{
  "data": [...]
}
```

### Create Examination (Admin)
```
POST /api/exams
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Mid-term Examination",
  "description": "Exam description...",
  "examDate": "2024-02-01T09:00:00Z",
  "timetableUrl": "https://...",
  "hallTicketUrl": "https://...",
  "resultsUrl": "https://...",
  "isPublished": true
}
```

## Circulars

### Get Circulars List
```
GET /api/circulars?page=1&limit=10&published=true

Response:
{
  "data": [...],
  "pagination": {...}
}
```

### Create Circular (Admin)
```
POST /api/circulars
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Circular Title",
  "content": "Circular content...",
  "documentUrl": "https://...",
  "category": "Academic",
  "targetAudience": "ALL",
  "departmentId": "uuid",
  "isPublished": true
}
```

## Notifications

### Get Notifications List
```
GET /api/notifications?page=1&limit=20

Response:
{
  "data": [...]
}
```

### Send Notification (Admin)
```
POST /api/notifications
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Notification Title",
  "body": "Notification body...",
  "type": "GENERAL",
  "targetAudience": "ALL",
  "departmentId": "uuid",
  "userId": "uuid",
  "data": {
    "key": "value"
  }
}
```

## Homepage

### Get Homepage Data
```
GET /api/homepage

Response:
{
  "banners": [...],
  "latestNews": [...],
  "upcomingEvents": [...],
  "quickLinks": [...]
}
```

## File Upload

### Upload File (Admin)
```
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: File
- folder: string (optional, default: "uploads")

Response:
{
  "url": "https://...",
  "path": "uploads/filename.jpg"
}
```

## Swagger Documentation

Access interactive API documentation at:
```
GET /api/swagger
```

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

