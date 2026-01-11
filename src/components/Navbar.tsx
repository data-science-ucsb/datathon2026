import React from 'react';
import { EVENT_NAME } from '../data';
import eventLogo from '../assets/Logo-1.jpg'; // Import the logo

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#main" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={eventLogo} 
            alt="Event Logo" 
            className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-blue-500/10" 
          />
          <span className="font-bold text-xl tracking-tight hidden sm:block">{EVENT_NAME}</span>
        </a>
        
        <div className="flex items-center gap-8">
          <a href="#main" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          {/* <a href="#sponsors" className="hover:text-blue-400 transition-colors">Sponsors</a> */}
          <a href="#gallery" className="hover:text-blue-400 transition-colors">Pictures</a>
          <button 
            disabled 
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
