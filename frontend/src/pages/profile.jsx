import React, { useState } from "react";
import "../App.css";

const Profile = () => {
  const user = {
    username: "Loghashri",
    email: "loghashri1506@gmail.com",
    avatar: "https://via.placeholder.com/100",
  };

  const [savedRecipes, setSavedRecipes] = useState([
    { id: 1, name: "Spaghetti Carbonara 🍝" },
    { id: 2, name: "Avocado Toast 🥑" },
  ]);

  const [submittedRecipes, setSubmittedRecipes] = useState([
    { id: 1, name: "Homemade Pizza 🍕" },
    { id: 2, name: "Vegan Smoothie Bowl 🍓" },
  ]);

  const deleteRecipe = (id, type) => {
    if (type === "saved") {
      setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
    } else if (type === "submitted") {
      setSubmittedRecipes(submittedRecipes.filter(recipe => recipe.id !== id));
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Info */}
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
      </div>

      {/* Saved Recipes */}
      <div className="profile-section">
        <h3 className="profile-title">Saved Recipes</h3>
        {savedRecipes.length > 0 ? (
          <ul className="profile-list">
            {savedRecipes.map((recipe) => (
              <li key={recipe.id} className="profile-item">
                {recipe.name}
                <button
                  className="profile-delete"
                  onClick={() => deleteRecipe(recipe.id, "saved")}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="profile-empty">No saved recipes.</p>
        )}
      </div>

      {/* Submitted Recipes */}
      <div className="profile-section">
        <h3 className="profile-title">Your Submitted Recipes</h3>
        {submittedRecipes.length > 0 ? (
          <ul className="profile-list">
            {submittedRecipes.map((recipe) => (
              <li key={recipe.id} className="profile-item">
                {recipe.name}
                <button
                  className="profile-delete"
                  onClick={() => deleteRecipe(recipe.id, "submitted")}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="profile-empty">You haven’t submitted any recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
