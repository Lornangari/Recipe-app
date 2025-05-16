import { useState } from 'react';
import heroImg from '../assets/delicious-meal.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/recipes?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className=" text-slate-800 min-h-screen">
      {/* Search Bar */}
      <div className="p-6">
        <form
          onSubmit={handleSearch}
          className="flex justify-center mb-10"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="w-full max-w-md px-4 py-2 rounded-l-md border border-slate-600 focus:outline-none text-slate-700"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-2 rounded-r-md hover:bg-slate-600 transition"
          >
            Search
          </button>
        </form>

       {/* Hero Section */}
<div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10">
  {/* Text Content */}
  <div className="md:w-2/3 lg:w-1/2 text-center md:text-left px-4 mb-6 ml-4">
    <h2 className="text-4xl font-bold mb-4 text-slate-800">
      Cook like a pro with <br /> Our <span className="text-amber-300">Easy</span> and <span className="text-amber-300">Tasty </span> <br />Recipes
    </h2>
    <p className="mb-4 text-slate-700 text-lg">
      Explore tasty meals, cooking tips, and share your favorite recipes with the world!
    </p>
    
    <Link
      to="/recipes"
      className="inline-block bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-600 transition"
    >
      Explore all Recipes
    </Link>
  </div>

  {/* Image */}
  <div className="md:w-1/3 lg:w-1/2 px-4">
  <img
    src={heroImg}
    alt="Delicious food"
    className="w-full max-h-90 object-cover rounded-2xl shadow-lg"
  />
</div>

</div>
</div>







{/* Popular Recipes Section */}
<div className=" text-slate-800 py-16 px-6  mb-10">
  <h2 className="text-3xl font-bold text-center mb-2">
    Popular Recipes You Can't Miss 
  </h2>
  <p className=" text-center text-slate-700 text-lg mb-10 ml-2">
      From comfort food classics to exotic flavors, our featured recipes are sure to impress 
    </p>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
      <img
        src="src\assets\pasta.jpg"
        alt="Creamy Garlic Pasta"
        className="rounded-t-xl w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Creamy Garlic Pasta</h3>
        <p className="text-sm text-gray-700 mb-4">A rich and creamy dish with garlic and parmesan flavor.</p>
        <Link
          to="/recipes?q=pasta"
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
      <img
        src="src\assets\salad.jpg"
        alt="Fresh Garden Salad"
        className="rounded-t-xl w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Fresh Garden Salad</h3>
        <p className="text-sm text-gray-700 mb-4">A light and healthy salad with crisp veggies and herbs.</p>
        <Link
          to="/recipes?q=salad"
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
      <img
        src="src\assets\burger.jpg"
        alt="Juicy Beef Burger"
        className="rounded-t-xl w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Juicy Beef Burger</h3>
        <p className="text-sm text-gray-700 mb-4">Classic juicy burger with cheese, lettuce, and tomato.</p>
        <Link
          to="/recipes?q=burger"
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
      <img
        src="src\assets\pizza.jpg"
        alt="Cheesy Margherita Pizza"
        className="rounded-t-xl w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Margherita Pizza</h3>
        <p className="text-sm text-gray-700 mb-4">A cheesy delight with basil and tomato sauce on thin crust.</p>
        <Link
          to="/recipes?q=pizza"
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>
  </div>
</div>




{/* Cooking Tips Section */}
<div className="bg-[#F5F5F5] text-slate-800 py-16 px-6">
  <h2 className="text-3xl font-bold text-center mb-4">🍳 Handy Cooking Tips</h2>
  <p className="text-center text-slate-800 max-w-2xl mx-auto mb-10">
    Improve your culinary skills with these easy, actionable cooking tips. Whether you're a beginner or a pro, there's always something new to learn in the kitchen!
  </p>

  <div className="grid gap-6 md:grid-cols-3">
    {/* Tip 1 */}
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">🔪 Master Your Knife Skills</h3>
      <p className="text-slate-800">
        Use a sharp knife and proper technique to improve speed and safety. Practice dicing, slicing, and julienning with consistency.
      </p>
    </div>

    {/* Tip 2 */}
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">🧂 Season as You Go</h3>
      <p className="text-slate-800">
        Add salt, pepper, and spices in stages during cooking to build deep flavor instead of just seasoning at the end.
      </p>
    </div>

    {/* Tip 3 */}
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">🔥 Let the Pan Heat Up</h3>
      <p className="text-slate-800">
        Always preheat your pan before adding ingredients. This ensures even cooking, prevents sticking, and enhances flavor through searing.
      </p>
    </div>
  </div>
</div>



{/* Call to Action Section */}
<div className=" text-slate-800 py-12 px-6 mt-16 rounded-lg shadow-md text-center">
  <h2 className="text-3xl font-bold mb-4">Join Our Cooking Community</h2>
  <p className="mb-6 max-w-2xl mx-auto">
    Whether you're a beginner or a master chef, share your favorite recipes and discover meals from people all around the world. Let's make cooking fun and inspiring!
  </p>
  
  <div className="flex flex-col md:flex-row gap-6 justify-center">
    <Link
      to="/signup"
      className="bg-slate-700 text-white px-6 py-3 rounded-md hover:bg-slate-600 transition font-medium"
    >
      Sign Up & Get Started
    </Link>

    <Link
      to="/community"
      className=" border bg-slate-700 text-white px-6 py-3 rounded-md hover:bg-slate-600 transition font-medium"
    >
      Share Your Recipes
    </Link>
  </div>
</div>
      
    </div>
  );
};

export default Home;
