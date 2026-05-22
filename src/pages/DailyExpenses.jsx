import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdCalendarToday, 
  MdChevronLeft, 
  MdChevronRight, 
  MdAdd,
  MdDelete,
  MdInfo
} from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const DailyExpenses = () => {
  const { expenses, deleteExpense, categories, currencySymbol } = useExpenses();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showConfirm, setShowConfirm] = useState(null);

  const dailyExpenses = useMemo(() => {
    return expenses.filter(exp => isSameDay(new Date(exp.date), selectedDate));
  }, [expenses, selectedDate]);

  const dailyTotal = useMemo(() => {
    return dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [dailyExpenses]);

  const getCategoryInfo = (catId) => categories.find(c => c.id === catId) || categories[categories.length - 1];

  const handleDelete = (id) => {
    deleteExpense(id);
    addToast('Expense deleted', 'info');
    setShowConfirm(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Daily Tracker" />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-6 md:p-8 space-y-8"
      >
        {/* Date Selector Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50">
            <button 
              onClick={() => setSelectedDate(subDays(selectedDate, 1))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <MdChevronLeft className="text-2xl text-slate-500" />
            </button>
            
            <div className="flex items-center space-x-3 px-4 min-w-[200px] justify-center">
              <MdCalendarToday className="text-primary-500 text-xl" />
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'EEEE, MMM dd')}
              </span>
            </div>

            <button 
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <MdChevronRight className="text-2xl text-slate-500" />
            </button>
          </div>

          <button 
            onClick={() => navigate('/add', { state: { defaultDate: format(selectedDate, 'yyyy-MM-dd') } })}
            className="flex items-center px-6 py-3.5 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95 w-full md:w-auto justify-center"
          >
            <MdAdd className="text-2xl mr-2" />
            Add for {format(selectedDate, 'MMM dd')}
          </button>
        </motion.div>

        {/* Daily Summary Card */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card md:col-span-1 bg-gradient-to-br from-primary-600 to-indigo-700 text-white border-none shadow-xl shadow-primary-500/20">
            <p className="text-sm font-medium opacity-80 uppercase tracking-wider mb-2">Total Spent Today</p>
            <h3 className="text-4xl font-black mb-1">{currencySymbol}{dailyTotal.toFixed(2)}</h3>
            <p className="text-xs opacity-60 italic">{dailyExpenses.length} transactions recorded</p>
          </div>
          
          <div className="card md:col-span-2 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Daily Insight</h4>
              <p className="text-slate-500 text-sm mt-1">
                {dailyTotal > 1000 
                  ? "You've spent quite a bit today. Consider checking your budget." 
                  : dailyTotal === 0 
                  ? "No expenses recorded yet for this date." 
                  : "Your spending is within a healthy daily range."}
              </p>
            </div>
            <div className="hidden sm:block w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <MdInfo className="text-3xl text-primary-500" />
            </div>
          </div>
        </motion.div>

        {/* Expenses List for the Day */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-slate-500 uppercase tracking-widest text-xs">Transactions List</h3>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {dailyExpenses.length > 0 ? dailyExpenses.map((exp) => {
                const cat = getCategoryInfo(exp.category);
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card flex items-center justify-between group hover:border-primary-500/30 transition-all p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                        <cat.icon />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{exp.title}</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {cat.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <p className="font-black text-slate-800 dark:text-slate-100">{currencySymbol}{exp.amount.toFixed(2)}</p>
                      <button 
                        onClick={() => setShowConfirm(exp.id)}
                        className="p-2 text-slate-300 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-950/30 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </motion.div>
                );
              }) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card py-16 text-center border-dashed"
                >
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdCalendarToday className="text-3xl text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium tracking-tight">No expenses for this day.</p>
                  <button 
                    onClick={() => navigate('/add', { state: { defaultDate: format(selectedDate, 'yyyy-MM-dd') } })}
                    className="mt-4 text-primary-600 font-bold text-sm hover:underline"
                  >
                    Add one now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-xl font-bold text-center mb-2">Delete Expense?</h3>
              <p className="text-slate-500 text-center mb-8">This will permanently remove the entry.</p>
              <div className="flex space-x-4">
                <button onClick={() => setShowConfirm(null)} className="flex-1 py-3 btn-secondary">Cancel</button>
                <button onClick={() => handleDelete(showConfirm)} className="flex-1 py-3 bg-accent-600 text-white rounded-xl font-bold hover:bg-accent-700 transition-all">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyExpenses;
