

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Ensure you create and style this CSS file accordingly


const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch random recipes on component mount
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=YOUR_SPOONACULAR_API_KEY`
      );
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&apiKey=YOUR_SPOONACULAR_API_KEY`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error searching for recipes:', error);
    }
  };

  return (
    <div className="search-page">
      <h1>Find Your Next Meal</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
