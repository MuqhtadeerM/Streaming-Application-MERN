import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/api/videos");
        setVideos(res.data);
      } catch {
        alert("Failed to load videos");
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-list-container">
      <h2>Your Videos</h2>

      {videos.length === 0 && <p>No videos uploaded</p>}

      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video._id}
            className="video-card"
            onClick={() => navigate(`/player?id=${video._id}`)}
          >
            <h4>{video.title}</h4>
            <p>Status: {video.status}</p>
            <p>Sensitivity: {video.sensitivity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
