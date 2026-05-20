import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialExpenses, categories as initialCategories, iconMap } from '../data/dummyData';
import { useAuth } from './AuthContext';
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
  const { user } = useAuth();
  const API_BASE_URL = 'http://localhost:8000/api';

  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(2000);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch initial data from FastAPI backend on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user) return;
      try {
        // Fetch expenses
        const expensesRes = await fetch(`${API_BASE_URL}/expenses?user_id=${user.id}`);
        if (expensesRes.ok) {
          const expensesData = await expensesRes.json();
          setExpenses(expensesData);
        } else {
          throw new Error('Failed to fetch expenses');
        }

        // Fetch settings
        const settingsRes = await fetch(`${API_BASE_URL}/settings?user_id=${user.id}`);
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setBudget(settingsData.budget);
          setDarkMode(settingsData.dark_mode);
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.warn("Backend server not reachable. Using local localStorage fallback.", error);
        
        // Fallback to localStorage if backend is down
        const savedExpenses = localStorage.getItem('expenses');
        setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);

        const savedBudget = localStorage.getItem('monthlyBudget');
        setBudget(savedBudget ? JSON.parse(savedBudget) : 2000);

        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode ? JSON.parse(savedDarkMode) : false);
      }
    };

    fetchInitialData();
  }, [user]);

  // Sync state modifications with localStorage cache as fallback
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
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

  // DB Sync helper actions
  const updateBudgetOnBackend = async (newBudget) => {
    try {
      if (user) {
        await fetch(`${API_BASE_URL}/settings?user_id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: parseFloat(newBudget) })
      });
      }
    } catch (error) {
      console.warn("Failed to sync budget with backend.", error);
    }
  };

  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
    updateBudgetOnBackend(newBudget);
  };

  const updateDarkModeOnBackend = async (newDarkMode) => {
    try {
      if (user) {
        await fetch(`${API_BASE_URL}/settings?user_id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dark_mode: newDarkMode })
      });
      }
    } catch (error) {
      console.warn("Failed to sync dark mode with backend.", error);
    }
  };

  const handleSetDarkMode = (newDarkMode) => {
    setDarkMode(newDarkMode);
    updateDarkModeOnBackend(newDarkMode);
  };

  // CRUD Actions
  const addExpense = async (expense) => {
    const expensePayload = {
      title: expense.title,
      amount: parseFloat(expense.amount),
      category: expense.category,
      date: expense.date || new Date().toISOString().split('T')[0],
      notes: expense.notes || ""
    };

    try {
      if (!user) throw new Error("No user logged in");
      const res = await fetch(`${API_BASE_URL}/expenses?user_id=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expensePayload)
      });
      if (res.ok) {
        const newExpense = await res.json();
        setExpenses(prev => [newExpense, ...prev]);
      } else {
        throw new Error('Server returned non-OK response');
      }
    } catch (error) {
      console.warn("Failed to sync expense add with backend. Adding locally.", error);
      const fallbackExpense = { ...expensePayload, id: Date.now() };
      setExpenses(prev => [fallbackExpense, ...prev]);
    }
  };

  const deleteExpense = async (id) => {
    try {
      if (!user) throw new Error("No user logged in");
      const res = await fetch(`${API_BASE_URL}/expenses/${id}?user_id=${user.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
      } else {
        throw new Error('Server returned non-OK response');
      }
    } catch (error) {
      console.warn("Failed to sync expense delete with backend. Deleting locally.", error);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    }
  };

  const updateExpense = async (updatedExpense) => {
    const expensePayload = {
      title: updatedExpense.title,
      amount: parseFloat(updatedExpense.amount),
      category: updatedExpense.category,
      date: updatedExpense.date,
      notes: updatedExpense.notes
    };

    try {
      if (!user) throw new Error("No user logged in");
      const res = await fetch(`${API_BASE_URL}/expenses/${updatedExpense.id}?user_id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expensePayload)
      });
      if (res.ok) {
        const savedExpense = await res.json();
        setExpenses(prev => prev.map(exp => 
          exp.id === savedExpense.id ? savedExpense : exp
        ));
      } else {
        throw new Error('Server returned non-OK response');
      }
    } catch (error) {
      console.warn("Failed to sync expense update with backend. Updating locally.", error);
      setExpenses(prev => prev.map(exp => 
        exp.id === updatedExpense.id ? { ...updatedExpense, amount: parseFloat(updatedExpense.amount) } : exp
      ));
    }
  };

  const addCategory = (name) => {
    const newCat = {
      id: `custom-${Date.now()}`,
      name: name,
      icon: 'MdAttachMoney',
      color: '#64748b' // Default slate color
    };
    setCategories(prev => {
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
    setBudget: handleSetBudget,
    darkMode,
    setDarkMode: handleSetDarkMode,
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
