import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import streamRoutes from "./routes/stream.routes.js";
const app = express();

// middleware
app.use(cors());

// video routes BEFORE express.json()
// This allows multer to handle multipart/form-data properly
app.use("/api/videos", videoRoutes);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("api/stream", streamRoutes);

// health check whether it is running or not
app.get("/", (req, res) => {
  res.send("video processing API Running...");
});

export default app;
