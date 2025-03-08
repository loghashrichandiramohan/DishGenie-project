import Recipe from "../models/Recipe.js";
import cloudinary from "cloudinary";

// Configure Cloudinary (Ensure your `.env` has Cloudinary credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Create a new recipe with Cloudinary image upload
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    
    // Normalize ingredients (convert to lowercase)
    const normalizedIngredients = ingredients.map(ingredient => ingredient.toLowerCase());

    let imageUrl = null;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadedImage.secure_url;
    }

    const newRecipe = new Recipe({
      title,
      ingredients: normalizedIngredients,
      instructions,
      image: imageUrl,
      user: req.user.id, // From authMiddleware
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all recipes with search, filtering & pagination (excluding soft-deleted ones)
export const getRecipes = async (req, res) => {
  try {
    const { search, ingredients, user, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;

    let query = { isDeleted: false }; // Exclude soft-deleted recipes

    // 🔍 Search by title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🍅 Filter by ingredients (partial match, case-insensitive)
    if (ingredients) {
      const ingredientArray = ingredients.split(",").map(i => i.toLowerCase());
      query.ingredients = { $in: ingredientArray };
    }

    // 👤 Filter by user ID
    if (user) {
      query.user = user;
    }

    // 🔹 Pagination & Sorting
    const recipes = await Recipe.find(query)
      .populate("user", "username email")
      .sort({ [sort]: order === "desc" ? -1 : 1 }) // Sort dynamically
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Recipe.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get a recipe by ID (excluding soft-deleted ones)
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, isDeleted: false }).populate("user", "username email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update a recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.isDeleted) return res.status(404).json({ message: "Recipe not found" });

    // Check if the logged-in user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Normalize ingredients if updated
    if (req.body.ingredients) {
      req.body.ingredients = req.body.ingredients.map(ingredient => ingredient.toLowerCase());
    }

    // Handle image update with Cloudinary
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      req.body.image = uploadedImage.secure_url;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft delete a recipe (instead of permanent deletion)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.isDeleted) return res.status(404).json({ message: "Recipe not found" });

    // Check if the logged-in user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Soft delete instead of removing from the database
    recipe.isDeleted = true;
    await recipe.save();

    res.json({ message: "Recipe soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Restore a soft-deleted recipe
export const restoreRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || !recipe.isDeleted) return res.status(404).json({ message: "Recipe not found or already active" });

    // Check if the logged-in user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    recipe.isDeleted = false;
    await recipe.save();

    res.json({ message: "Recipe restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
