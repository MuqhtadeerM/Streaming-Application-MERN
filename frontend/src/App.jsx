import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Player from "./pages/Player";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Video Processing Frontend</h1>

      {user ? (
        <>
          <button onClick={logout}>Logout</button>
          <Upload />
          <hr />
          <Player />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
