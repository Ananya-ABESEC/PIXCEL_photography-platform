# 📸 Photography Platform

Inspired by GitHub's approach to organization and versioning, but designed for photographers.

The platform allows photographers to preserve their original photographs, organize them into collections, and selectively share their work with a photography community.

## 💡 Idea

Photographers often have large collections of photographs that they want to preserve while only sharing selected work publicly.

This platform provides a single place to:

- Upload and preserve original photographs
- Organize photographs into collections
- Keep collections private or make them public
- Share photographs with a photography community
- Like and comment on photographs
- Follow other photographers
- Maintain photographer profiles
- Preserve the original uploaded file separately from display copies

The concept is inspired by GitHub's organization and versioning philosophy, but designed for photographers instead of developers.

## ✨ Planned Features

### 👤 Photographer Profiles
- [x] User registration and login
- [x] Photographer username
- [x] View photographer profile
- [x] Update profile
- [ ] Profile photo
- [x] Bio
- [ ] Follow photographers

### 📁 Collections
- [x] Create collections
- [x] Add photographs to collections
- [x] Public/private visibility
- [ ] Organize work by theme, location, event, or project
- [x] View photographer's collections
- [x] Update and delete collections

### 📸 Photography
- [x] Add photographs to collections through the Photo API
- [ ] Upload photograph files from the frontend
- [ ] Preserve original files in cloud storage
- [ ] Generate separate display copies
- [x] Public/private visibility
- [x] Photo descriptions and titles

### ❤️ Community
- Like photographs
- Comment on photographs
- Follow photographers
- Discover public photography

### 🔐 Privacy
- [ ] Private collections
- [ ] Private photographs
- [ ] Original files remain protected
- [ ] Display copies can be used for public viewing

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- bcrypt
- JSON Web Token (JWT)

## 🗄️ Database

The project currently uses PostgreSQL for storing application data.

The database schema is currently under development and will be expanded as new features are implemented.

### Current Tables

- Users
- Collections
- Photos
- Likes
- Comments
- Follows

More tables and relationships will be added as the platform develops.

## 🔐 Authentication

The backend currently supports secure user authentication using:

- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication
- Protected API routes
- User-specific collection access
- User-specific profile access

### Planned
- [ ] Role-based authorization
- [ ] Persistent login handling
- [ ] Protected access to private resources

## ☁️ Planned Services
- Cloudinary / Cloud storage for photographs
- Vercel for frontend deployment
- Render for backend deployment

## 🗄️ Database Structure

Initial database structure:

```text
users
  │
  ├── collections
  │       │
  │       └── photos
  │              ├── likes
  │              └── comments
  │
  └── follows
```

## 🚧 Project Status

This project is currently under active development.

### Completed
- [x] React + Vite frontend setup
- [x] Node.js + Express backend setup
- [x] PostgreSQL setup
- [x] Database connection
- [x] Initial database schema
- [x] User registration API
- [x] Password hashing with bcrypt
- [x] User login API
- [x] Password verification
- [x] JWT authentication
- [x] JWT protected routes
- [x] Collection creation API
- [x] View collections API
- [x] Update collection API
- [x] Delete collection API
- [x] View photographer profile API
- [x] Update photographer profile API
- [x] Collection details API
- [x] Collection details frontend
- [x] Photo creation API
- [x] Photo upload form
- [x] Display photos inside collections

### Upcoming
- [ ] Profile photo upload
- [ ] Organize work by theme, location, event, or project
- [ ] Real photograph file upload
- [ ] Cloud photo storage
- [ ] Preserve original files separately
- [ ] Generate separate display copies
- [ ] Public/private photo access
- [ ] Public photography feed
- [ ] Likes & comments API
- [ ] Follow system
- [ ] Search & discovery
- [ ] Photo bookmarking
- [ ] Photo version history
