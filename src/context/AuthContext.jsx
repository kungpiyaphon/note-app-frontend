import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the user's profile on app load
    useEffect(() => {
        const fetchProfile =  async () => {
            try {
                
            } catch (err) {
                
            }
        };
    },[])
  return (
    <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);