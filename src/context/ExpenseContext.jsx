import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialExpenses, categories as initialCategories, iconMap } from '../data/dummyData';
import { MdAttachMoney } from 'react-icons/md';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('monthlyBudget');
    return saved ? JSON.parse(saved) : 2000;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('monthlyBudget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      amount: parseFloat(expense.amount),
      date: expense.date || new Date().toISOString().split('T')[0],
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === updatedExpense.id ? { ...updatedExpense, amount: parseFloat(updatedExpense.amount) } : exp
    ));
  };

  const addCategory = (name) => {
    const newCat = {
      id: `custom-${Date.now()}`,
      name: name,
      icon: 'MdAttachMoney',
      color: '#64748b' // Default slate color
    };
    setCategories(prev => {
      // Don't add if already exists
      if (prev.find(c => c.name.toLowerCase() === name.toLowerCase())) return prev;
      return [...prev, newCat];
    });
    return newCat;
  };

  const categoriesWithIcons = categories.map(cat => ({
    ...cat,
    icon: iconMap[cat.icon] || MdAttachMoney
  }));

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  
  const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const value = {
    expenses,
    budget,
    setBudget,
    darkMode,
    setDarkMode,
    addExpense,
    deleteExpense,
    updateExpense,
    totalExpenses,
    monthlyTotal,
    monthlyExpenses,
    categories: categoriesWithIcons,
    addCategory,
    sidebarOpen,
    setSidebarOpen
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
