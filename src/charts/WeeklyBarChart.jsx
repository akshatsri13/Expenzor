import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useExpenses } from '../context/ExpenseContext';

const WeeklyBarChart = () => {
  const { expenses } = useExpenses();

  const startOfCurrWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrWeek, i));

  const data = weekDays.map(day => {
    const dayTotal = expenses
      .filter(exp => isSameDay(new Date(exp.date), day))
      .reduce((sum, exp) => sum + exp.amount, 0);

    return {
      day: format(day, 'EEE'),
      amount: dayTotal,
    };
  });

  return (
    <div className="card h-80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Weekly Cycle</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Spending patterns per weekday</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Inter' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Inter' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(241, 245, 249, 0.6)', radius: 8 }}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.96)', 
              borderRadius: '16px', 
              border: '1px solid #f1f5f9', 
              boxShadow: '0 12px 30px -4px rgba(17, 24, 39, 0.05)',
              fontFamily: 'Inter',
              fontSize: '13px'
            }}
            formatter={(value) => [`₹${parseFloat(value).toFixed(2)}`, 'Spend']}
          />
          <Bar dataKey="amount" radius={[5, 5, 0, 0]} maxBarSize={28}>
            {data.map((entry, index) => {
              // High spend alert (e.g. > 1500 is orange, > 3000 is red, otherwise primary blue)
              let barColor = '#3b82f6';
              if (entry.amount > 3000) {
                barColor = '#ef4444'; // Red alert
              } else if (entry.amount > 1500) {
                barColor = '#f97316'; // Orange warning
              }
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={barColor} 
                  opacity={0.85}
                  className="transition-all duration-300 hover:opacity-100"
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
