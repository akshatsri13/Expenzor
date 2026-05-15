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
      <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.amount > 100 ? '#f43f5e' : '#8b5cf6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
