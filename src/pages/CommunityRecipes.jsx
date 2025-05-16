import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CommunityRecipes = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'communityRecipes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!title || !ingredients || !description) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'communityRecipes'), {
        title,
        ingredients,
        description,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userEmail: user.email
      });
      setTitle('');
      setIngredients('');
      setDescription('');
      toast.success('Recipe added!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add recipe.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'communityRecipes', id));
      toast.success('Recipe deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-slate-800">🍽️ Community Recipes</h1>
      <p className="text-center text-lg text-slate-800 mb-8">
        Welcome to our<span className="text-amber-400"> Community Kitchen!</span> <br /> Here, food lovers like you can share their favorite homemade recipes with everyone.
        Feel free to browse and get inspired. If you have a recipe you love, log in and share it with the world!
      </p>

      {user ? (
        <form onSubmit={handleAddRecipe} className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-slate-800">Add Your Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <textarea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-600 transition"
          >
            Add Recipe
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-4 justify-center mb-10">
         <p className="text-slate-800 m-0">Please login to add your own recipe.</p>
          <Link to="/login" className="text-amber-300 hover:underline font-semibold">
            Go to Login
          </Link>
        </div>


      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">🍲 Shared Recipes</h2>
        {recipes.length === 0 ? (
          <p className="text-slate-800">No recipes shared yet. Be the first to contribute!</p>
        ) : (
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="border rounded-md p-4 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800">{recipe.title}</h3>
                <p className="text-sm text-slate-500 mb-1">By {recipe.userEmail || 'Anonymous'}</p>
                <p className="text-slate-700 mt-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="text-slate-700 mt-2"><strong>Description:</strong> {recipe.description}</p>
                {user && user.uid === recipe.userId && (
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="mt-3 text-slate-900 hover:underline text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityRecipes;
