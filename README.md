# Streaming-Application-FullStack

🎥 Streaming-Application-FullStack — A MERN video upload, processing, and streaming platform

A full-stack application that lets users upload videos, receive real-time processing updates, and stream videos using HTTP Range requests. Built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend. Features JWT authentication, role-based access control (Admin / Editor / Viewer), background processing with Socket.io updates, and secure, seekable video streaming.

---

## Table of Contents

- [Highlights](#highlights)
- [Features](#features)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Environment variables](#environment-variables)
- [Quick start (local)](#quick-start-local)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker (backend)](#docker-backend)
- [API (overview)](#api-overview)
- [Video flow & streaming details](#video-flow--streaming-details)
- [Realtime processing (Socket.io)](#realtime-processing-socketio)
- [Security considerations](#security-considerations)
- [Future improvements](#future-improvements)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Highlights

- JWT auth with persistent login
- Role-based access control (Admin / Editor / Viewer)
- Multipart video uploads with file-size/type validation
- Background (mock) video processing with progress updates via Socket.io
- HTTP Range-based streaming for fast playback & seeking (206 Partial Content)
- Docker-ready backend, MongoDB Atlas ready for production

---

## Features

- Register & login users (JWT)
- Role-based permissions for managing and viewing videos
- Secure upload endpoint with server-side validation
- Local storage for uploaded files + MongoDB for metadata
- Processing state tracking and real-time progress events
- Stream large files efficiently with byte-range support
- React frontend with protected routes and persistent auth

---

## Architecture

Frontend (React + Vite)
  ↕ REST API (JWT auth)
Backend (Node.js + Express)
  ├─ MongoDB (metadata, users)
  ├─ File storage (local `uploads/`)
  └─ Socket.io (processing progress)

---

## Project structure

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

## Requirements

- Node.js v16+ (or later)
- npm or yarn
- MongoDB Atlas account (or a local MongoDB instance)
- Docker (optional)

---

## Environment variables

Create a `.env` file in `backend/`:

PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
MAX_UPLOAD_SIZE=500MB (optional/custom)
NODE_ENV=development

Add any service-specific variables as needed (e.g., socket settings, file size limits).

---

## Quick start (local)

### Backend

1. cd backend
2. npm install
3. Create `.env` (see above)
4. npm run dev

By default the backend runs at: http://localhost:5000

### Frontend

1. cd frontend
2. npm install
3. npm run dev

Frontend default: http://localhost:5173

### Docker (backend)

Build and run backend in Docker (example):

```bash
# build (from repo root)
docker build -t video-backend ./backend

# run
docker run -p 5000:5000 --env-file ./backend/.env -v $(pwd)/backend/uploads:/app/uploads video-backend
```

---

## API (overview)

All protected endpoints require `Authorization: Bearer <token>` header.

- POST /api/auth/register — Register a new user
- POST /api/auth/login — Login and receive JWT
- POST /api/videos/upload — Upload a video file (multipart/form-data)
- GET /api/videos — List videos (user-specific or all, based on role)
- GET /api/videos/:id — Get video metadata
- GET /api/stream/:videoId — Stream video (supports Range requests)

Example upload (curl):
```bash
curl -X POST "http://localhost:5000/api/videos/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/video.mp4" \
  -F "title=My video"
```

---

## Video flow & streaming details

Upload flow:
1. Client uploads multipart video to `/api/videos/upload`.
2. Server saves file to `backend/uploads/` and creates a DB record.
3. A background service performs mock video processing (e.g., sensitivity check).
4. Processing status and progress are emitted via Socket.io.
5. When processing finishes, the video is marked available for streaming.

Streaming:
- The stream endpoint supports HTTP Range headers so browsers/media players can request partial content.
- With a `Range` header, the server responds with `206 Partial Content` and appropriate `Content-Range`, `Accept-Ranges`, and `Content-Length` headers.
- Ensure the stream endpoint validates JWT and checks user permissions before serving the file.

---

## Realtime processing (Socket.io)

- Server emits events for processing progress and completion.
- Typical events:
  - `processing:progress` — { videoId, progress } (progress 0–100)
  - `processing:complete` — { videoId, metadata }
  - `processing:error` — { videoId, error }

Client typically connects after login and joins relevant rooms for updates.

---

## Security considerations

- Validate file type and size server-side to prevent abuse.
- Protect streaming and upload endpoints with JWT & role checks.
- Sanitize filenames or use unique names/IDs to avoid collisions and path traversal.
- Consider rate limiting on critical endpoints and virus/malware scanning for uploads.
- For production, prefer object storage (S3/GCS) and a CDN for scalable streaming.

---

## Future improvements

- Move uploaded files to cloud storage (AWS S3 / GCP)
- Generate thumbnails / poster images for videos
- Add refresh tokens & token revocation flows
- AI content moderation / automated captions
- Pagination, search, and filters for video lists
- Admin dashboard and usage analytics
- End-to-end tests, CI/CD pipeline, and monitoring
- Serve video through CDN for high availability

---

## Contributing

Contributions, issues, and feature requests are welcome. Please open an issue describing the change or enhancement first. For code contributions, fork the repo, create a feature branch, and open a pull request.

Suggested workflow:
1. Fork the repo
2. Create a feature branch: git checkout -b feat/your-feature
3. Commit changes and push
4. Open a Pull Request with a clear description

---

## Author

Muhammed Muqhtadeer  
Full Stack Developer | MERN Stack | Backend & Systems Enthusiast  
GitHub: [MuqhtadeerM](https://github.com/MuqhtadeerM)

---

## License

MIT — see LICENSE file for details.
