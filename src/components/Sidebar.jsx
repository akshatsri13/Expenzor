import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MdDashboard, 
  MdList, 
  MdPieChart, 
  MdSettings, 
  MdAddCircle 
} from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';

const Sidebar = () => {
  const { darkMode } = useExpenses();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: MdDashboard },
    { name: 'Expenses', path: '/expenses', icon: MdList },
    { name: 'Analytics', path: '/analytics', icon: MdPieChart },
    { name: 'Settings', path: '/settings', icon: MdSettings },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass border-r border-slate-200 dark:border-slate-800 z-50 hidden md:flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Expenzor
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}
            `}
          >
            <item.icon className="text-xl mr-3" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <NavLink
          to="/add"
          className="flex items-center justify-center w-full py-4 bg-accent-600 text-white rounded-2xl font-bold shadow-lg shadow-accent-500/20 hover:bg-accent-700 transition-all duration-300 active:scale-95"
        >
          <MdAddCircle className="text-2xl mr-2" />
          <span>Add Expense</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
