import React, { useState } from "react";
import "./AdminLogin.css";
import duriorLogo from "../assets/durior_logo.jpeg";

const EyeIcon = ({ open }) => open ? (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b8e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5"/><circle cx="12" cy="12" r="2.5"/></svg>
) : (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b8e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5"/><circle cx="12" cy="12" r="2.5"/><line x1="3" y1="21" x2="21" y2="3"/></svg>
);

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      window.location.href = "/admin/login";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  return (
    <div className="login-bg compact-bg">
      <div className="login-card wide-card compact-card">
        <div className="login-logo-col">
          <img src={duriorLogo} alt="Durior Logo" className="login-logo-img round-logo" />
          <span className="login-logo-text center-title">Durior Accessories</span>
        </div>
        <h2 className="login-title">Create an Account</h2>
        <form className="login-form" onSubmit={handleSignUp}>
          <label>Full Name</label>
          <div className="input-row">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <label>Email</label>
          <div className="input-row">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              className={emailValid ? "valid" : ""}
            />
            {emailValid && <span className="input-icon valid-check">✔</span>}
          </div>
          <label>Password</label>
          <div className="input-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-icon toggle-eye"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            >
              <EyeIcon open={showPassword} />
            </span>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="login-btn">Sign Up</button>
          <div className="login-links-row">
            <a href="/admin/login" className="login-link">Already have an account? Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
