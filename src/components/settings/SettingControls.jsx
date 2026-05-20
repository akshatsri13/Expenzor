import React from 'react';
import { motion } from 'framer-motion';

// Toggle Switch
export const Toggle = ({ enabled, onChange, id }) => (
  <button
    id={id}
    role="switch"
    aria-checked={enabled}
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 ${
      enabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
    }`}
  >
    <motion.span
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`block w-5 h-5 rounded-full bg-white shadow-md absolute top-1 ${
        enabled ? 'left-6' : 'left-1'
      }`}
    />
  </button>
);

// Dropdown Select
export const Dropdown = ({ value, onChange, options, id }) => (
  <select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary-500/40 focus:outline-none transition-all cursor-pointer appearance-none pr-8 bg-no-repeat bg-[right_8px_center] bg-[length:16px]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

// Segmented Control
export const SegmentedControl = ({ value, onChange, options, id }) => (
  <div id={id} className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-0.5">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          value === opt.value
            ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// Setting Row wrapper
export const SettingRow = ({ icon, iconBg, label, description, children, id }) => (
  <div id={id} className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-200 group">
    <div className="flex items-center gap-3 min-w-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
        {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{description}</p>}
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);
