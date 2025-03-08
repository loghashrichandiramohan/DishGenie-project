import React, { useState } from "react";
import "../App.css";

const ReceipeDetails = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    category: "Breakfast",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageUpload = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Submitted:", recipe);
  };

  return (
    <div className="add-recipe-container">
      <h1 id="add-recipe-title">Add a New Recipe</h1>

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <label htmlFor="recipe-name">Recipe Name</label>
        <input
          type="text"
          id="recipe-name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className="form-input"
          required
        />

        <label htmlFor="recipe-ingredients">Ingredients</label>
        <textarea
          id="recipe-ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          className="form-input"
          required
        />

        <label htmlFor="recipe-steps">Steps</label>
        <textarea
          id="recipe-steps"
          name="steps"
          value={recipe.steps}
          onChange={handleChange}
          className="form-input"
          required
        />

        <label htmlFor="recipe-category">Category</label>
        <select
          id="recipe-category"
          name="category"
          value={recipe.category}
          onChange={handleChange}
          className="form-input"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
          <option>Dessert</option>
        </select>

        <label htmlFor="recipe-image">Upload Image</label>
        <input
          type="file"
          id="recipe-image"
          name="image"
          onChange={handleImageUpload}
          className="form-input"
        />

        <button type="submit" id="submit-recipe-button">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default ReceipeDetails;
