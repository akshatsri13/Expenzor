import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, RotateCcw, X } from 'lucide-react';

const ConfirmModal = ({ open, onClose, onConfirm, title, message }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-700"
        >
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={18} />
          </button>
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 text-center">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">{message}</p>
          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25">
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const DangerZone = ({ onReset, onDelete }) => {
  const [modal, setModal] = useState({ open: false, type: null });

  const handleConfirm = () => {
    if (modal.type === 'reset') onReset?.();
    if (modal.type === 'delete') onDelete?.();
    setModal({ open: false, type: null });
  };

  const modalConfig = {
    reset: { title: 'Reset All Data?', message: 'This will permanently delete all your expenses and reset settings to defaults. This action cannot be undone.' },
    delete: { title: 'Delete Account?', message: 'This will permanently delete your account and all associated data. This action cannot be undone.' },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border-2 border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <h3 className="text-base font-bold text-red-700 dark:text-red-400">Danger Zone</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-red-100 dark:border-red-500/20">
            <div className="flex items-center gap-3">
              <RotateCcw size={18} className="text-red-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Reset All Data</p>
                <p className="text-xs text-slate-400">Clear all expenses and reset to defaults</p>
              </div>
            </div>
            <button
              onClick={() => setModal({ open: true, type: 'reset' })}
              className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-red-100 dark:border-red-500/20">
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-red-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Delete Account</p>
                <p className="text-xs text-slate-400">Permanently remove your account</p>
              </div>
            </div>
            <button
              onClick={() => setModal({ open: true, type: 'delete' })}
              className="px-3.5 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      <ConfirmModal
        open={modal.open}
        onClose={() => setModal({ open: false, type: null })}
        onConfirm={handleConfirm}
        title={modalConfig[modal.type]?.title || ''}
        message={modalConfig[modal.type]?.message || ''}
      />
    </>
  );
};

export default DangerZone;
