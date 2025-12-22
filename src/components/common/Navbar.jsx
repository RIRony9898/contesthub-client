import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/UseAuth";
import ThemeToggle from "../../utils/theme/Theme";

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
          <motion.p
            className="text-black dark:text-white text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        ) : user ? (
          <div className="relative">
            <motion.img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User Profile"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-4 hover:ring-blue-500/50 transition-all duration-300 shadow-lg"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl py-3 z-50"
              >
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-lg mx-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">D</span>
                  </div>
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-black dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-lg mx-2"
                >
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 text-sm font-bold">L</span>
                  </div>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-2 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          </motion.div>
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
