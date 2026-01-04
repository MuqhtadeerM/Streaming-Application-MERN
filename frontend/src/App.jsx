import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Player from "./pages/player/Player";
import VideoList from "./pages/videolist/VideoList";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/upload" element={<Upload />} />
            <Route path="/player" element={<Player />} />
            <Route path="*" element={<Navigate to="/upload" />} />
            <Route path="/videos" element={<VideoList />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
