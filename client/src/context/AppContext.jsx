/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  console.log('ENV Backend URL:', import.meta.env.VITE_BACKEND_URL);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/auth/is-auth`, {}, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setIsLoggedin(true);
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedin(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
  }, [backendUrl]);

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    logout
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};