import React from 'react';
import { motion } from 'framer-motion';
import { useExpenses } from '../context/ExpenseContext';

const BudgetProgress = () => {
  const { monthlyTotal, budget, currencySymbol } = useExpenses();
  const percentage = Math.min((monthlyTotal / budget) * 100, 100);
  const isOverBudget = monthlyTotal > budget;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-slate-500 dark:text-slate-400 font-medium">Monthly Budget</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {currencySymbol}{monthlyTotal.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ {currencySymbol}{budget.toFixed(2)}</span>
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${isOverBudget ? 'bg-accent-100 text-accent-700' : 'bg-primary-100 text-primary-700'}`}>
          {isOverBudget ? 'Over Budget' : `${percentage.toFixed(0)}% Used`}
        </div>
      </div>

      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${isOverBudget ? 'bg-accent-500 shadow-lg shadow-accent-500/30' : 'bg-primary-500 shadow-lg shadow-primary-500/30'}`}
        />
      </div>

      {isOverBudget && (
        <p className="mt-3 text-sm text-accent-600 font-medium animate-pulse">
          ⚠️ Warning: You have exceeded your monthly budget!
        </p>
      )}
      
      {!isOverBudget && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Remaining: <span className="font-bold text-primary-600">{currencySymbol}{(budget - monthlyTotal).toFixed(2)}</span>
        </p>
      )}
    </div>
  );
};

export default BudgetProgress;
