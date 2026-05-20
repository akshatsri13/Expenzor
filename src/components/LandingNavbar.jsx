import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdNotificationsNone } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-[#050810]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white">
            Expenzor
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {['Product', 'Features', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
            <MdNotificationsNone className="text-2xl" />
          </button> */}
          
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-bold shadow-lg shadow-primary-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              Go to Dashboard
            </button>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm font-bold text-white hover:text-primary-400 transition-colors">
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;
