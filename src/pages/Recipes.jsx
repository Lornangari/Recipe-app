import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dummyRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: '/placeholder1.jpg',
    ingredients: ['Pasta', 'Eggs', 'Cheese', 'Bacon'],
    instructions: 'Boil pasta, mix eggs and cheese, combine with bacon.',
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    image: '/placeholder2.jpg',
    ingredients: ['Chicken', 'Vegetables', 'Soy Sauce'],
    instructions: 'Cook chicken, stir in veggies, add sauce.',
  },
];

const Recipes = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState(dummyRecipes);
  const [filtered, setFiltered] = useState(dummyRecipes);

  useEffect(() => {
    if (!search) {
      setFiltered(recipes);
    } else {
      setFiltered(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, recipes]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none"
        />
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
              </div>
            </Link>
            <div className="p-4 border-t">
              <button className="text-red-500 text-xl hover:scale-110 transition">
                💖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
