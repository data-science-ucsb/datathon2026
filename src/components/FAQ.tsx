import React, { useState } from 'react';
import { FAQ_DATA } from '../data';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-gray-950/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-16">Everything you need to know about the upcoming datathon.</p>
        
        <div className="space-y-6">
          {FAQ_DATA.map((item, index) => (
            <div key={index} className="group relative">
              {/* Animated Glow Effect - Radiates when open or hovered */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur transition duration-500 ${
                openIndex === index ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'
              }`}></div>
              
              <div 
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'bg-gray-950 border border-white/20' : 'bg-gray-950/40 border border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className={`text-lg font-semibold transition-colors duration-300 ${
                    openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.question}
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-500 ${
                      openIndex === index ? 'rotate-180 text-blue-400' : 'text-gray-500'
                    }`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
