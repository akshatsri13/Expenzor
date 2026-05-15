import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheckCircle, MdError, MdInfo, MdClose } from 'react-icons/md';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col space-y-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl border ${
                toast.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' 
                  : toast.type === 'error'
                  ? 'bg-rose-50 border-rose-100 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-300'
                  : 'bg-primary-50 border-primary-100 text-primary-800 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300'
              }`}
            >
              {toast.type === 'success' && <MdCheckCircle className="text-2xl" />}
              {toast.type === 'error' && <MdError className="text-2xl" />}
              {toast.type === 'info' && <MdInfo className="text-2xl" />}
              
              <span className="font-bold">{toast.message}</span>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-4 p-1 hover:bg-black/5 rounded-full transition-colors"
              >
                <MdClose />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
