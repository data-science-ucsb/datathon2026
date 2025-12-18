
import React from 'react';
import { EVENT_NAME } from '../data';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">DQ</div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">{EVENT_NAME}</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</a>
          <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
          <button 
            disabled 
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            Apply Soon
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
