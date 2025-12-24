import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    aadhaar: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // States for toggling visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false); // Added for Aadhaar

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhaar") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 12);
      setFormData({ ...formData, aadhaar: digitsOnly });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);
      setMessage("Registration successful. You can now log in.");
      setFormData({ name: "", email: "", password: "", aadhaar: "" });
    } catch (err) {
      const errMsg = err.message.toLowerCase();
      if (errMsg.includes("already")) {
        setShowPopup(true);
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Plain SVG Eye Icons
  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );

  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
  );

  return (
    <div className="auth-wrapper">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Fill in the details to register</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="field-container">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Aadhaar Number</label>
            <div className="field-container">
              <input
                name="aadhaar"
                type={showAadhaar ? "text" : "password"}
                placeholder="•••• •••• ••••"
                value={formData.aadhaar}
                onChange={handleChange}
                inputMode="numeric"
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowAadhaar(!showAadhaar)}
                aria-label="Toggle Aadhaar visibility"
              >
                {showAadhaar ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
            <small className="hint">
              Aadhaar is securely encrypted and never stored in plain text
            </small>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button className="login-secondary-btn" onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>

        {message && <div className="feedback success">{message}</div>}
        {error && <div className="feedback error">{error}</div>}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Already Registered</h3>
            <p>This email is already registered. Please log in instead.</p>
            <div className="popup-actions">
              <button className="popup-btn" onClick={() => navigate("/login")}>Go to Login</button>
              <button className="popup-close" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;