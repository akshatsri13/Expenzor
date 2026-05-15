import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialExpenses } from '../data/dummyData';

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
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
