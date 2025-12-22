import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import useAuth from '../../hook/UseAuth.jsx';
import {
  EmailValidationCheck,
  PasswordValidationCheck,
} from '../../utils/custom-validation/CustomValidation.jsx';

const Login = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    criteriaMode: 'all',
    shouldUnregister: true,
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await loginWithEmail(email, password);
      toast.success('Login successful! 🎉');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Login failed!');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success('Logged in with Google! 🎉');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Google Sign-in failed!');
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Login to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <input
              {...register('email', {
                required: 'Email is required',
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
              {...register('password', {
                required: 'Password is required',
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
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google Login */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </motion.button>

        {/* Navigation Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Register
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

export default Login;
