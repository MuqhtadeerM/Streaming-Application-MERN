import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h3 className="logo">VideoApp</h3>

      <div className="nav-links">
        <Link to="/upload">Upload</Link>
        <Link to="/player">Player</Link>
        <Link to="/videos">Videos</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
