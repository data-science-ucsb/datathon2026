import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import googleLogo from '../assets/google.jpg';

gsap.registerPlugin(Draggable);

const SPONSORS = [
  { name: 'Google', logo: googleLogo, url: 'https://google.com' },
  { name: 'Google 2', logo: googleLogo, url: 'https://google.com' },
  { name: 'Google 3', logo: googleLogo, url: 'https://google.com' },
  { name: 'Google 4', logo: googleLogo, url: 'https://google.com' },
];

const Sponsors: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    Draggable.create(".draggable-sponsor", {
      bounds: containerRef.current,
      edgeResistance: 0.65,
      type: "x,y",
      onPress: function() {
        gsap.to(this.target, { scale: 1.1, duration: 0.2, zIndex: 50 });
      },
      onRelease: function() {
        gsap.to(this.target, { scale: 1, duration: 0.2, zIndex: 10 });
      }
    });
  }, []);

  return (
    <section id="sponsors" className="py-32 px-6 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Sponsors</h2>
        </div>

        {/* The Sandbox Container with Grid Layout */}
        <div className="relative group">
          {/* Glowing Boundary Line */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          
          <div 
            ref={containerRef}
            className="relative min-h-[500px] w-full rounded-3xl bg-gray-950 border border-white/10 backdrop-blur-sm overflow-hidden p-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {/* Subtle background watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none">
              <span className="text-[10vw] font-black uppercase">Sponsors</span>
            </div>

            {SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="draggable-sponsor cursor-grab active:cursor-grabbing p-6 rounded-2xl bg-gray-900/80 border border-white/10 shadow-2xl backdrop-blur-md hover:border-blue-500/50 transition-colors z-10 flex items-center justify-center w-full aspect-video max-w-[240px]"
              >
                <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  onClick={(e) => {
                    // Prevent accidental clicks while dragging
                    const x = gsap.getProperty(e.currentTarget.parentElement, "x") as number;
                    const y = gsap.getProperty(e.currentTarget.parentElement, "y") as number;
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                      e.preventDefault();
                    }
                  }}
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-12 md:h-16 w-auto object-contain pointer-events-none" 
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;