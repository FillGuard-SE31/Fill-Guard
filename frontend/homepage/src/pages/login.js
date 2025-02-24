import React, { useState } from "react";
import "../styles/login.css";
import recycleBin from "../assets/img/recycle-bin.jpg";
import pass from "../assets/img/pass-icon.png";
import email1 from "../assets/img/email-icon.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      alert("Login Successful! (Replace this with actual authentication logic)");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left side - Login Form */}
        <div className="login-form">
          <h2>Login</h2>
          <p>Doesn’t have an account yet? <a href="#">Sign Up</a></p>

          {error && <p className="error-message">{error}</p>}

      <div className="input-field">
        <img src={email1} alt="Email Icon" className="icon" />
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-field">
        <img src={pass} alt="Pass Icon" className="icon" />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me"> Remember me</label>
          </div>

          <button className="login-button" onClick={handleLogin}>LOGIN</button>
        </div>

        {/* Right side - Image */}
        <div className="login-image">
          <img src={recycleBin} alt="Recycling Bin" />
        </div>
      </div>
    </div>
  );
};

export default Login;
