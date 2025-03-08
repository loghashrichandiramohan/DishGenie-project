import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// 🔹 Validation middleware
const validateAuthInput = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post("/register", validateAuthInput, registerUser);
router.post("/login", validateAuthInput, loginUser);

export default router;
