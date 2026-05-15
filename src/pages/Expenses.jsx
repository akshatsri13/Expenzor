import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdSearch, 
  MdFilterList, 
  MdDelete, 
  MdEdit, 
  MdFileDownload,
  MdInfo
} from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/dummyData';
import { exportToCSV } from '../utils/csvExporter';
import Navbar from '../components/Navbar';
import { format } from 'date-fns';

const ExpensesPage = () => {
  const { expenses, deleteExpense } = useExpenses();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showConfirm, setShowConfirm] = useState(null);

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (exp.notes && exp.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (catId) => categories.find(c => c.id === catId) || categories[categories.length - 1];

  const handleDelete = (id) => {
    deleteExpense(id);
    addToast('Expense deleted successfully!', 'info');
    setShowConfirm(null);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="My Expenses" />
      
      <main className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex-1 w-full max-w-md relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input 
              type="text" 
              placeholder="Search expenses..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-500 border-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <MdFilterList className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                className="pl-10 pr-8 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => exportToCSV(expenses)}
              className="p-3 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all"
              title="Export CSV"
            >
              <MdFileDownload className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Expense</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                <AnimatePresence>
                  {filteredExpenses.length > 0 ? filteredExpenses.map((exp) => {
                    const cat = getCategoryInfo(exp.category);
                    return (
                      <motion.tr 
                        key={exp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 dark:text-slate-100">{exp.title}</span>
                            {exp.notes && <span className="text-xs text-slate-500 truncate max-w-xs">{exp.notes}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                              <cat.icon />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {format(new Date(exp.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">
                          ${exp.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all">
                              <MdEdit className="text-xl" />
                            </button>
                            <button 
                              onClick={() => setShowConfirm(exp.id)}
                              className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-all"
                            >
                              <MdDelete className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center">
                          <MdInfo className="text-5xl text-slate-200 mb-4" />
                          <p className="text-slate-400 font-medium">No expenses found matching your filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdDelete className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">Are you sure?</h3>
              <p className="text-slate-500 text-center mb-8">This action cannot be undone. This expense will be permanently deleted.</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 py-3 btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(showConfirm)}
                  className="flex-1 py-3 bg-accent-600 text-white rounded-xl font-bold hover:bg-accent-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpensesPage;
