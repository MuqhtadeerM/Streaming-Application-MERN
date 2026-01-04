import fs from "fs";
import path from "path";
import Video from "../models/video.model.js";

export const streamVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find video in DB
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Tenant isolation (SECURITY)
    if (video.tenantId !== req.user.tenantId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const videoPath = path.resolve(video.filePath);
    const videoSize = fs.statSync(videoPath).size;

    const range = req.headers.range;
    if (!range) {
      return res.status(400).json({ message: "Range header required" });
    }

    // Parse Range
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    // Headers
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": video.mimeType,
    };

    res.writeHead(206, headers);

    // Stream chunk
    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).json({ message: "Video streaming failed" });
  }
};
