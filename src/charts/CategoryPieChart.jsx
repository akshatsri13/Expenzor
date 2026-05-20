import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useExpenses } from '../context/ExpenseContext';

const CategoryPieChart = () => {
  const { expenses, categories } = useExpenses();

  const data = categories.map(cat => {
    const total = expenses
      .filter(exp => exp.category === cat.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      name: cat.name,
      value: total,
      color: cat.color
    };
  }).filter(item => item.value > 0);

  return (
    <div className="card h-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Category Spread</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Distribution by sector</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
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
          <Legend 
            iconType="circle" 
            iconSize={8}
            layout="vertical" 
            align="right" 
            verticalAlign="middle" 
            wrapperStyle={{ 
              fontFamily: 'Inter', 
              fontSize: '12px',
              color: '#475569'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
