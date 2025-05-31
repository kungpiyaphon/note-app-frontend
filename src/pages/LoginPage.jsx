import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithMicrosoft } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaMicrosoft } from "react-icons/fa6";
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "../services/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      const accessToken = loginResponse.accessToken;
      const data = await loginWithMicrosoft(accessToken);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Microsoft login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center p-10 text-white">
        <div className="text-center max-w-sm">
          <h1 className="text-4xl font-bold mb-4">📒 NotesApp</h1>
          <p className="text-lg">
            Keep your thoughts organized and accessible. Take notes anytime,
            anywhere.
          </p>
        </div>
      </div>

      {/* Right Panel (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back 👋
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-3">
            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-300 transition"
            >
              <FaMicrosoft className="text-xl" />
              Sign in with Microsoft 365
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
