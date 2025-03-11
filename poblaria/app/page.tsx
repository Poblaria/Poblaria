import React from "react";

const Project: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Welcome to POBLARIA!</h1>
        <p className="text-lg mt-4 text-gray-600">
          Discover Your Perfect Rural Escape
        </p>
      </header>

      <div className="flex space-x-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Button 1
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Button 2
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Button 3
        </button>
      </div>
    </div>
  );
};

export default Project;
