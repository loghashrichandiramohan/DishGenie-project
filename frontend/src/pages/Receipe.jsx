import React from 'react';
import '../App.css';

const Recipe = () => {
  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">Spaghetti Carbonara</h1>
      
      {/* Image Gallery */}
      <div className="recipe-gallery">
        <img src="/images/spaghetti.jpg" alt="Spaghetti Carbonara" className="recipe-image" />
      </div>
      
      {/* Ingredients Section */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>200g spaghetti</li>
          <li>100g pancetta</li>
          <li>2 large eggs</li>
          <li>50g parmesan cheese</li>
          <li>Black pepper & salt</li>
        </ul>
      </div>
      
      {/* Steps Section */}
      <div className="recipe-section">
        <h2>Steps</h2>
        <ol>
          <li>Boil pasta until al dente.</li>
          <li>Fry pancetta until crispy.</li>
          <li>Whisk eggs and parmesan in a bowl.</li>
          <li>Mix pasta with pancetta, then add egg mixture.</li>
          <li>Stir well and serve hot.</li>
        </ol>
      </div>
      
      {/* Save Recipe Button */}
      <button className="save-recipe-btn">Save Recipe</button>
    </div>
  );
};

export default Recipe;
