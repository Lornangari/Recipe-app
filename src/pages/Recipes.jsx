import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recipes = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('q');
  const [query, setQuery] = useState(queryParam || '');
  const [recipes, setRecipes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { user } = useAuth();

  // 🔁 Fetch a variety of random meals (filter nulls and duplicates)
  const fetchRandomMeals = async () => {
    try {
      const promises = Array.from({ length: 12 }, () =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      );
      const responses = await Promise.all(promises);
      const allMeals = responses
        .map(res => res.data.meals?.[0])
        .filter((meal, index, self) =>
          meal && self.findIndex(m => m.idMeal === meal.idMeal) === index
        );
      setRecipes(allMeals);
    } catch (err) {
      console.error('Error fetching random meals:', err);
      setRecipes([]);
    }
  };

  // 🔍 Fetch by search
  const fetchRecipes = async (searchTerm) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setRecipes(res.data.meals || []);
      updateSearchHistory(searchTerm);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const updateSearchHistory = (term) => {
    const prev = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const updated = [term, ...prev.filter(item => item !== term)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
    setSearchHistory(updated);
  };

  useEffect(() => {
    const term = queryParam?.trim();
    if (term) {
      setQuery(term);
      fetchRecipes(term);
    } else {
      fetchRandomMeals();
    }

    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/recipes?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleAddToWishlist = async (recipe) => {
    if (!user) {
      toast.error("Please login to add to wishlist.");
      return;
    }

    const wishlistRef = doc(db, 'wishlists', user.uid);
    const docSnap = await getDoc(wishlistRef);
    const existing = docSnap.exists() ? docSnap.data().items || [] : [];

    const alreadyExists = existing.find(item => item.idMeal === recipe.idMeal);
    if (alreadyExists) {
      toast.info("Already in wishlist");
      return;
    }

    const updated = [...existing, recipe];
    await setDoc(wishlistRef, { items: updated });
    toast.success("Added to wishlist!");
  };

  return (
    <div className="p-6 ">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          className="border p-2 rounded w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-slate-700 text-white rounded">
          Search
        </button>
      </form>

      {/* Recent Searches */}
      {searchHistory.length > 0 && (
        <div className="mb-6 text-center">
          <h4 className="font-semibold mb-2">Recent Searches:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => window.location.href = `/recipes?q=${item}`}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recipe List */}
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="bg-white p-4 shadow-md rounded">
              <Link to={`/recipe/${recipe.idMeal}`}>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-bold truncate">{recipe.strMeal}</h3>
                <p className="text-sm text-gray-500">
                  {recipe.strArea} | {recipe.strCategory}
                </p>
              </Link>
              <button
                onClick={() => handleAddToWishlist(recipe)}
                className="mt-2 px-4 py-1 bg-slate-900 text-white rounded hover:bg-green-500"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
