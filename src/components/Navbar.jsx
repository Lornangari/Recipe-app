import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">RecipeApp 🍳</Link>
        </div>

        {/* Centered links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
        </ul>

        {/* Right side icons */}
        <div className="flex gap-4 items-center">
          <Link to="/wishlist">
            <i className="fa-solid fa-heart text-xl text-gray-700 hover:text-red-600"></i>
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <i className="fa-solid fa-user text-xl text-gray-700"></i>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-20">
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</Link>
                  </li>
                  {!user && (
                    <>
                      <li>
                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                      </li>
                      <li>
                        <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block px-2 py-1">Home</Link>
          <Link to="/recipes" className="block px-2 py-1">Recipes</Link>
          <Link to="/wishlist" className="block px-2 py-1">Wishlist</Link>
          {!user && (
            <>
              <Link to="/login" className="block px-2 py-1">Login</Link>
              <Link to="/signup" className="block px-2 py-1">Sign Up</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile" className="block px-2 py-1">Edit Profile</Link>
              <button onClick={logout} className="block w-full text-left px-2 py-1 text-red-500">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
