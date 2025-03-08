import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: {
      type: [String],
      required: true,
      set: (ingredients) => ingredients.map((i) => i.toLowerCase()), // Normalize to lowercase
    },
    instructions: { type: String, required: true },
    image: { type: String }, // Store Cloudinary image URL
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user who added the recipe

    // ✅ Likes feature: Stores user IDs who liked the recipe
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ✅ Comments feature: Stores comments with user ID, text, and timestamp
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ Soft delete: Marks the recipe as deleted instead of removing it permanently
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);
