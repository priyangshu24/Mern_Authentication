/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = ( props ) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin ] = useState(false)
    const [ useData , setUserData] = useState(false)
    const value = {
        backendUrl, isLoggedin, setIsLoggedin, useData, setUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}