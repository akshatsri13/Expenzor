import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Moon, DollarSign, Bell, BellOff, Palette, LayoutDashboard,
  Download, Globe, IndianRupee, Gauge, Eye, ShieldCheck, Lock
} from 'lucide-react';
import { exportToCSV } from '../utils/csvExporter';

import ProfileHeader from '../components/settings/ProfileHeader';
import { Toggle, Dropdown, SegmentedControl, SettingRow } from '../components/settings/SettingControls';
import DangerZone from '../components/settings/DangerZone';
import SaveFeedback, { SuccessToast } from '../components/settings/SaveFeedback';

const SectionCard = ({ icon, iconBg, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30 overflow-hidden"
  >
    <div className="flex items-center gap-2.5 px-5 pt-5 pb-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">{title}</h3>
    </div>
    <div className="px-3 pb-4 divide-y divide-slate-100 dark:divide-slate-800/60">
      {children}
    </div>
  </motion.div>
);

const SettingsPage = () => {
  const { budget, setBudget, expenses, darkMode, setDarkMode, monthlyTotal, currency, setCurrency } = useExpenses();
  const { user, logout } = useAuth();

  const [tempBudget, setTempBudget] = useState(budget);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Preferences (local state for UI demo)
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [dashLayout, setDashLayout] = useState('grid');
  const [compactMode, setCompactMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  }, []);

  const handleSaveBudget = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setBudget(parseFloat(tempBudget));
      setSaveStatus('saved');
      showToast('Budget updated successfully!');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 600);
  };

  const handleReset = () => {
    if (user) {
      fetch(`http://localhost:8000/api/expenses/reset?user_id=${user.id}`, { method: 'POST' })
        .catch(err => console.warn('Could not reset backend data:', err));
    }
    localStorage.clear();
    showToast('All data has been reset');
    setTimeout(() => window.location.reload(), 1000);
  };


  const handleDelete = () => {
    localStorage.clear();
    logout();
  };

  const currencyOptions = [
    { value: 'INR', label: '₹ INR' },
    { value: 'USD', label: '$ USD' },
    { value: 'EUR', label: '€ EUR' },
    { value: 'GBP', label: '£ GBP' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
  ];

  const layoutOptions = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'compact', label: 'Compact' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <Navbar title="Settings" />

      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-16">
        {/* Profile Header */}
        <ProfileHeader user={user} budget={budget} monthlyTotal={monthlyTotal} expenses={expenses} />

        {/* Two column grid for settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Budget Settings */}
          <SectionCard
            icon={<IndianRupee size={16} className="text-white" />}
            iconBg="bg-gradient-to-br from-emerald-400 to-emerald-600"
            title="Budget"
            delay={0.1}
          >
            <div className="px-2 py-3">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Monthly Budget Limit (₹)</label>
              <div className="flex gap-3">
                <input
                  id="budget-input"
                  type="number"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-primary-500/40 focus:outline-none transition-all"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                />
                <button
                  id="save-budget-btn"
                  onClick={handleSaveBudget}
                  disabled={saveStatus === 'saving'}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold hover:from-primary-600 hover:to-primary-700 active:scale-95 transition-all shadow-md shadow-primary-500/20 disabled:opacity-60 min-w-[90px] flex items-center justify-center"
                >
                  <SaveFeedback status={saveStatus} />
                  {saveStatus === 'idle' && 'Update'}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">Used to track spending progress on dashboard.</p>
            </div>
          </SectionCard>

          {/* Appearance */}
          <SectionCard
            icon={<Palette size={16} className="text-white" />}
            iconBg="bg-gradient-to-br from-violet-400 to-purple-600"
            title="Appearance"
            delay={0.15}
          >
            <SettingRow
              icon={<Moon size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-indigo-400 to-indigo-600"
              label="Dark Mode"
              description="Switch to dark theme"
            >
              <Toggle id="dark-mode-toggle" enabled={darkMode} onChange={setDarkMode} />
            </SettingRow>
            <SettingRow
              icon={<LayoutDashboard size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-sky-400 to-sky-600"
              label="Dashboard Layout"
              description="Choose view style"
            >
              <SegmentedControl id="layout-control" value={dashLayout} onChange={setDashLayout} options={layoutOptions} />
            </SettingRow>
            <SettingRow
              icon={<Eye size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-slate-400 to-slate-600"
              label="Compact Mode"
              description="Reduce spacing"
            >
              <Toggle id="compact-toggle" enabled={compactMode} onChange={setCompactMode} />
            </SettingRow>
          </SectionCard>

          {/* Preferences */}
          <SectionCard
            icon={<Globe size={16} className="text-white" />}
            iconBg="bg-gradient-to-br from-cyan-400 to-teal-600"
            title="Preferences"
            delay={0.2}
          >
            <SettingRow
              icon={<IndianRupee size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-amber-400 to-orange-500"
              label="Currency"
              description="Display currency"
            >
              <Dropdown id="currency-select" value={currency} onChange={setCurrency} options={currencyOptions} />
            </SettingRow>
            <SettingRow
              icon={<Globe size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-teal-400 to-emerald-500"
              label="Language"
              description="Interface language"
            >
              <Dropdown id="language-select" value={language} onChange={setLanguage} options={languageOptions} />
            </SettingRow>
            <SettingRow
              icon={notifications ? <Bell size={16} className="text-white" /> : <BellOff size={16} className="text-white" />}
              iconBg={`bg-gradient-to-br ${notifications ? 'from-pink-400 to-rose-500' : 'from-slate-400 to-slate-500'}`}
              label="Notifications"
              description="Budget alerts & reminders"
            >
              <Toggle id="notif-toggle" enabled={notifications} onChange={setNotifications} />
            </SettingRow>
          </SectionCard>

          {/* Security & Privacy */}
          <SectionCard
            icon={<ShieldCheck size={16} className="text-white" />}
            iconBg="bg-gradient-to-br from-emerald-400 to-green-600"
            title="Security"
            delay={0.25}
          >
            <SettingRow
              icon={<Lock size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-blue-400 to-blue-600"
              label="Two-Factor Auth"
              description="Extra login security"
            >
              <Toggle id="2fa-toggle" enabled={twoFactor} onChange={setTwoFactor} />
            </SettingRow>
            <SettingRow
              icon={<Eye size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-fuchsia-400 to-pink-600"
              label="Privacy Mode"
              description="Hide amounts on screen"
            >
              <Toggle id="privacy-toggle" enabled={privacyMode} onChange={setPrivacyMode} />
            </SettingRow>
            <SettingRow
              icon={<Download size={16} className="text-white" />}
              iconBg="bg-gradient-to-br from-orange-400 to-amber-600"
              label="Export Data"
              description="Download as CSV"
            >
              <button
                id="export-btn"
                onClick={() => { exportToCSV(expenses); showToast('Data exported!'); }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Export
              </button>
            </SettingRow>
          </SectionCard>
        </div>

        {/* Danger Zone */}
        <DangerZone onReset={handleReset} onDelete={handleDelete} />
      </main>

      {/* Toast */}
      <SuccessToast show={toast.show} message={toast.message} />
    </div>
  );
};

export default SettingsPage;
