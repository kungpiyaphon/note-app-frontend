import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Loading } from "../pages/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the user's profile on app load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/mongo/auth/profile");
        setUser(response.data.user); // restore user state
      } catch (err) {
        console.error("Not authenticated:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = (userData) => {
    setUser(userData); // save user info in the context
    navigate("/dashboard"); // redirect to notes page after login
  };

  const logout = async () => {
    try {
      await api.post("/mongo/auth/logout");
      setUser(null);
      navigate("/login"); // redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return <Loading />; // show loading indicator while restoring session
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);