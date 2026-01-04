# Streaming-Application-FullStack

🎥 Video Processing & Streaming Platform (MERN Stack)

A full-stack video upload, processing, and streaming platform built with the MERN stack. It includes secure JWT authentication, role-based access control, multipart uploads, background processing with real-time progress via Socket.io, and HTTP Range-based video streaming for smooth playback and seeking.

---

## Table of contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Prerequisites](#prerequisites)
- [How to run (local)](#how-to-run-local)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker (backend)](#docker-backend)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Video Upload & Processing Flow](#video-upload--processing-flow)
- [Video Streaming (HTTP Range Requests)](#video-streaming-http-range-requests)
- [Realtime Progress (Socket.io)](#realtime-progress-socketio)
- [Future enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)

---

## Features

- JWT Authentication (register / login)
- Role-based access control: Admin / Editor / Viewer
- Multipart/form-data video uploads with file-size validation
- Background video processing (mock sensitivity analysis)
- Real-time processing updates via Socket.io
- HTTP Range-based secure streaming (206 Partial Content) for seeking and efficient playback
- Modern React frontend (Vite) with protected routes and persistent login
- Docker-ready backend
- MongoDB Atlas integration for metadata persistence

---

## System Architecture

Frontend (React + Vite)
  ↕ REST API + JWT
Backend (Node.js + Express)
  ├─ MongoDB (video metadata, users)
  ├─ Local file storage (uploaded videos)
  └─ Socket.io (processing progress)

---

## Tech Stack

Frontend
- React (Vite)
- React Router
- Axios
- Socket.io Client
- CSS (modular page-level styling)

Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io
- express-fileupload (or equivalent)
- HTTP Range streaming implementation

DevOps / Infra
- Docker
- dotenv
- MongoDB Atlas

---

## Project Structure

Streaming-Application-FullStack/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── services/
│   │   └── config/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── services/
│   └── main.jsx
│
└── README.md

---

## Environment Variables

Create a `.env` file inside `backend/` with the following keys:

PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

(Any other service-specific variables should be included as needed — e.g., socket config, file size limits.)

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas (or local MongoDB)
- Docker (optional, for containerized backend)

---

## How to run (local)

### Backend

1. Open terminal
2. cd backend
3. npm install
4. Create `.env` (see [Environment Variables](#environment-variables))
5. npm run dev

By default the backend runs on:
http://localhost:5000

### Frontend

1. Open another terminal
2. cd frontend
3. npm install
4. npm run dev

Frontend default:
http://localhost:5173

### Docker (backend)

A Dockerfile is included (backend). Example commands:

```bash
# build
docker build -t video-backend ./backend

# run
docker run -p 5000:5000 --env-file ./backend/.env -v ./backend/uploads:/app/uploads video-backend
```

---

## API Endpoints (sample)

Method | Endpoint | Description
--- | --- | ---
POST | /api/auth/register | Register user
POST | /api/auth/login | Login user
POST | /api/videos/upload | Upload video (multipart/form-data)
GET | /api/videos | Get user's videos (or all depending on role)
GET | /api/stream/:videoId | Stream video (supports Range requests)
GET | /api/videos/:id | Get video metadata

Notes:
- Protected endpoints require Authorization header: `Authorization: Bearer <token>`
- Upload endpoint expects `file` field (or whatever the frontend uses) and will validate size/type.

---

## Authentication & Authorization

- JWT-based authentication. Tokens returned on login and stored client-side (localStorage) for persistence.
- Role-based access control distinguishes Admin, Editor, and Viewer capabilities:
  - Admin: manage users, reasonable elevated permissions
  - Editor: upload and manage videos
  - Viewer: view and stream videos

Consider adding refresh tokens for long-lived sessions in future.

---

## Video Upload & Processing Flow

1. User uploads video file (multipart) via `/api/videos/upload`.
2. Backend saves the file to `backend/uploads/` and creates metadata in MongoDB.
3. Background processing service performs mock analysis (e.g. sensitivity scan) and updates processing state.
4. Progress updates are emitted via Socket.io to authenticated clients.
5. Once processing completes, video is available for streaming and listing.

---

## Video Streaming (HTTP Range Requests)

Streaming endpoint supports `Range` headers. Example request:

```http
GET /api/stream/<videoId>
Range: bytes=0-
Authorization: Bearer <token>
```

Server responds with:
- 206 Partial Content when Range is present and valid
- Correct `Content-Range`, `Accept-Ranges`, `Content-Length`, and `Content-Type` headers
This enables fast startup, seeking, and efficient handling of large files.

---

## Realtime Progress (Socket.io)

- Socket.io is used to send processing progress messages (percentage, status, errors) to connected clients.
- The frontend subscribes after authentication, and displays live upload/processing progress.

Example socket events:
- server -> client: `processing:progress` { videoId, progress }
- server -> client: `processing:complete` { videoId, metadata }
- client -> server: `join:video` { videoId } (optional, for room-based updates)

---

## Future enhancements

- Cloud storage (AWS S3 / GCP) for uploaded videos
- Video thumbnails & poster frames
- Real AI-based video analysis (content moderation, captions)
- Pagination, search, and filtering of videos
- Refresh tokens and better session management
- Admin dashboard with usage/analytics
- CDN integration for global streaming performance
- Unit / integration tests & CI pipelines

---

## Author

Muhammed Muqhtadeer  
Full Stack Developer | MERN Stack | Backend & Systems Enthusiast  
GitHub: [MuqhtadeerM](https://github.com/MuqhtadeerM)

---

## License

MIT License — see LICENSE file for details.

---

If you'd like, I can:
- generate this README in the repository (create the file),
- or produce smaller README variants (e.g., short README for GitHub frontpage),
- or add example client code (React upload and streaming usage). Which would you like next?
