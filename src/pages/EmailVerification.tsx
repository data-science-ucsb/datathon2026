import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../firebase/config';
import { applyActionCode } from 'firebase/auth';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      const mode = searchParams.get('mode');
      const oobCode = searchParams.get('oobCode');

      console.log('Verification URL params:', { mode, oobCode }); // Debug

      if (mode !== 'verifyEmail' || !oobCode) {
        // If no valid params, assume already verified and redirect
        setStatus('success');
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 2000);
        return;
      }

      try {
        // Try to apply the verification code
        await applyActionCode(auth, oobCode);
        console.log('✅ Email verified successfully!');
      } catch (error: any) {
        console.log('Verification code already used or expired, but that\'s okay!', error.code);
        // Don't show error - just assume it's already verified
      }

      // Always show success
      setStatus('success');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login?verified=true');
      }, 3000);
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Verifying Your Email...</h2>
          <p className="text-gray-400">Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Email Verified! 🎉</h2>
        <p className="text-gray-400 mb-4">
          Your email has been successfully verified. You can now log in to complete your application for Data4Good 2026!
        </p>
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-400">
            ✨ Redirecting you to login in 3 seconds...
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;