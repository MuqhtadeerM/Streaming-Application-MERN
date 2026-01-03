import Video from "../models/video.model.js";
import path from "path";
import fs from "fs";

export const uploadVideo = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    if (!req.files) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Handle potential whitespace in field names
    const videoFile =
      req.files.video || req.files["video "] || Object.values(req.files)[0];

    if (!videoFile) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Trim whitespace from body fields
    const title = req.body?.title?.trim();
    const description = req.body?.description?.trim();

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Validate video type
    const allowedTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];
    if (!allowedTypes.includes(videoFile.mimetype)) {
      return res.status(400).json({ message: "Only video files are allowed" });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueName = `${Date.now()}-${videoFile.name}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Move file to uploads folder
    await videoFile.mv(filePath);

    // Create video document
    const video = await Video.create({
      title,
      description: description || "",
      filename: uniqueName,
      filePath: filePath,
      mimeType: videoFile.mimetype,
      size: videoFile.size,
      status: "uploaded",
      sensitivity: "unknown",
      uploadedBy: req.user.userId,
      tenantId: req.user.tenantId,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      videoId: video._id,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: "Video upload failed",
      error: error.message,
    });
  }
};
