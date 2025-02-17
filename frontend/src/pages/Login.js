import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const location = useLocation();

  // Check for query parameter in URL (e.g., ?error=UserNotRegistered)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");
    if (errorParam === "UserNotRegistered") {
      setError("User not registered. Please register first.");
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    }
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    setLoading(true); // ✅ Set loading before redirecting
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ Show loading spinner while request is processing

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // ✅ Hide loading after response
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign In</h2>
        </div>
        {error && (
          <div className="text-red-600 text-center text-sm">{error}</div>
        )}

        {/* ✅ Google Login Button with Loading */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? (
            <span className="loader"></span> // ✅ Show spinner while loading
          ) : (
            <>
              <FcGoogle className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </>
          )}
        </button>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={loading} // ✅ Disable input while loading
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={loading} // ✅ Disable input while loading
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={loading} // ✅ Disable button while loading
          >
            {loading ? <span className="loader"></span> : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Register Here
          </Link>
        </p>
      </div>

      {/* ✅ CSS Spinner */}
      <style>
        {`
          .loader {
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3b82f6;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.div>
  );
}
