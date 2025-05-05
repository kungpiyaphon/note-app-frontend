import React from 'react'
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          📒 Welcome to NotesApp
        </h1>
        <p className="text-gray-700 mb-6">
          Organize your thoughts, ideas, and plans all in one place. Start taking notes today!
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-medium"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};