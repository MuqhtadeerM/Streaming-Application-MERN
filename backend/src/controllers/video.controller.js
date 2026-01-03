import Video from "../models/video.model";
// upload video
export const uploadVideo = async (req, res) => {
  try {
    // exnsure file exists
    if (!req.file) {
      return res.status(400).json({ message: "No Video file uploaded" });
    }

    // create video document
    const video = await Video.create({
      title,
      description,
      filename: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      status: "uploaded",
      sensitivity: "unknown",
      uploadedBy: req.user.userId,
      tenantId: req.user.tenantId,
    });

    res.status(201).json({
      message: "video uploaded succssfully",
      videoId: video._id,
    });
  } catch (error) {
    console.error("Upload Error", error);
    res.status(500).join({ message: "video upload failed" });
  }
};
