import React from 'react';
import Navbar from '../components/Navbar';
import MonthlySpendingChart from '../charts/MonthlySpendingChart';
import CategoryPieChart from '../charts/CategoryPieChart';
import WeeklyBarChart from '../charts/WeeklyBarChart';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../data/dummyData';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
  const { expenses } = useExpenses();

  const categoryTotals = categories.map(cat => {
    const total = expenses
      .filter(exp => exp.category === cat.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { ...cat, total };
  }).sort((a, b) => b.total - a.total);

  const topCategory = categoryTotals[0];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Analytics" />
      
      <main className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MonthlySpendingChart />
          <div className="grid grid-cols-1 gap-8">
            <CategoryPieChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WeeklyBarChart />
          </div>
          
          <div className="card">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Category Breakdown</h3>
            <div className="space-y-6">
              {categoryTotals.filter(c => c.total > 0).map((cat, idx) => (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <cat.icon style={{ color: cat.color }} />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">₹{cat.total.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: cat.color, 
                        width: `${(cat.total / categoryTotals.reduce((a, b) => a + b.total, 0)) * 100}%` 
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white border-none">
            <p className="text-primary-100 text-sm font-medium mb-1">Top Category</p>
            <h4 className="text-2xl font-bold mb-4">{topCategory?.name || 'N/A'}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">₹{topCategory?.total.toFixed(2) || '0.00'}</span>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-secondary-600 to-secondary-700 text-white border-none">
            <p className="text-secondary-100 text-sm font-medium mb-1">Avg. Daily Spending</p>
            <h4 className="text-2xl font-bold mb-4">Last 30 Days</h4>
            <span className="text-3xl font-bold">
              ₹{(expenses.reduce((a, b) => a + b.amount, 0) / 30).toFixed(2)}
            </span>
          </div>

          <div className="card bg-gradient-to-br from-accent-600 to-accent-700 text-white border-none">
            <p className="text-accent-100 text-sm font-medium mb-1">Monthly Trend</p>
            <h4 className="text-2xl font-bold mb-4">Stable</h4>
            <div className="flex items-center space-x-1">
              <span className="text-sm">Based on current trajectory</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
