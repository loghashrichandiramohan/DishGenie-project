import express from "express";
import { getMoodBasedRecipes } from "../controllers/aiController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// 🔹 Validation middleware
const validateMoodInput = [
  body("mood")
    .trim()
    .notEmpty()
    .withMessage("Mood is required")
    .isString()
    .withMessage("Mood must be a valid string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post("/mood", validateMoodInput, getMoodBasedRecipes);

export default router;
