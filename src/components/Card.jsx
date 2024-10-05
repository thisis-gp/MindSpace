// src/components/ui/Card.jsx
import React from "react";

const Card = ({ onClick, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
