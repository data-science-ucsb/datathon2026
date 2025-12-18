
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Statistics Section */}
        <section className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-blue-500 mb-2">$50k+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Prizes</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-purple-500 mb-2">1000+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Hackers</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-pink-500 mb-2">48h</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Building</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">20+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Sponsors</div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">DQ</div>
             <span className="font-bold text-lg">DataQuest 2025</span>
          </div>
          
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-gray-600 text-sm">
            © 2025 DataQuest Team. All rights reserved.
          </div>
        </div>
      </footer>

      {/* AI Floatie */}
      <AIAssistant />
    </div>
  );
};

export default App;
