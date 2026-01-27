import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase/config';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      setError('Invalid or missing reset code');
      setVerifying(false);
      return;
    }

    // Verify the reset code and get the user's email
    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setValidCode(true);
        setVerifying(false);
      })
      .catch(() => {
        setError('Invalid or expired reset link');
        setVerifying(false);
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      
      await confirmPasswordReset(auth, oobCode!, newPassword);
      
      // Show success animation
      setSuccess(true);
      
      // Wait 2 seconds, then redirect
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successful! You can now log in.' } 
        });
      }, 2000);
    } catch (err: any) {
      setError('Failed to reset password. Please try again.');
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (error && !validCode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Invalid Link</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-green-400">Password Reset Successful! 🎉</h2>
          <p className="text-gray-400 mb-4">Your password has been updated.</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
            <span>Redirecting to login...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-gray-400 text-center mb-2">for {email}</p>
        <p className="text-gray-500 text-sm text-center mb-8">Enter your new password below</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Resetting Password...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;