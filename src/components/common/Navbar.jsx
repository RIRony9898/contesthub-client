import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/UseAuth";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 shadow-md px-4 md:px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50"
    >
      <Link
        to="/"
        className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        ContestHub
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-black dark:text-white font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/all-contests" className="hover:text-blue-600 transition">
          All Contests
        </Link>
        <Link to="/leaderboard" className="hover:text-blue-600 transition">
          Leaderboard
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-black dark:text-white"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {loading ? (
          <p className="text-black dark:text-white text-sm">Loading...</p>
        ) : user ? (
          <div className="relative">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User Profile"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-black dark:text-white font-medium hover:text-blue-600 transition text-sm md:text-base"
          >
            {" "}
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className="text-black dark:text-white hover:text-blue-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/all-contests"
              className="text-black dark:text-white hover:text-blue-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Contests
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
