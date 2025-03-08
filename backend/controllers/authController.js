import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Utility function for email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate Access & Refresh Tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Store refresh tokens (For simplicity, in-memory storage. Use a database in production)
const refreshTokens = new Set();

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // 🔹 Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 🔹 Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 🔹 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔹 Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create User
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    refreshTokens.add(refreshToken);

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Refresh Token Endpoint
export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token || !refreshTokens.has(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);
    refreshTokens.delete(token);
    refreshTokens.add(newRefreshToken);

    res.json({ accessToken, refreshToken: newRefreshToken });
  });
};

// ✅ Logout (Invalidate Refresh Token)
export const logoutUser = (req, res) => {
  const { token } = req.body;
  refreshTokens.delete(token);
  res.status(200).json({ message: "Logged out successfully" });
};

// ✅ Password Reset Request (Placeholder)
export const requestPasswordReset = async (req, res) => {
  res.status(501).json({ message: "Password reset functionality is not implemented yet" });
};
