import { GoogleGenerativeAI } from "@google/generative-ai";
import Recipe from "../models/Recipe.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Set to false in production to avoid excessive logging
const DEBUG_MODE = true;

export const getMoodBasedRecipes = async (req, res) => {
  const { mood } = req.body;
  if (!mood) {
    return res.status(400).json({ message: "Please provide a mood" });
  }

  try {
    // 🔹 Initialize AI model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 🔹 Generate AI response
    const aiResponse = await model.generateContent([
      `Suggest 5 well-known dish names that match the mood "${mood}". 
      Return only dish names, comma-separated, without extra text.`
    ]);

    // 🔹 Extract AI-generated text safely
    const responseText = aiResponse?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!responseText) {
      return res.status(404).json({ message: "AI did not return any dish suggestions", rawResponse: aiResponse });
    }

    // 🔹 Convert response into an array of dish names
    const suggestedDishes = responseText
      .split(",")
      .map(dish => dish.trim())
      .filter(dish => dish.length > 0); // Ensure no empty entries

    if (DEBUG_MODE) console.log("🔹 Gemini AI Suggested Dishes:", suggestedDishes);

    if (suggestedDishes.length === 0) {
      return res.status(404).json({ message: "No valid dish names received from AI", rawResponse: responseText });
    }

    // 🔹 Ensure MongoDB Atlas Search is properly configured
    const searchIndex = "default"; // Make sure this matches your actual search index name in MongoDB

    const recipes = await Recipe.aggregate([
      {
        $search: {
          index: searchIndex,
          text: {
            query: suggestedDishes,
            path: "title",
            fuzzy: { maxEdits: 2 } // Allows minor spelling variations
          }
        }
      }
    ]);

    if (DEBUG_MODE) console.log("🔹 Matching Recipes Found:", recipes.length);

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for this mood", suggestedDishes });
    }

    res.json({ mood, suggestedDishes, recipes });

  } catch (error) {
    console.error("❌ Error generating mood-based recipes:", error);
    res.status(500).json({ message: "Error generating mood-based recipes", error: error.message });
  }
};
