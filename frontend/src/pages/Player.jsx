import { useSearchParams } from "react-router-dom";
import "./Player.css";

const Player = () => {
  const [params] = useSearchParams();
  const videoId = params.get("id");
  const token = localStorage.getItem("token");

  if (!videoId) return <p>No video selected</p>;

  return (
    <div className="player-container">
      <div className="player-card">
        <h2>Video Player</h2>

        <div className="player-video">
          <video
            controls
            src={`http://localhost:5000/api/stream/${videoId}?token=${token}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
