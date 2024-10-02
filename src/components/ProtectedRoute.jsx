import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import Auth Context

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Get user state from Auth Context

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" />} // Redirect to login if not authenticated
    />
  );
};

export default ProtectedRoute;
