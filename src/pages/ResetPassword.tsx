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
      setTimeout(() => navigate('/login'), 2000);
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

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gray-950">
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