import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import eventLogo from './assets/Logo-1.jpg'; // Import the logo


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      
      <Home />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img 
                        src={eventLogo} 
                        alt="Event Logo" 
                        className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-blue-500/10" 
                      />
             <span className="font-bold text-lg">Data4Good 2026</span>
          </div>
          
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-gray-600 text-sm">
            Made with ❤️ by <a href="https://datascienceucsb.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Data Science UCSB</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
