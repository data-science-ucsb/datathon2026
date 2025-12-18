
import React from 'react';
import { EVENT_NAME, EVENT_DATE, LOCATION } from '../data';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[128px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[128px] rounded-full pointer-events-none"></div>
      
      <div className="z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Registration Opening Soon
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
          Code for Good at <br />
          <span className="gradient-text">{EVENT_NAME}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The premier datathon for innovators, data scientists, and creative minds. Join us for 48 hours of building, learning, and competing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg font-medium text-gray-300 mb-12">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {EVENT_DATE}
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {LOCATION}
          </div>
        </div>

        <button 
          className="px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold text-lg glow shadow-lg transform active:scale-95 opacity-50 cursor-not-allowed"
          title="Opening Summer 2025"
        >
          Registration Opens Soon
        </button>
      </div>

      <div className="absolute bottom-12 animate-bounce">
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
};

export default Hero;
