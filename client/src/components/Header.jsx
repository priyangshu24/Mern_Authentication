/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="relative mt-20 sm:mt-24">
      <div className="max-w-2xl mx-auto px-4 py-8 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start mb-6">
          <img 
            src={assets.header_img} 
            alt="Header" 
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-lg object-cover object-center shadow-lg"
          />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center sm:justify-start">
          Hey Developer 
          <img 
            className="w-8 h-8 sm:w-12 sm:h-12 inline-block ml-2 animate-bounce" 
            src={assets.hand_wave} 
            alt="Wave"
          />
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          Welcome to the Authentication App
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl">
          Let's start with a quick product overview and get started with the 
          authentication process to get you up and running!
        </p>
        
        <button className="
          inline-flex items-center justify-center
          px-6 py-3
          text-base font-medium
          text-gray-50
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:from-purple-700 hover:to-indigo-700
          rounded-full
          transform transition-all duration-300
          hover:-translate-y-0.5
          shadow-md hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ">
          <span>Get Started</span>
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header