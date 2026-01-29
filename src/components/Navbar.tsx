import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EVENT_NAME } from '../data';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/Logo-1.jpg"
            alt="Event Logo"
            className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-blue-500/10"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:block">{EVENT_NAME}</span>
        </Link>

        <div className="flex items-center gap-6">
          {location.pathname === '/' ? (
            <>
              <a href="#main" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#gallery" className="hover:text-blue-400 transition-colors">Pictures</a>
              <a href="#sponsors" className="hover:text-blue-400 transition-colors">Past Sponsors</a>
              {/* <Link to="/sponsor" className="hover:text-blue-400 transition-colors">Sponsor Us</Link> */}
              <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
            </>
          ) : (
            <>
              <Link to="/#main" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/#gallery" className="hover:text-blue-400 transition-colors">Pictures</Link>
              <Link to="/#sponsors" className="hover:text-blue-400 transition-colors">Past Sponsors</Link>
              <Link to="/sponsor" className="hover:text-blue-400 transition-colors">Sponsor Us</Link>
              <Link to="/#faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
            </>
          )}

          {currentUser ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 text-blue-300 hover:text-blue-200 font-medium transition-all duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 text-blue-300 hover:text-blue-200 font-medium transition-all duration-300"
            >
              Register / Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;