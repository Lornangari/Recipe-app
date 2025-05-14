// src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-black px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">RecipeApp 🍳</h2>
          <p>Your go-to place for delicious and healthy recipes.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-white">Recipes</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white mb-2">Contact</h3>
          <ul className="space-y-1">
            <li>Email: support@recipeapp.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div>
          <h3 className="font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-white"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        © 2025 RecipeApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
