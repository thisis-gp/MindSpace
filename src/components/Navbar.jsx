// src/components/Navbar.jsx
import React from "react";
import { useAuth } from "./AuthContext"; // Import your AuthContext
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { brainwave } from "../assets"; // Import your logo

const Navbar = () => {
  const { logout } = useAuth(); // Destructure logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <a href="/">
        <img src={brainwave} alt="MindSpace Logo" className="h-10" />
      </a>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
