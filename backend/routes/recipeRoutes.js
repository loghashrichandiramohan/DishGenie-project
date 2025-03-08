import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Create (Save) a new recipe (Requires authentication)
router.post("/", authMiddleware, createRecipe);

// 🔹 Fetch all recipes (Supports search, filtering, pagination)
router.get("/", getRecipes);

// 🔹 Fetch a single recipe by ID
router.get("/:id", getRecipeById);

// 🔹 Update a recipe (Requires authentication)
router.put("/:id", authMiddleware, updateRecipe);

// 🔹 Delete a recipe (Requires authentication)
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;
