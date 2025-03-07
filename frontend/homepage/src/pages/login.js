import React, { useState } from "react";
import "../styles/login.css"; // Import the CSS file

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation (any password is allowed)
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    // If validation passes, clear errors and proceed with login
    setError("");
    alert("Login successful!"); // Replace with actual login logic
    onClose(); // Close the login form
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group form-check">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          <div className="forgot-password">
            <a href="#forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;