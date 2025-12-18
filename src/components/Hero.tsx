import React from 'react';
import { EVENT_NAME, EVENT_DATE, LOCATION } from '../data';
import dsLogo from '../assets/ds-logo.png';
import heroBg from '../assets/datathon1.jpg'; // Import the new image

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Image with Faded Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          className="w-full h-full object-cover opacity-100" 
          alt="Hackathon Background" 
        />
        {/* Gradient Overlay to ensure text readability and smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950"></div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full pointer-events-none"></div>
      

      <div className="z-10 max-w-4xl">
        {/* Organization Branding - Premium Card */}
        <div className="flex flex-col items-center mb-12">
          <div className="group relative">
            {/* Animated Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <a 
              href="https://datascienceucsb.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative flex items-center gap-5 px-8 py-4 rounded-2xl bg-gray-950/50 border border-white/10 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all"
            >
              <img src={dsLogo} className="w-12 h-12 object-contain drop-shadow-2xl" alt="DS UCSB Logo" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mb-0.5">Hosted By</span>
                <span className="text-2xl font-extrabold text-white tracking-tight">Data Science UCSB</span>
              </div>
            </a>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Registration Opening Soon
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
          <span className="gradient-text">{EVENT_NAME}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A 36-hour hackathon at UC Santa Barbara bringing together innovators, coders, and data enthusiasts to craft impactful solutions powered by data.
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
