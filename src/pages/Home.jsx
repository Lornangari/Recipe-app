import { useState } from 'react';
import heroImg from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // ← NEW

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== '') {
      navigate(`/recipes?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  


  

  return (
    <>
    <div className="p-6">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="w-full max-w-md px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/*  Hero section */}
    </div>

<div className="flex flex-col md:flex-row items-center justify-between gap-10">
  <div className="md:w-1/2">
    <h2 className="text-4xl font-bold mb-4">Discover New Recipes Every Day</h2>
    <p className="text-gray-600">
      Explore tasty meals, cooking tips, and share your favorite recipes with the world!
    </p>
    <h2 className="text-2xl font-semibold mb-4">Start your cooking journey</h2>
  <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
    Sign Up Now
  </Link>
  </div>

  

  <div className="md:w-1/2">
    <img
      src={heroImg}
      alt="Delicious food"
      className="rounded-xl shadow-lg"
    />
  </div>
</div>


<div className="mt-16 text-center">
  <h3 className="text-2xl font-semibold mb-4">🍳 Cooking Tips</h3>
  <p className="text-gray-700 max-w-2xl mx-auto">
    Improve your skills by practicing knife techniques, measuring ingredients properly, 
    and experimenting with herbs and spices. Keep your workspace clean and stay creative!
  </p>
</div>


<div className="mt-16 text-center">
  <h3 className="text-2xl font-semibold mb-4">👨‍🍳 About Us</h3>
  <p className="text-gray-700 max-w-2xl mx-auto">
    RecipeApp is built for food lovers. Whether you're a beginner or a seasoned cook, 
    we help you find, save, and share delicious recipes with ease.
  </p>
</div>



</>

  );

  
};

export default Home;
