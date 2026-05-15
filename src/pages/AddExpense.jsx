import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdArrowBack, MdSave, MdClear } from 'react-icons/md';
import { useExpenses } from '../context/ExpenseContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/dummyData';
import Navbar from '../components/Navbar';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'other',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    addExpense(formData);
    addToast('Expense added successfully!');
    navigate('/expenses');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Add Expense" />
      
      <main className="p-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <MdArrowBack className="text-2xl text-slate-600 dark:text-slate-400" />
            </button>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Create New Expense</h2>
            <div className="w-10"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Expense Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Weekly Groceries"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Amount ($)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Date</label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                      formData.category === cat.id 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' 
                        : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    <cat.icon className="text-xl mb-1" />
                    <span className="text-xs font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Notes (Optional)</label>
              <textarea
                placeholder="Add more details..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all h-24 resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 flex items-center justify-center space-x-2 btn-secondary"
              >
                <MdClear />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-4 flex items-center justify-center space-x-2 btn-primary"
              >
                <MdSave />
                <span>Save Expense</span>
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ExpenseForm;
