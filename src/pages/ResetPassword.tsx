import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  useEffect(() => {
    // Verify we have the required parameters
    if (!oobCode || mode !== 'resetPassword') {
      toast.error('Invalid or expired reset link');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [oobCode, mode, navigate]);

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

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!oobCode) {
      toast.error('Invalid reset code');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success('Password reset successfully!');
      setSuccess(true);
    } catch (err: any) {
      let errorMessage = 'Failed to reset password';
      
      if (err.code === 'auth/expired-action-code') {
        errorMessage = 'Reset link has expired. Please request a new one.';
      } else if (err.code === 'auth/invalid-action-code') {
        errorMessage = 'Invalid reset link. Please request a new one.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return null; // Will redirect via useEffect
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-32 bg-gray-950">
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
          className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl p-12 text-center"
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
              Password Reset Successfully
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
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 bg-gray-950">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
          <p className="text-gray-400">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-gray-950/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition outline-none text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed font-semibold transition-all duration-200"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;