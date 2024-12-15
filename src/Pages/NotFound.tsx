// src/components/NotFound.jsx
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Go Back to Home
      </a>
    </div>
  );
};

export default NotFound;
