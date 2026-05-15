import React, { useState, useRef, useEffect } from 'react';
import { MdDarkMode, MdLightMode, MdNotifications, MdSearch, MdPerson, MdSettings, MdLogout, MdMenu } from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const { darkMode, setDarkMode, setSidebarOpen } = useExpenses();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'JD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="h-20 glass border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <MdMenu className="text-2xl" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-300 w-64"
          />
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
        >
          {darkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>

        {/* <button className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm relative">
          <MdNotifications className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button> */}

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform duration-200"
          >
            {getInitials(user?.name)}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user?.name || 'Guest User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || 'guest@expenzor.com'}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <MdPerson className="text-lg mr-3 text-slate-400" />
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <MdSettings className="text-lg mr-3 text-slate-400" />
                    Settings
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800/60 my-1"></div>
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <MdLogout className="text-lg mr-3" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
