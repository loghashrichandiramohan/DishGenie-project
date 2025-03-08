import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Home = () => {
  const [mood, setMood] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Sample recipes categorized by mood
  const recipeOptions = {
    energetic: [
      "Green Smoothie Bowl 🍵 - Packed with superfoods to fuel your day!",
      "Quinoa & Avocado Salad 🥗 - A protein-packed refreshing meal!",
      "Banana Peanut Butter Toast 🍌 - A quick energy booster!"
    ],
    tired: [
      "Creamy Mushroom Pasta 🍝 - A comforting meal to recharge your energy!",
      "Garlic Butter Chicken 🍗 - Simple, flavorful, and filling!",
      "Masala Chai ☕ - A warm, spiced drink to wake you up!"
    ],
    happy: [
      "Strawberry Cheesecake 🍰 - Because happiness deserves a sweet treat!",
      "Bubble Tea 🧋 - A fun, refreshing drink to keep the vibes going!",
      "Homemade Pizza 🍕 - Make and enjoy your own delicious creation!"
    ],
    sad: [
      "Warm Chocolate Brownie 🍫 - A hug in dessert form!",
      "Mac & Cheese 🧀 - Ultimate comfort food!",
      "Chicken Soup 🍲 - Warm, nourishing, and soothing!"
    ],
    adventurous: [
      "Spicy Thai Curry 🌶️ - Bold flavors for a bold mood!",
      "Korean Bibimbap 🍛 - A colorful, exciting mix of flavors!",
      "Mexican Tacos 🌮 - A fusion of spices and textures!"
    ]
  };

  // Handle mood input change
  const handleMoodChange = (e) => {
    setMood(e.target.value.toLowerCase());
  };

  // Handle form submission to get recipe suggestions
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedRecipes = recipeOptions[mood] || [
      "Sorry, no recipes found for that mood! Try: happy, sad, energetic, tired, adventurous."
    ];
    setSuggestions(matchedRecipes);
  };

  // Reset the form and suggestions
  const handleReset = () => {
    setMood("");
    setSuggestions([]);
  };

  // Redirect to login if user clicks on a recipe suggestion
  const handleRecipeClick = () => {
    navigate("/login");
  };

  return (
    <div className='bg'>
      <div className="d-flex flex-row hero-section">
        <div className='col-6 text-center'>
          <img src='name.png' className='name' alt="DishGenie Logo"/>
          <p className='h-line'>Lazy to cook? Out of ideas? Let DishGenie work its magic!</p>
          <div className='d-flex flex-row justify-content-center m-4'>
            <Link to="/register" className="btn m-3 button-r">Register</Link>
            <Link to="/login" className="btn m-3 button-l">Login</Link>
          </div>
        </div>
        <div className='col-6 m-5'>
          <img src="genie.png" className="dishgenie-image" alt="Landing Page"/>
        </div>
      </div>

      <div className="features-section text-center">
        <h2>Why Choose DishGenie?</h2>
        <div className="d-flex flex-row justify-content-center">
          <div className="feature-card">✅ AI-powered recipe recommendations</div>
          <div className="feature-card">✅ Personalized meal suggestions</div>
          <div className="feature-card">✅ Ingredient-based recipe finder</div>
          <div className="feature-card">✅ Easy-to-follow cooking steps</div>
        </div>
      </div>

      {/* Mood-Based Recipe Suggestion Section */}
      <div className="search-section text-center">
        <h2>Find a Recipe Based on Your Mood</h2>
        <form onSubmit={handleSubmit} className="mood-form">
          <input
            type="text"
            placeholder="Type your mood... (e.g., happy, sad, energetic)"
            value={mood}
            onChange={handleMoodChange}
            className="search-input"
          />
          <button type="submit" className="btn search-btn">Find Recipes</button>
        </form>
      </div>

      {/* Display Recipe Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-section text-center">
          <h3>Recipe Suggestions:</h3>
          <ul className="suggestions-list">
            {suggestions.map((recipe, index) => (
              <li key={index} className="suggestion-item" onClick={handleRecipeClick}>
                {recipe}
              </li>
            ))}
          </ul>
          <button onClick={handleReset} className="btn reset-btn">Try Again</button>
        </div>
      )}

      <div className="testimonials-section text-center">
        <h2>What Our Users Say</h2>
        <p>"DishGenie made my cooking effortless!" - User A</p>
        <p>"I never run out of ideas anymore!" - User B</p>
      </div>

      <footer className="footer text-center">
        <p>© 2025 DishGenie. All Rights Reserved.</p>
        <p>
          <Link to="/about">About Us</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/faq">FAQs</Link> | 
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </footer>

      {/* Temporary Links for Testing */}
      <div className="test-links">
        <h3>Test Pages</h3>
        <Link to="/Dashboard" className="test-link">Go to Dashboard</Link> <br/>
        <Link to="/RecipeDetails" className="test-link">Go to Add Recipe Page</Link><br/>
        <Link to="/Recipe" className="test-link">Go to single Recipe Page</Link><br/>
        <Link to="/aimood" className="test-link">Mood Suggestor</Link><br/>
        <Link to="/profile" className="test-link">Profile</Link><br/>
        <Link to="/search" className="test-link">Search</Link><br/>
      </div>
    </div>
  );
};

export default Home;
