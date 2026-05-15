import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MdDashboard, 
  MdList, 
  MdPieChart, 
  MdSettings, 
  MdAddCircle,
  MdClose,
  MdToday
} from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';
import { AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useExpenses();
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
    { name: 'Daily Tracker', path: '/daily', icon: MdToday },
    { name: 'Expenses', path: '/expenses', icon: MdList },
    { name: 'Analytics', path: '/analytics', icon: MdPieChart },
    { name: 'Settings', path: '/settings', icon: MdSettings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (sidebarOpen ? "open" : "closed") : "open"}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" }
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-64 h-screen fixed left-0 top-0 glass border-r border-slate-200 dark:border-slate-800 z-[60] flex flex-col shadow-2xl md:shadow-none"
      >
        <div className="p-6 md:p-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Expenzor
          </h1>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
            }}
            className="p-2 md:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative z-[70]"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
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
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 active:scale-95"
          >
            <MdAddCircle className="text-2xl mr-2" />
            <span>Add Expense</span>
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
