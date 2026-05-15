import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { ToastProvider } from './context/ToastContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <ExpenseProvider>
      <ToastProvider>
        <Router>
          <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <Sidebar />
            
            <div className="flex-1 flex flex-col md:ml-64 h-full relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ToastProvider>
    </ExpenseProvider>
  );
}

export default App;
