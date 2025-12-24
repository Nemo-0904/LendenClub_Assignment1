import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // This listens for URL changes
  const [token, setToken] = useState(localStorage.getItem("token"));

  // This effect runs every time the URL changes
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Clear state immediately
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          SecureProfile
        </Link>
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="nav-btn logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;