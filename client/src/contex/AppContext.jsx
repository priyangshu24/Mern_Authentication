// /* eslint-disable react/prop-types */
// import { createContext, useState, useEffect } from 'react';

// export const AppContent = createContext();

// export const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Check authentication status on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedin(true);
//       // Optionally fetch user data here
//     }
//   }, []);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData
//   };

//   return (
//     <AppContent.Provider value={value}>
//       {children}
//     </AppContent.Provider>
//   );
// };