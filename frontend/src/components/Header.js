import { useState, useEffect } from "react";
import { FaBriefcase, FaRegUser, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    fetchUserSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", aria: "Navigate to home page" },
    { name: "Find Jobs", path: "/jobs", aria: "Browse available job listings" },
    { name: "Companies", path: "/companies", aria: "View featured companies" },
    {
      name: "Career Tips",
      path: "/blog",
      aria: "Access career resources and articles",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 py-3" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="WorkSphere Home"
          >
            <FaBriefcase className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold text-gray-900 font-inter">
              Work<span className="text-blue-600">Sphere</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors font-medium text-sm"
                    aria-label={link.aria}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors font-medium text-sm"
                    aria-label="Your Profile"
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Login or register account"
                >
                  <FaRegUser className="w-4 h-4" />
                  <span className="text-sm font-medium">Login/Register</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <ul className="pt-4 pb-2 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={link.aria}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Your Profile"
                >
                  Profile
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-2"
                  aria-label="Mobile logout button"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Mobile login button"
                >
                  Login/Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
