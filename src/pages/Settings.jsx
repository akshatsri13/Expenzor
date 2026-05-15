import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useExpenses } from '../context/ExpenseContext';
import { motion } from 'framer-motion';
import { MdSettings, MdNotifications, MdAccountCircle, MdSecurity, MdFileDownload, MdDeleteForever } from 'react-icons/md';
import { exportToCSV } from '../utils/csvExporter';

const SettingsPage = () => {
  const { budget, setBudget, expenses } = useExpenses();
  const [tempBudget, setTempBudget] = useState(budget);
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSaveBudget = () => {
    setBudget(parseFloat(tempBudget));
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Settings" />
      
      <main className="p-8 max-w-4xl mx-auto space-y-8">
        <div className="card">
          <div className="flex items-center space-x-3 mb-8">
            <MdSettings className="text-2xl text-primary-600" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Budget Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Monthly Budget Limit (₹)</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                />
                <button 
                  onClick={handleSaveBudget}
                  className="px-6 py-3 btn-primary"
                >
                  {saveStatus ? 'Saved!' : 'Update'}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">This limit will be used to track your spending progress on the dashboard.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-8">
            <MdFileDownload className="text-2xl text-secondary-600" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Data Management</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">Export All Data</p>
                <p className="text-sm text-slate-500">Download your entire expense history as a CSV file.</p>
              </div>
              <button 
                onClick={() => exportToCSV(expenses)}
                className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-all"
              >
                <MdFileDownload className="text-xl" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent-50 dark:bg-accent-900/10 rounded-2xl border border-accent-100 dark:border-accent-900/20">
              <div>
                <p className="font-bold text-accent-700 dark:text-accent-400">Reset All Data</p>
                <p className="text-sm text-accent-600/70">Permanently delete all expenses and reset settings.</p>
              </div>
              <button className="p-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-all">
                <MdDeleteForever className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card opacity-50 cursor-not-allowed">
            <div className="flex items-center space-x-3 mb-6">
              <MdNotifications className="text-2xl text-slate-400" />
              <h3 className="text-lg font-bold text-slate-400">Notifications</h3>
            </div>
            <p className="text-sm text-slate-400">Configure how you receive alerts about your budget.</p>
            <span className="inline-block mt-4 text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Coming Soon</span>
          </div>

          <div className="card opacity-50 cursor-not-allowed">
            <div className="flex items-center space-x-3 mb-6">
              <MdSecurity className="text-2xl text-slate-400" />
              <h3 className="text-lg font-bold text-slate-400">Security</h3>
            </div>
            <p className="text-sm text-slate-400">Enable biometric lock or passcode for your data.</p>
            <span className="inline-block mt-4 text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Coming Soon</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
