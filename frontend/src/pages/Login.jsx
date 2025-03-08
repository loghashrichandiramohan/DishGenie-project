import { useState } from "react";
import API from "../api";
import "../App.css"; // Import styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const { data } = await API.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store token & notify user
      localStorage.setItem("token", data.token);
      alert("Login successful! ✅");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed!");
      alert("Login failed! ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>

        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              className="login-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-remember">
            <input
              type="checkbox"
              name="rememberMe"
              className="login-checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="login-forgot">
          <a href="#" className="login-forgot-link">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
