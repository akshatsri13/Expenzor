import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays, startOfMonth, eachDayOfInterval } from 'date-fns';
import { useExpenses } from '../context/ExpenseContext';

const MonthlySpendingChart = () => {
  const { expenses, currencySymbol } = useExpenses();

  // Process data for the last 30 days
  const today = new Date();
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  const chartData = last30Days.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayTotal = expenses
      .filter(exp => exp.date === dateStr)
      .reduce((sum, exp) => sum + exp.amount, 0);

    return {
      date: format(date, 'MMM dd'),
      amount: dayTotal,
    };
  });

  return (
    <div className="card h-80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Spending Flow</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Daily transaction velocity (last 30 days)</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Inter' }}
            minTickGap={40}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Inter' }}
            tickFormatter={(value) => `${currencySymbol}${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.96)', 
              borderRadius: '16px', 
              border: '1px solid #f1f5f9', 
              boxShadow: '0 12px 30px -4px rgba(17, 24, 39, 0.05)',
              fontFamily: 'Inter',
              fontSize: '13px'
            }}
            itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            labelStyle={{ color: '#64748b', fontWeight: 'medium', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingChart;
