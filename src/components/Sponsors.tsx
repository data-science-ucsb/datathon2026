import React from 'react';
import { motion } from 'framer-motion';

/* ========================================
   ORIGINAL GSAP DRAGGABLE VERSION (COMMENTED OUT)
   ========================================
   
   Uncomment and use this if you want draggable sponsor logos:
   
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import googleLogo from '../assets/google.jpg';

gsap.registerPlugin(Draggable);

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

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          
          <div 
            ref={containerRef}
            className="relative min-h-[500px] w-full rounded-3xl bg-gray-950 border border-white/10 backdrop-blur-sm overflow-hidden p-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
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

======================================== */

const SPONSORS = [
  {
    name: 'Red Bull',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/RedBullEnergyDrink.svg',
    url: 'https://www.redbull.com/us-en'
  },
  {
    name: 'PyTorch',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg',
    url: 'https://pytorch.org/'
  },
  {
    name: 'SingleStore',
    logo: 'https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt65460a223657f85f/661047721952f027eefc0104/img_primary_opengraph_(1).png',
    url: 'https://singlestore.com/'
  },
  {
    name: 'Groq',
    logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/groq-text.png',
    url: 'https://groq.com/'
  },
  {
    name: 'Balsamiq',
    logo: 'https://img.utdstc.com/icon/ec0/4ea/ec04ea230c0ee7f85bd077fcd4c37f2f360b17aa6bebabe80dbbb127b58a4fed:200',
    url: 'https://balsamiq.com/'
  },
  {
    name: 'Caje Coffee',
    logo: 'https://caje.coffee/cdn/shop/files/Logo-shopify-200x100_410x.png?v=1613784592',
    url: 'https://caje.coffee/'
  },
  {
    name: 'AS Finance Committee',
    logo: 'https://asfb.as.ucsb.edu/files/2025/11/ASFC_Gull2_Bill.png',
    url: 'https://asfb.as.ucsb.edu/'
  },
];

interface SponsorsProps {
  title?: string;
  className?: string;
  showBackground?: boolean;
}

const Sponsors: React.FC<SponsorsProps> = ({
  title = "Past Sponsors",
  className = "",
  showBackground = true
}) => {
  return (
    <section id="sponsors" className={`relative py-20 overflow-hidden ${showBackground ? 'bg-white/5 backdrop-blur-sm' : ''} ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">
            Thank you to our amazing sponsors who made our events possible
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {SPONSORS.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
            >
              {/* Card */}
              <div className="relative h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-center overflow-hidden group-hover:border-blue-500/50 transition-all duration-300">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Logo */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="relative z-10 max-h-16 w-auto object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;