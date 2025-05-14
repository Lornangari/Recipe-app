import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">RecipeApp 🍳</Link>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="text-black hover:underline">Login</Link>
        <Link to="/signup" className="text-black hover:underline">Sign Up</Link>
        <Link to="/profile"><i class="fa-solid fa-user"></i></Link>
        <Link to="/wishlist"><i class="fa-solid fa-heart"></i></Link>
      </div>
    </nav>
  );
};

export default Navbar;
