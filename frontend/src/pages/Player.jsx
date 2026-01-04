import { useState } from "react";

const Player = () => {
  const [videoId, setVideoId] = useState("");

  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Video Player</h2>

      <input
        type="text"
        placeholder="Enter Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />

      <br />
      <br />

      {videoId && (
        <video
          width="600"
          controls
          src={`http://localhost:5000/api/stream/${videoId}?token=${token}`}
        />
      )}
    </div>
  );
};

export default Player;
