import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-amber-300">
          <Link to="/">Asili Recipes</Link>
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex gap-8 font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><Link to="/" className="hover:text-amber-300 transition">Home</Link></li>
          <li><Link to="/recipes" className="hover:text-amber-300 transition">Recipes</Link></li>
          <li><Link to="/community" className="hover:text-amber-300 transition">CommunityRecipes</Link></li>
          <li><Link to="/about" className="hover:text-amber-300 transition">About us</Link></li>
        </ul>

        {/* Right Icons */}
        <div className="flex gap-4 items-center">
          <Link to="/wishlist">
            <i className="fa-solid fa-heart text-xl hover:text-amber-300 transition"></i>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <i className="fa-solid fa-user text-xl hover:text-amber-300 transition"></i>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 shadow-lg rounded-md z-20">
                <ul className="text-sm">
                  {user && (
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    </li>
                  )}
                  {!user ? (
                    <>
                      <li>
                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl text-white`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-2 text-white">
          <Link to="/" className="block px-2 py-1 hover:text-amber-300">Home</Link>
          <Link to="/recipes" className="block px-2 py-1 hover:text-amber-300">Recipes</Link>
          <Link to="/wishlist" className="block px-2 py-1 hover:text-amber-300">Wishlist</Link>
          <Link to="/community" className="block px-2 py-1 hover:text-amber-300">CommunityRecipes</Link>
          <Link to="/about" className="block px-2 py-1 hover:text-amber-300">About us</Link>
          {!user ? (
            <>
              <Link to="/login" className="block px-2 py-1 hover:text-amber-300">Login</Link>
              <Link to="/signup" className="block px-2 py-1 hover:text-amber-300">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="block px-2 py-1 hover:text-amber-300">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-2 py-1 hover:text-amber-300">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
