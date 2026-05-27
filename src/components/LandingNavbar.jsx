import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCheckCircle, MdLightMode, MdDarkMode, MdMenu, MdClose } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpenseContext';

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { darkMode, setDarkMode } = useExpenses();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Security', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
          isScrolled 
            ? 'bg-[#050810]/70 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Trust Badge */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white text-lg leading-none">E</span>
              </div>
              <span>Expenzor</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <MdCheckCircle className="text-emerald-400 text-sm" />  
              <span className="text-[11px] font-medium text-slate-300 tracking-wide">Trusted by top professionals</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {darkMode ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            </button> */}
            
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all active:scale-95 border border-white/10"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-2 py-2">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-bold shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 transition-all active:scale-95 border border-transparent hover:bg-slate-100"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050810]/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="h-px w-full bg-white/10 my-4" />
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 bg-white/5 text-white rounded-xl"
                >
                  {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
                </button>
                <span className="text-sm font-medium text-slate-400">Toggle Theme</span>
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                {user ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full py-4 rounded-xl bg-white text-slate-950 font-bold text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
