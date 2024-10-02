import React, { createContext, useContext, useState, useEffect } from "react";

// Create an AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUser(storedUser); // Set user state from local storage if available
    }
  }, []);

  const login = (userData) => {
    setUser(userData.id); // Set user state
    localStorage.setItem("userId", userData.id); // Store user ID in local storage
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("userId"); // Remove user ID from local storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
