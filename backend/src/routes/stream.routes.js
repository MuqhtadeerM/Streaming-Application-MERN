import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { streamVideo } from "../controllers/stream.controller.js";

const router = express.Router();

// secure streaming endpoint
router.get("/:videoId", authMiddleware, streamVideo);

export default router;
