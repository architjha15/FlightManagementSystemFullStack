import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; 

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // State for Form Inputs
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    fname: "",
    username: "",
    emailid: "",
    password: "",
  });

  // Handle Input Changes
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  
  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.id]: e.target.value });

  // --- LOGIN LOGIC (Updated to go to Dashboard) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Verify credentials with Backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        // 2. Success: Save user and Redirect to Dashboard
        localStorage.setItem("fm_user", data.fname);
        navigate("/search");
      } else {
        setMessage(data.msg || "Invalid credentials");
      }
    } catch (err) {
      setMessage("Server error. Is the backend running?");
    }
  };

  // --- SIGNUP LOGIC (Already goes to Dashboard) ---
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("fm_user", data.fname); 
        navigate("/search"); 
      } else {
        setMessage(data.msg || "Registration failed");
      }
    } catch (err) {
      setMessage("Server error. Is the backend running?");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="form-container">
          
          {/* Toggle Buttons */}
          <div className="form-toggle">
            <button
              className={isLoginView ? "active" : ""}
              onClick={() => {
                setIsLoginView(true);
                setMessage("");
              }}
            >
              Login
            </button>
            <button
              className={!isLoginView ? "active" : ""}
              onClick={() => {
                setIsLoginView(false);
                setMessage("");
              }}
            >
              Signup
            </button>
          </div>

          {/* Login Form */}
          {isLoginView && (
            <form className="form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                id="username"
                required
                value={loginData.username}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <button type="submit">Login</button>
            </form>
          )}

          {/* Signup Form */}
          {!isLoginView && (
            <form className="form" onSubmit={handleSignup}>
              <h2>Signup</h2>
              <input
                type="text"
                placeholder="Full Name"
                id="fname"
                required
                value={signupData.fname}
                onChange={handleSignupChange}
              />
              <input
                type="text"
                placeholder="Username"
                id="username"
                required
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="emailid"
                required
                value={signupData.emailid}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                required
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <button type="submit">Signup</button>
            </form>
          )}

          {message && <div className="message">{message}</div>}
          
        </div>
      </div>
    </div>
  );
}