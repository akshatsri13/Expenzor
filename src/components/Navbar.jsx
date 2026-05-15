import React from 'react';
import { MdDarkMode, MdLightMode, MdNotifications, MdSearch } from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';

const Navbar = ({ title }) => {
  const { darkMode, setDarkMode } = useExpenses();

  return (
    <header className="h-20 glass border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
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

        <button className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm relative">
          <MdNotifications className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
          JD
        </div>
      </div>
    </header>
  );
};

export default Navbar;
