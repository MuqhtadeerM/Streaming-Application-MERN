import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { getVideos, uploadVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  allowRoles("admin", "editor"),
  upload, // This tells multer to process ALL fields
  uploadVideo
);

router.get("/", authMiddleware, getVideos);

export default router;
