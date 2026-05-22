import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';

const ProfileHeader = ({ user, budget, monthlyTotal, expenses }) => {
  const { currencySymbol } = useExpenses();
  const joinedDate = 'May 2026';
  const budgetUsed = budget > 0 ? ((monthlyTotal / budget) * 100).toFixed(0) : 0;
  const remaining = budget - monthlyTotal;
  const txCount = expenses.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-slate-700/50"
      style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 50%, #e11d48 100%)',
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'JD'}
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white truncate">{user?.name || 'Guest User'}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <Mail size={14} /> {user?.email || 'guest@expenzor.com'}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <Calendar size={14} /> Joined {joinedDate}
              </span>
            </div>
          </div>

          {/* Monthly summary cards */}
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <div className="px-4 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 min-w-[120px]">
              <p className="text-white/70 text-xs font-medium mb-0.5">Spent</p>
              <p className="text-white text-lg font-bold flex items-center gap-1">
                <TrendingDown size={16} className="text-red-300" />
                {currencySymbol}{monthlyTotal.toLocaleString()}
              </p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 min-w-[120px]">
              <p className="text-white/70 text-xs font-medium mb-0.5">Remaining</p>
              <p className="text-white text-lg font-bold flex items-center gap-1">
                <Wallet size={16} className="text-emerald-300" />
                {currencySymbol}{remaining > 0 ? remaining.toLocaleString() : 0}
              </p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 min-w-[120px]">
              <p className="text-white/70 text-xs font-medium mb-0.5">Budget Used</p>
              <p className="text-white text-lg font-bold">{budgetUsed}%</p>
              <div className="mt-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(budgetUsed, 100)}%`,
                    background: budgetUsed > 80 ? '#fca5a5' : '#6ee7b7',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
