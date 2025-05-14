// src/pages/Recipes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    setRecipes(res.data.meals || []);
  };

  useEffect(() => {
    searchRecipes(); // Load default recipes
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          className="border p-2 rounded w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchRecipes} className="ml-2 px-4 py-2 bg-green-600 text-white rounded">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white p-4 shadow-md rounded">
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-2 font-bold">{recipe.strMeal}</h3>
            </Link>
            <button  className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-500"> Add to Wishlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
