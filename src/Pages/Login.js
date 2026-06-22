import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loginsec from "./Loginsec";
import Footer from "./Footer";
import "../CSS/Login.css";

const SERVICES = [
  { icon: "✈", label: "Flight" },
  { icon: "🏨", label: "Hotel" },
  { icon: "🚌", label: "Bus" },
  { icon: "🏖", label: "Holiday" },
  { icon: "📄", label: "Visa" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LOGIN_API = process.env.REACT_APP_API_LOGIN;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const expiry = localStorage.getItem("sessionExpiry");
    const isExpired = !expiry || new Date().getTime() > parseInt(expiry);

    if (token && isLoggedIn === "true" && !isExpired) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserEmail: email,
          UserPassword: password,
          IsB2B: true,
          PortalId: Number(PORTAL_ID),
          AccountNo: PORTAL_ID,
          AgencyKey: AGENCY_KEY,
        }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok && data.UserStatus === "Success") {
        // 3 din ki session expiry
        const expiry = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.Token || "");
        localStorage.setItem("email", data.User?.Email || email);
        localStorage.setItem("sessionExpiry", expiry);

        navigate("/dashboard");
      } else {
        setError(data.Message || "Invalid Email or Password. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mains">

        {/* Page Title */}
        <h1 className="title">
          Welcome to <br />
          <span>TripCaliber Admin</span> Travel Portal
        </h1>

        {/* Main Card */}
        <div className="container">

          {/* Left — Illustration */}
          <div className="left">
            <img
              src="/tripji.png"
              className="img-thumbnail"
              alt="Travel illustration"
            />
            <p>
              The cutting-edge business travel platform that saves
              <br />
              you time and money.
            </p>
          </div>

          {/* Right — Login Form */}
          <div className="right">
            <h3>Login to Your Account</h3>
            <p className="subtext">Enter your credentials to continue</p>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="field-group">
                <label htmlFor="login-email">Email / Username</label>
                <input
                  id="login-email"
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              {/* Password */}
              <div className="field-group">
                <label htmlFor="login-password">Password</label>
                <div className="password-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-box" role="alert">
                  ⚠ {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner" /> Logging in...
                  </span>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Service Cards */}
        <div className="services">
          {SERVICES.map(({ icon, label }) => (
            <div className="serviceCard" key={label}>
              <span className="icon">{icon}</span>
              <h4>{label}</h4>
            </div>
          ))}
        </div>
      </div>

      <Loginsec />
      <Footer />
    </div>
  );
}

export default Login;