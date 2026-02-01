import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import SponsorContact from './pages/SponsorContact';
import PrivateRoute from './components/PrivateRoute';

// Page transition variants - smoother and faster
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] // Custom easing for smoothness
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Wrapper component for animated pages
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/sponsor" element={<AnimatedPage><SponsorContact /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/reset-password" element={<AnimatedPage><ResetPassword /></AnimatedPage>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AnimatedPage>
                <Dashboard />
              </AnimatedPage>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

import { Toaster } from 'react-hot-toast';

// ... (existing helper function code omitted for brevity) ...

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen bg-gray-950 text-white">
          <Navbar />
          <AnimatedRoutes />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1f2937', // gray-800
                color: '#fff',
                border: '1px solid #374151', // gray-700
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
