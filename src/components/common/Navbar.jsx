import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <span className="text-3xl">📒</span> NotesApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-gray-700 text-sm hidden sm:inline">
                👤 {user.email}
              </span>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded transition text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded transition text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded transition text-sm font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
