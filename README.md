# Streaming Application (MERN)

A full‑stack streaming application built with the MERN stack (MongoDB, Express, React, Node). This repository contains a backend API (Node/Express + MongoDB) and a frontend (React) to upload, manage, and stream video content.

> Note: This README is an improved, consolidated guide. For exact API routes and front-end behaviors, check the files under `backend/src/routes` and the `frontend` directory.

## Features
- User authentication (register / login / protected routes)
- Role-based middleware (admin / user)
- Video upload and storage (local `uploads` directory)
- Video streaming / serving endpoints
- Simple administration endpoints for managing videos/streams

## Tech stack
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Frontend: React (create-react-app or similar)
- Authentication: JWT
- File uploads: multer (uploads stored under `backend/uploads`)

## Repository structure (found in the repo)
The repository root contains two main folders: `backend` and `frontend`. Below is the structure discovered:

```
.
├── .gitignore
├── README.md
├── backend
│   ├── .env
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── stream.controller.js
│   │   │   └── video.controller.js
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   └── upload.middleware.js
│   │   ├── models
│   │   │   ├── user.model.js
│   │   │   └── video.model.js
│   │   ├── routes/           (routes directory - check exact files here)
│   │   └── services/         (services directory - check exact files here)
│   └── uploads/              (uploaded video files)
└── frontend
    └── (React app files - inspect this folder for package.json, src/, public/, etc.)
```

If you want, I can produce a more detailed tree by listing the contents of `backend/src/routes` and the `frontend` directory.

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)
- (Optional) ffmpeg or other video processing tools if you add transcoding

## Environment variables
The backend includes a `.env` file (present in `backend/.env`). Typical variables you should set (example):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/streaming-app
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

Check `backend/src/config/env.js` and `backend/.env` to confirm the exact names used by the app.

## Backend — run locally
1. Open a terminal and go to the backend:
   - cd backend
2. Install dependencies:
   - npm install
3. Configure environment:
   - Create or update `.env` (or use the provided one, but do NOT commit secrets).
4. Start the server:
   - npm start
   - or for development (if using nodemon): npm run dev
5. The server typically runs at http://localhost:PORT (see `.env` / `server.js` for exact port).

API routes live in `backend/src/routes`; controllers are in `backend/src/controllers`. Check `app.js` for middlewares and route wiring.

Uploaded files are stored in `backend/uploads` — ensure the directory exists and is writable.

## Frontend — run locally
1. Open a terminal and go to the frontend:
   - cd frontend
2. Install dependencies:
   - npm install
3. Start the dev server:
   - npm start
4. The front-end typically runs at http://localhost:3000 and communicates with the backend (set the API base URL in your frontend config/environment).

If you want to run both servers concurrently, use two terminals or a tool like `concurrently` in the root (not currently included).

## Helpful pointers / where to look for key logic
- Authentication logic: `backend/src/controllers/auth.controller.js` and `backend/src/middlewares/auth.middleware.js`
- Video upload logic: `backend/src/controllers/video.controller.js` and `backend/src/middlewares/upload.middleware.js`
- Video streaming / stream endpoints: `backend/src/controllers/stream.controller.js`
- DB connection: `backend/src/config/db.js`
- Models: `backend/src/models/*.js`
- Routes: `backend/src/routes` (exposes endpoints wired to controllers)

## Common commands (suggested)
- Backend
  - npm install
  - npm start
  - npm run dev (if configured)
- Frontend
  - npm install
  - npm start
- Tests (if added in future)
  - npm test

## Contributing
- Fork the repository
- Create a feature branch
- Make clear commits
- Open a pull request describing your changes

## License & contact
- Add a LICENSE file if you want a specific license.
- For questions / contact: @MuqhtadeerM on GitHub.

---

If you’d like, I can:
- Produce a ready-to-use `.env.example`.
- Create a more detailed README section that documents every API endpoint (I can infer them from `backend/src/routes` files).
- Create a CONTRIBUTING.md or LICENSE file.
