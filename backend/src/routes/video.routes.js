import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  allowRoles("admin", "editor"),
  upload, // This tells multer to process ALL fields
  uploadVideo
);

export default router;
