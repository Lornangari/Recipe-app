// src/pages/Wishlist.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist on load
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(wishlistRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  // Remove item from wishlist
  const handleRemove = async (idMeal) => {
    const updatedList = wishlist.filter((item) => item.idMeal !== idMeal);
    setWishlist(updatedList);

    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      await updateDoc(wishlistRef, { items: updatedList });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Your Wishlist</h2>
      <p className="mb-4 text-gray-600"> Your Total items: {wishlist.length}</p>

      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((recipe) => (
            <div key={recipe.idMeal} className="bg-white p-4 shadow-md rounded">
              <Link to={`/recipe/${recipe.idMeal}`}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded" />
                <h3 className="mt-2 font-bold">{recipe.strMeal}</h3>
              </Link>
              <button
                onClick={() => handleRemove(recipe.idMeal)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
