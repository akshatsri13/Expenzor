import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SaveFeedback = ({ status }) => {
  // status: 'idle' | 'saving' | 'saved'
  return (
    <AnimatePresence mode="wait">
      {status === 'saving' && (
        <motion.div
          key="saving"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2"
        >
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Saving...</span>
        </motion.div>
      )}
      {status === 'saved' && (
        <motion.div
          key="saved"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          className="flex items-center gap-1.5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 400, delay: 0.1 }}
          >
            <CheckCircle size={18} className="text-emerald-500" />
          </motion.div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Saved!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast notification
export const SuccessToast = ({ show, message }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30"
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.15 }}
        >
          <CheckCircle size={20} />
        </motion.div>
        <span className="text-sm font-semibold">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SaveFeedback;
