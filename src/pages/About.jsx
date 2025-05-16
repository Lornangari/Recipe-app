import React from 'react';
import { FaGlobe, FaShareAlt, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-center">
          About Us
        </h1>

        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Welcome to <span className="text-amber-400 font-semibold">Asili Recipes</span> — your daily source of culinary inspiration! Our mission is to bring together a community of food lovers who want to discover, share, and cook amazing recipes.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <FaGlobe className="text-4xl text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Explore Global Flavors</h3>
            <p className="text-slate-800">
              Browse diverse recipes from every corner of the world and spice up your meals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <FaShareAlt className="text-4xl text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Share Your Passion</h3>
            <p className="text-slate-800">
              Post your unique creations and inspire others with your cooking talents.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <FaUsers className="text-4xl text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Join a Community</h3>
            <p className="text-slate-800">
              Connect with fellow foodies, get feedback, and grow your culinary skills.
            </p>
          </div>
        </div>

        {/* Final Paragraph */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-slate-800 mb-4">
            Whether you're a seasoned chef or just starting your cooking journey, RecipeApp is your go-to place to be inspired and inspire others.
          </p>
          <p className="text-lg text-slate-800 font-medium">
            Thank you for being part of our journey. Let’s cook, share, and grow together 🍲✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
