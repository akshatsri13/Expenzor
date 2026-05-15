import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMailOutline, MdLockOutline, MdVisibility, MdVisibilityOff, MdPersonOutline, MdAccountBalanceWallet, MdCheckCircleOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { signup, user: signupUser } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (signupUser) {
      navigate('/dashboard');
    }
  }, [signupUser, navigate]);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 5) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3', textColor: 'text-red-500' };
    if (password.length < 8) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/3', textColor: 'text-yellow-500' };
    return { label: 'Good', color: 'bg-emerald-400', width: 'w-full', textColor: 'text-emerald-400' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      signup(name, email, password);
      addToast('Account created successfully!', 'success');
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      addToast(err.message || 'Failed to create account', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      {/* Left side - Branding Card */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#1e1b4b] items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center shadow-2xl"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700">
            <MdAccountBalanceWallet className="text-3xl text-indigo-400" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 text-white">Expenzor<br/>Intelligence</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Precision financial management tailored for the modern enterprise. Secure, frictionless, and brilliantly designed.
          </p>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0f172a] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="signup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-md bg-[#162032] border border-slate-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-slate-400 text-sm">Join Expenzor to start managing your premium finances.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 tracking-wider">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdPersonOutline className="text-slate-500 text-lg" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-11 pr-4 py-2.5 bg-[#0b0f19] border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 tracking-wider">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdMailOutline className="text-slate-500 text-lg" />
                    </div>
                    <input
                      type="email"
                      className="block w-full pl-11 pr-4 py-2.5 bg-[#0b0f19] border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 tracking-wider">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLockOutline className="text-slate-500 text-lg" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-11 pr-12 py-2.5 bg-[#0b0f19] border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-500">Password Strength</span>
                      <span className={`text-xs font-semibold ${strength.textColor}`}>{strength.label}</span>
                    </div>
                    <div className="flex space-x-1 h-1">
                      <div className={`flex-1 rounded-full ${password.length > 0 ? (password.length < 5 ? 'bg-red-500' : 'bg-indigo-400') : 'bg-slate-800'}`}></div>
                      <div className={`flex-1 rounded-full ${password.length >= 5 ? (password.length < 8 ? 'bg-yellow-500' : 'bg-indigo-400') : 'bg-slate-800'}`}></div>
                      <div className={`flex-1 rounded-full ${password.length >= 8 ? 'bg-emerald-400' : 'bg-slate-800'}`}></div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#162032] focus:ring-indigo-500 transition-all mt-4"
                >
                  {loading ? 'Creating...' : 'Create Account →'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#162032] text-slate-500 tracking-wider">OR SIGN UP WITH</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button type="button" className="flex justify-center items-center py-2 px-4 border border-slate-800 rounded-lg shadow-sm bg-[#0b0f19] text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                    <FcGoogle className="text-lg mr-2" />
                    Google
                  </button>
                  <button type="button" className="flex justify-center items-center py-2 px-4 border border-slate-800 rounded-lg shadow-sm bg-[#0b0f19] text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                    <FaGithub className="text-lg mr-2" />
                    GitHub
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-white hover:text-indigo-400 transition-colors">
                  Log in
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup-success"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center space-y-6 text-center z-10 w-full max-w-md bg-[#162032] border border-slate-800 rounded-2xl p-12 shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                <MdCheckCircleOutline className="text-white text-4xl" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Account Created</h2>
                <p className="text-slate-400 text-sm">Welcome to Expenzor Intelligence.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute bottom-8 right-8 hidden lg:block z-0">
          <p className="text-xs text-slate-600">© 2024 Expenzor Intelligence</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
