import { useEffect, useState } from "react";
import api from "../api/axios";
import socket from "../services/socket";
import Progress from "../components/Progress";
import "./Upload.css";

const Upload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [videoId, setVideoId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("video-progress", (data) => {
      if (data.videoId === videoId) {
        setProgress(data.progress);
        setStatus(data.status);
      }
    });

    return () => {
      socket.off("video-progress");
    };
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true);
      setProgress(0);
      setStatus("uploading");

      const res = await api.post("/api/videos/upload", formData);
      setVideoId(res.data.videoId);
    } catch (error) {
      alert("Upload failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Video</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {videoId && (
          <div className="progress-wrapper">
            <Progress progress={progress} status={status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
