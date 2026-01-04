import { useEffect, useState } from "react";
import api from "../api/axios";
import socket from "../services/socket";
import Progress from "../components/Progress";

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <br />

        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {videoId && <Progress progress={progress} status={status} />}
    </div>
  );
};

export default Upload;
