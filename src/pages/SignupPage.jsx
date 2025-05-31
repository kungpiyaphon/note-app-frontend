import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser, signupWithMicrosoft } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaUserPlus } from "react-icons/fa";
import { FaMicrosoft, FaLine } from "react-icons/fa6";
import { loginRequest } from "../services/authConfig";
import { useMsal } from "@azure/msal-react";
import { toast } from "react-toastify";

export const SignupPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { instance } = useMsal();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({ fullName, email, password });
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const accessToken = loginResponse.accessToken;
      const account = loginResponse.account;
      console.log(account);
      const data = await signupWithMicrosoft(accessToken);
      setUser(data.user);
      if (!data.newUser) {
        toast.info("บัญชีนี้เคยลงทะเบียนแล้ว สามารถล็อกอินเข้าใช้งานได้เลย");
      }
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLineSignup = () => {
    console.log("Sign up with LINE clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center">
          <FaUserPlus className="text-4xl text-green-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Sign Up
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Join us and start your journey
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            <FaUserPlus />
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Sign up with Microsoft & LINE */}
        <div className="space-y-3">
          <button
            onClick={handleMicrosoftSignup}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          >
            <FaMicrosoft className="text-xl" />
            Sign up with Microsoft 365
          </button>

          <button
            onClick={handleLineSignup}
            className="w-full flex items-center justify-center gap-2 border border-green-400 py-2 rounded-lg text-green-600 hover:bg-green-200 transition"
          >
            <FaLine className="text-xl" />
            Sign up with LINE
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
