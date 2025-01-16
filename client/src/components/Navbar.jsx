/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 relative">
      <img
        src={assets.logo}
        alt=""
        className="w-28 sm:w-32"
      />
      <button
        onClick={handleLoginClick}
        className="
          inline-flex items-center justify-center
          gap-2 px-6 py-3
          text-base font-medium
          text-gray-50
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:from-purple-700 hover:to-indigo-700
          rounded-full
          transform transition-all duration-300
          hover:-translate-y-0.5
          shadow-md hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        "
      >
        Login
        <img
          src={assets.arrow_icon}
          alt=""
          className="w-4 h-4"
        />
      </button>
    </div>
  );
};

export default Navbar;