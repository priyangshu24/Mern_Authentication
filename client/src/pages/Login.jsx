/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Login = () => {
  const [state, setState] = useState('Sign Up');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-400"></div>
      
      {/* Content container with glass effect */}
      <div className="relative w-full max-w-md mx-auto px-6 py-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
        {/* Logo section */}
        <div className="flex justify-center mb-8">
          <img
            src={assets.logo}
            alt=""
            className="w-28 sm:w-32 drop-shadow-xl"
          />
        </div>

        {/* Text content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-white/80">
            {state === 'Sign Up' ? 'Create a new account' : 'Login to your account'}
          </p>
        </div>

        {/* Form placeholder */}
        <div className="space-y-4">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg"></div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg"></div>
          
          {/* Button */}
          <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold 
            hover:bg-purple-50 transition-colors duration-300">
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </div>

        {/* Toggle state */}
        <div className="mt-8 text-center">
          <p className="text-white">
            {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="ml-2 font-semibold text-white hover:text-purple-200 transition-colors"
            >
              {state === 'Sign Up' ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;