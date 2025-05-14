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
        <Link to="/profile">👤</Link>
        <Link to="/wishlist">💖</Link>
      </div>
    </nav>
  );
};

export default Navbar;
