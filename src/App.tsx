import React from 'react';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      
      <Home />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">D4G</div>
             <span className="font-bold text-lg">Data4Good 2025</span>
          </div>
          
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-gray-600 text-sm">
            © 2025 Data4Good Team. All rights reserved.
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
