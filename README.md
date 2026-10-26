# 📸 Pixcel — Photography Platform

Inspired by GitHub's approach to organization and versioning, but designed for photographers.

Pixcel is a photography platform in development where photographers can organize their work into collections, manage their profiles, and selectively share photographs with a community while keeping original files protected.

## 💡 Project Idea

Photographers often have large collections of photographs that they want to preserve, organize, and share selectively.

Pixcel aims to provide a single platform to:

- Upload and organize photographs into collections.
- Manage photographer profiles.
- Choose between public and private collections and photographs.
- Preserve original photographs separately from display copies.
- Share selected work with a photography community.
- Interact with other photographers through likes, comments, and follows.
- Explore and discover photography from other creators.

The project takes inspiration from GitHub's organization and versioning philosophy, adapting it to photography workflows.

## ✨ Features and Progress

### 👤 Photographer Profiles

- [x] User registration and login APIs
- [x] Password hashing using bcrypt
- [x] JWT-based authentication
- [x] View photographer profile
- [x] Update photographer profile
- [x] Photographer username and bio
- [ ] Profile photo upload
- [ ] Follow photographers

### 📁 Collections

- [x] Create collections
- [x] View photographer's collections
- [x] View collection details
- [x] Update collections
- [x] Delete collections
- [x] Public/private visibility setting
- [x] Frontend collection management
- [ ] Filter and organize work by theme, location, event, or project

### 📸 Photography

- [x] Photo creation API
- [x] Photo upload form in the frontend
- [x] Add photographs to collections through the API
- [x] Display photographs inside collections
- [x] Photo titles and descriptions
- [x] Photo visibility metadata
- [ ] Complete and verify real photograph file uploads
- [ ] Cloudinary integration for photograph storage
- [ ] Preserve original files separately from display copies
- [ ] Generate optimized display copies
- [ ] Enforce public/private access for photographs

### ❤️ Community

- [ ] Public photography feed
- [ ] Like photographs
- [ ] Comment on photographs
- [ ] Follow photographers
- [ ] Search and discover photography
- [ ] Bookmark photographs

### 🔐 Privacy and Versioning

- [ ] Enforce private collection access
- [ ] Enforce private photograph access
- [ ] Protect original files from unauthorized access
- [ ] Separate original files from public display copies
- [ ] Photo version history

## 🛠️ Technology Stack

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
- Cloudinary integration (being developed)

### Database

- PostgreSQL

### Planned Deployment

- Vercel — frontend
- Render — backend

## 🗄️ Database Structure

The application uses PostgreSQL to store application data.

The planned relationships between the main entities are:

```text
users
  |
  |--- collections
  |       |
  |       |--- photos
  |              |--- likes
  |              |--- comments
  |
  |--- follows
```

The database schema will continue to evolve as additional features are implemented.

## 🔐 Authentication and Authorization

The backend includes:

- Password hashing with bcrypt.
- User login and registration endpoints.
- JWT generation and verification.
- Protected API routes.
- User-specific collection access.
- Photographer profile endpoints.

Further work is needed to verify and complete authorization across all private resources, including photographs and original files.

## ☁️ Photograph Storage

Cloudinary is being integrated to support cloud-based photograph storage.

The intended workflow is to preserve the uploaded original separately and use a distinct display copy when photographs are shared publicly.

Access control, original-file protection, and display-copy generation remain part of the development roadmap.

## 🚧 Current Project Status

**Pixcel is under active development.**

The core application structure, authentication APIs, collection management, photographer profile APIs, and initial photography workflows have been implemented.

The frontend is functional in parts but is still being developed. The current focus is on completing core functionality before spending more time on UI styling.

### Completed

- [x] React + Vite frontend setup
- [x] Node.js + Express backend setup
- [x] PostgreSQL database connection
- [x] Initial database schema
- [x] User registration and login APIs
- [x] Password hashing and verification
- [x] JWT authentication and protected routes
- [x] Collection creation, retrieval, updating, and deletion APIs
- [x] Photographer profile retrieval and update APIs
- [x] Collection details frontend
- [x] Photo creation API
- [x] Photo upload form
- [x] Display photographs inside collections
- [x] Initial Cloudinary connection setup

### Next Steps

- [ ] Verify end-to-end photograph file uploads
- [ ] Complete cloud storage integration
- [ ] Protect original photograph files
- [ ] Implement and verify public/private access controls
- [ ] Complete remaining frontend functionality
- [ ] Add profile photo upload
- [ ] Build the public photography feed
- [ ] Implement likes and comments
- [ ] Implement the follow system
- [ ] Add search, discovery, and bookmarking
- [ ] Explore photo version history
- [ ] Deploy the application

## 🎯 Project Goal

The goal of Pixcel is to create a photography-focused platform that combines organized collections, secure file preservation, selective sharing, and community interaction in one place.

More features will be added incrementally as development continues.
