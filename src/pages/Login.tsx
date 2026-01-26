import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err: any) {
      let errorMessage = 'Failed to log in. Please try again.';
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setError('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }

    try {
      setError('');
      setResetMessage('');
      setResetLoading(true);
      
      const actionCodeSettings = {
        url: 'https://datathon.datascienceucsb.org/reset-password',
        handleCodeInApp: true,
      };
      
      await sendPasswordResetEmail(auth, resetEmail, actionCodeSettings);
      
      setResetMessage('Password reset email sent! Check your inbox and spam folder.');
      toast.success('Reset email sent! Check your spam folder too.', { duration: 5000 });
      setTimeout(() => {
        setShowResetModal(false);
        setResetMessage('');
        setResetEmail('');
      }, 3000);
    } catch (err: any) {
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gray-950">
      <Toaster position="top-center" />
      

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl"
      >
        <motion.div
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-0 bg-gray-900/40 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-2xl "
        >
          {/* Left Side - Logo & Background */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:flex flex-col justify-center items-center p-12 relative bg-cover bg-center"
            style={{ backgroundImage: 'url(/datathon9.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center space-y-6">
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                src="/data4good-letters.svg" 
                alt="Data Science UCSB" 
                className="w-48 h-48 mx-auto object-contain"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold text-white">
                  Data4Good 2026
                </h1>
                <p className="text-gray-300 text-sm">
                  UC Santa Barbara Datathon
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-12 bg-gray-900/60"
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <p className="text-gray-400">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetModal(true);
                        setResetEmail(email);
                        setError('');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 transition font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed font-semibold transition-all duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </motion.button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-gray-900/60 text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <Link to="/register" className="block mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full px-6 py-4 text-center border border-white/10 hover:bg-white/5 font-medium transition-all duration-200"
                >
                  Create Account
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
                  <p className="text-gray-400 text-sm">
                    Enter your email to receive a password reset link
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowResetModal(false);
                    setError('');
                    setResetMessage('');
                  }}
                  className="text-gray-400 hover:text-white transition p-1"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {resetMessage && (
                <div className="mb-4 p-4 bg-green-500/10 border-l-4 border-green-500 text-green-400 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{resetMessage}</span>
                </div>
              )}

              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={resetLoading}
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed font-semibold transition-all duration-200"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Link'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;