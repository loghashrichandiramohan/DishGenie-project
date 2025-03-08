import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReceipeDetails from './pages/ReceipeDetails';
import Recipe from './pages/Receipe';
import MoodSuggestor from './pages/aimood';
import Profile from './pages/profile';
import SearchPage from './pages/search';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/RecipeDetails" element={<ReceipeDetails />} />
        <Route path="/Recipe" element={<Recipe />} />
        <Route path="/aimood" element={<MoodSuggestor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
