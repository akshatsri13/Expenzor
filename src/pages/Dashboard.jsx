import React from 'react';
import { motion } from 'framer-motion';
import { useExpenses } from '../context/ExpenseContext';
import Navbar from '../components/Navbar';
import BudgetProgress from '../components/BudgetProgress';
import MonthlySpendingChart from '../charts/MonthlySpendingChart';
import CategoryPieChart from '../charts/CategoryPieChart';
import WeeklyBarChart from '../charts/WeeklyBarChart';
import { categories } from '../data/dummyData';
import { format } from 'date-fns';
import { MdTrendingUp, MdTrendingDown, MdAccountBalanceWallet } from 'react-icons/md';

const Dashboard = () => {
  const { expenses, monthlyTotal, totalExpenses } = useExpenses();
  const recentExpenses = expenses.slice(0, 5);

  const stats = [
    { 
      label: 'Monthly Spending', 
      value: `₹${monthlyTotal.toFixed(2)}`, 
      icon: MdTrendingUp, 
      color: 'text-primary-600',
      bg: 'bg-primary-50' 
    },
    { 
      label: 'Total Expenses', 
      value: `₹${totalExpenses.toFixed(2)}`, 
      icon: MdAccountBalanceWallet, 
      color: 'text-secondary-600',
      bg: 'bg-secondary-50' 
    },
    { 
      label: 'Recent Trans.', 
      value: recentExpenses.length, 
      icon: MdTrendingDown, 
      color: 'text-accent-600',
      bg: 'bg-accent-50' 
    },
  ];

  const getCategoryInfo = (catId) => categories.find(c => c.id === catId) || categories[categories.length - 1];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Dashboard" />
      
      <main className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card flex items-center space-x-4"
            >
              <div className={`p-4 rounded-2xl ${stat.bg} dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="text-3xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-8">
            <MonthlySpendingChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CategoryPieChart />
              <WeeklyBarChart />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <BudgetProgress />
            
            <div className="card">
              <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Recent Transactions</h3>
              <div className="space-y-4">
                {recentExpenses.length > 0 ? recentExpenses.map((exp) => {
                  const cat = getCategoryInfo(exp.category);
                  return (
                    <div key={exp.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                          <cat.icon />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{exp.title}</p>
                          <p className="text-xs text-slate-500">{format(new Date(exp.date), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">-₹{exp.amount.toFixed(2)}</p>
                    </div>
                  );
                }) : (
                  <p className="text-center text-slate-500 py-8">No transactions yet.</p>
                )}
              </div>
              {recentExpenses.length > 0 && (
                <button className="w-full mt-6 py-3 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  View All Transactions
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
