import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hook/UseAuth";
import { userNameValidation } from "../../utils/built-in-validation/built-in-validation.jsx";
import {
  EmailValidationCheck,
  PasswordValidationCheck,
  UrlValidationCheck,
} from "../../utils/custom-validation/CustomValidation.jsx";

const Register = () => {
  const { registerWithEmail, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    criteriaMode: "all",
    shouldUnregister: true,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;
    try {
      await registerWithEmail(email, password, name, photoURL, selectedRole);
      toast.success("Registration successful! 🎉");
      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join our community today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                ...userNameValidation,
              })}
              className="input"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="error flex items-center gap-1">
                <FaTimesCircle size={12} /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                ...EmailValidationCheck,
              })}
              className="input"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="error flex items-center gap-1">
                <FaTimesCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                ...PasswordValidationCheck,
              })}
              className="input"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="error flex items-center gap-1">
                <FaTimesCircle size={12} /> {errors.password.message}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Password must be at least 6 characters, include uppercase, number,
              and special character
            </p>
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">Photo URL</label>
            <input
              {...register("photoURL", {
                required: "Photo URL is required",
                ...UrlValidationCheck,
              })}
              className="input"
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photoURL && (
              <p className="error flex items-center gap-1">
                <FaTimesCircle size={12} /> {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="label">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="input"
            >
              <option value="user">User</option>
              <option value="creator">Creator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Home Button */}
        <motion.div className="mt-4" whileHover={{ scale: 1.02 }}>
          <Link to="/">
            <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              ⬅ Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
