import React, { useState } from "react";
import "../App.css";

const MoodSuggestor = () => {
  const [mood, setMood] = useState("");
  const [suggestion, setSuggestion] = useState(null);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipes = {
      energetic: "Green Smoothie Bowl 🍵 - Packed with superfoods to fuel your day!",
      tired: "Creamy Mushroom Pasta 🍝 - A comforting meal to recharge your energy!",
      happy: "Strawberry Cheesecake 🍰 - Because happiness deserves a sweet treat!",
      sad: "Warm Chocolate Brownie 🍫 - A hug in dessert form!",
      adventurous: "Spicy Thai Curry 🌶️ - Bold flavors for a bold mood!"
    };

    setSuggestion(recipes[mood] || "Choose a mood to get a recipe!");
  };

  const handleReset = () => {
    setMood("");
    setSuggestion(null);
  };

  return (
    <div className="mood-container">
      <h1 className="mood-title">Find a Recipe Based on Your Mood</h1>

      {!suggestion ? (
        <form onSubmit={handleSubmit} className="mood-form">
          <p className="mood-question">How are you feeling today?</p>

          <label className="mood-option">
            <input
              type="radio"
              name="mood"
              value="energetic"
              checked={mood === "energetic"}
              onChange={handleMoodChange}
            />
            Energetic ⚡
          </label>

          <label className="mood-option">
            <input
              type="radio"
              name="mood"
              value="tired"
              checked={mood === "tired"}
              onChange={handleMoodChange}
            />
            Tired 😴
          </label>

          <label className="mood-option">
            <input
              type="radio"
              name="mood"
              value="happy"
              checked={mood === "happy"}
              onChange={handleMoodChange}
            />
            Happy 😃
          </label>

          <label className="mood-option">
            <input
              type="radio"
              name="mood"
              value="sad"
              checked={mood === "sad"}
              onChange={handleMoodChange}
            />
            Sad 😞
          </label>

          <label className="mood-option">
            <input
              type="radio"
              name="mood"
              value="adventurous"
              checked={mood === "adventurous"}
              onChange={handleMoodChange}
            />
            Adventurous 🌍
          </label>

          <button type="submit" className="mood-submit">Get Recipe</button>
        </form>
      ) : (
        <div className="mood-result">
          <h2 className="mood-recipe-title">✨ Your Recipe Suggestion ✨</h2>
          <p className="mood-recipe">{suggestion}</p>
          <button onClick={handleReset} className="mood-reset">Try Again</button>
        </div>
      )}
    </div>

    
  );
};

export default MoodSuggestor;
