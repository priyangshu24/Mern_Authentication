/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-400"></div>

      {/* Content container */}
      <div className="relative w-full max-w-md mx-auto px-6 py-8 bg-gray-900/90 backdrop-blur-md rounded-xl shadow-xl">
        {/* Logo section with click functionality */}
        <div className="flex justify-center mb-6">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-24 sm:w-28 drop-shadow-xl cursor-pointer"
            />
          </a>
        </div>

        {/* Text content */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-gray-400 text-sm">
            {state === 'Sign Up' ? 'Create a new account' : 'Login to your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - only for Sign Up */}
          {state === 'Sign Up' && (
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="flex items-center bg-gray-800 rounded-full">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-500 px-3"
                />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm rounded-full"
                  placeholder="Enter your full name"
                  required={state === 'Sign Up'}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="flex items-center bg-gray-800 rounded-full">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 px-3"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm rounded-full"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="flex items-center bg-gray-800 rounded-full">
              <FontAwesomeIcon
                icon={faLock}
                className="text-gray-500 px-3"
              />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm rounded-full"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center mt-4">
            <Link
              to="/reset-password" // Redirect to the reset-password page
              className="text-gray-400 text-sm font-medium hover:text-gray-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold 
              hover:bg-purple-700 transition-colors duration-300 mt-4"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle State */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="ml-2 text-purple-400 hover:text-purple-300 transition-colors">
              {state === 'Sign Up' ? 'Login here' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
