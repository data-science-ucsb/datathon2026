import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      navigate('/login');
    }
  }, [success, countdown, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setError('Emails do not match');
      toast.error('Emails do not match');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Create the account (this automatically signs them in)
      const userCredential = await signup(email, password);
      
      // Save user data to Firestore
      await setDoc(doc(db, 'registrations', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        status: 'incomplete',
        role: 'student',
        createdAt: new Date().toISOString(),
        applicationCompleted: false
      });
      
      // IMPORTANT: Sign them out immediately after registration
      await signOut(auth);
      
      toast.success('Account created successfully!');
      setSuccess(true);
    } catch (err: any) {
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please sign in instead.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gray-950">
        <Toaster position="top-center" />
        <style>
          {`
            @keyframes scaleIn {
              from { transform: scale(0); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes checkmark {
              0% { stroke-dashoffset: 100; }
              100% { stroke-dashoffset: 0; }
            }
            .scale-in { animation: scaleIn 0.5s ease-out forwards; }
            .checkmark-path {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: checkmark 0.6s ease-out 0.3s forwards;
            }
          `}
        </style>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl p-12 text-center success-glow"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 scale-in border-2 border-green-500/30">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
              <path
                className="checkmark-path"
                d="M5 13l4 4L19 7"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-200">
              Account Created Successfully
            </h2>
            
            <div className="flex items-center justify-center gap-3 pt-2">
              <svg className="w-5 h-5 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-400">Redirecting you...</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-12 bg-gray-950">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-6xl"
      >
        <motion.div
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-0 bg-gray-900/40 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-2xl"
        >
          {/* Left Side - Logo & Background */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:flex flex-col justify-center items-center p-12 relative bg-cover bg-center"
            style={{ backgroundImage: 'url(/datathon1.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center space-y-6">
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                src="/data4good-letters.svg" 
                alt="Data Science UCSB" 
                className="w-64 h-64 mx-auto object-contain"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-4xl font-bold text-white">
                  Join Data4Good
                </h1>
                <p className="text-gray-300 text-base">
                  UC Santa Barbara Datathon
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-12 bg-gray-900/60"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-gray-400 text-sm">Sign up for Data4Good 2026</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500 text-sm"
                    placeholder="you@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-medium text-gray-300">Confirm Email</label>
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500 text-sm"
                    placeholder="you@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-medium text-gray-300">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500 text-sm"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-medium text-gray-300">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500 text-sm"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed font-semibold transition-all duration-200 mt-2 text-sm"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </motion.button>
              </form>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-gray-900/60 text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link to="/login" className="block mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-5 py-3 text-center border border-white/10 hover:bg-white/5 font-medium transition-all duration-200 text-sm"
                >
                  Sign In
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;