import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showAadhaar, setShowAadhaar] = useState(false); // New state for toggle
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your profile.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (err) {
        localStorage.removeItem("token");
        setError("Session expired. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Plain Eye Icons (SVGs)
  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );

  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
  );

  // Updated Mask Function logic
  const renderAadhaar = (aadhaar) => {
    const strAadhaar = String(aadhaar || "");
    if (showAadhaar) return strAadhaar; // Show full number if toggled
    if (!strAadhaar || strAadhaar.length < 4) return "XXXX-XXXX-XXXX";
    return `XXXX-XXXX-${strAadhaar.slice(-4)}`;
  };

  /* ---------- ERROR STATE ---------- */
  if (error) {
    return (
      <div className="profile-status-container">
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  /* ---------- LOADING STATE ---------- */
  if (!profile) {
    return (
      <div className="profile-status-container">
        <div className="loader"></div>
        <p className="loading-text">Fetching your details…</p>
      </div>
    );
  }

  /* ---------- SUCCESS STATE ---------- */
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-circle">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>User Profile</h2>
        </div>

        <div className="profile-card">
          <div className="detail-row">
            <label>Full Name</label>
            <p>{profile.name || "N/A"}</p>
          </div>

          <div className="detail-row">
            <label>Email Address</label>
            <p>{profile.email || "N/A"}</p>
          </div>

          <div className="detail-row">
            <label>Aadhaar Number</label>
            <div className="aadhaar-wrapper">
              <p className="aadhaar-text">
                {renderAadhaar(profile.aadhaar)}
              </p>
              <button 
                type="button" 
                className="aadhaar-toggle" 
                onClick={() => setShowAadhaar(!showAadhaar)}
                aria-label="Toggle Aadhaar visibility"
              >
                {showAadhaar ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;