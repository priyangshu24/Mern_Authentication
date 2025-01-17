/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContent);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      // Validate backendUrl exists
      if (!backendUrl) {
        toast.error('Backend URL is not configured');
        return;
      }
  
      // Validate required fields
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
  
      // Set axios defaults
      axios.defaults.withCredentials = true;
      
      // Ensure proper URL formatting
      const apiUrl = backendUrl.endsWith('/') 
        ? backendUrl.slice(0, -1) 
        : backendUrl;
  
      if (state === 'Sign Up') {
        // Validate fullName for signup
        if (!formData.fullName) {
          toast.error('Please enter your full name');
          return;
        }
  
        const { data } = await axios.post(
          `${apiUrl}/api/auth/register`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (data.success) {
          setIsLoggedin(true);
          navigate('/');
          toast.success('Registration successful!');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      } else {
        // Login flow
        const { data } = await axios.post(
          `${apiUrl}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (data.success) {
          setIsLoggedin(true);
          navigate('/dashboard');
          toast.success('Login successful!');
        } else {
          toast.error(data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
  
      // Enhanced error handling
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 404) {
          toast.error('API endpoint not found. Please check your backend URL configuration.');
        } else if (error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error(error.response.data?.message || 'Authentication failed');
        }
      } else if (error.request) {
        // Request made but no response
        toast.error('Unable to connect to server. Please check your internet connection.');
      } else {
        // Other errors
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-400"></div>

      {/* Content container */}
      <div className="relative w-full max-w-md px-6 py-8 mx-auto shadow-xl bg-gray-900/90 backdrop-blur-md rounded-xl">
        {/* Logo section with click functionality */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-24 cursor-pointer sm:w-28 drop-shadow-xl"
            />
          </Link>
        </div>

        {/* Text content */}
        <div className="mb-6 text-center">
          <h2 className="mb-1 text-xl font-bold text-white sm:text-2xl">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-400">
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
                  className="px-3 text-gray-500"
                />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-all bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                className="px-3 text-gray-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-all bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                className="px-3 text-gray-500"
              />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-all bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center mt-4">
            <Link
              to="/reset-password"
              className="text-sm font-medium text-gray-400 hover:text-gray-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-purple-600 rounded-full hover:bg-purple-700"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle State */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="ml-2 text-purple-400 transition-colors hover:text-purple-300"
            >
              {state === 'Sign Up' ? 'Login here' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;