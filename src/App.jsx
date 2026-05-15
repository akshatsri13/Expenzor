import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import DailyExpenses from './pages/DailyExpenses';
import { motion } from 'framer-motion';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

// App Layout (Sidebar + Content)
const AppLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col md:ml-64 h-full relative"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected App Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/daily" element={<DailyExpenses />} />
                  <Route path="/expenses" element={<ExpensesPage />} />
                  <Route path="/add" element={<AddExpense />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Catch all redirect to landing or dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
