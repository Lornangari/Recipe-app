// src/pages/RecipeDetails/index.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipe(res.data.meals[0]);
    }
    fetchDetails();
  }, [id]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-[#F5F5F5] text-slate-800 mb-10">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-lg w-full mb-4" />
      <h2 className="text-xl font-semibold">Ingredients:</h2>
      <ul className="list-disc ml-6 mb-4">
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
        })}
      </ul>
      <h2 className="text-xl font-semibold">Instructions:</h2>
      <p className="mt-2 whitespace-pre-wrap">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;
