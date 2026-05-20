import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMailOutline, MdLockOutline, MdVisibility, MdVisibilityOff, MdCheckCircleOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { login, user: loginUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      navigate('/dashboard');
    }
  }, [loginUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
      addToast('Logged in successfully!', 'success');
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      addToast(err.message || 'Failed to login', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-950 via-slate-900 to-[#2e1065] flex-col justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="font-bold text-white text-xl">E</span>
            </div>
            <span className="text-3xl font-bold tracking-tight">Expenzor</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Master your finances with <br className="hidden xl:block"/> unparalleled precision.
            </h1>
            <p className="text-lg text-slate-400 mb-12 max-w-md leading-relaxed">
              Experience the future of financial management. Secure, intelligent, and designed for sophisticated control.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-16">
          <p className="text-xs text-slate-500">© 2024 Expenzor Intelligence. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0f172a] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-sm">Log in to your Expenzor dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdMailOutline className="text-slate-500 text-lg" />
                    </div>
                    <input
                      type="email"
                      className="block w-full pl-11 pr-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLockOutline className="text-slate-500 text-lg" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-11 pr-12 py-3 bg-[#1e293b] border border-[#334155] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-primary-500 transition-all transform active:scale-[0.98]"
                >
                  {loading ? 'Logging in...' : 'LOG IN →'}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#334155]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#0f172a] text-slate-500 font-semibold uppercase tracking-wider">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button type="button" className="flex justify-center items-center py-2.5 px-4 border border-[#334155] rounded-xl shadow-sm bg-[#1e293b] text-sm font-medium text-slate-300 hover:bg-[#334155] hover:text-white transition-all">
                    <FcGoogle className="text-lg mr-2" />
                    Google
                  </button>
                  <button type="button" className="flex justify-center items-center py-2.5 px-4 border border-[#334155] rounded-xl shadow-sm bg-[#1e293b] text-sm font-medium text-slate-300 hover:bg-[#334155] hover:text-white transition-all">
                    <FaApple className="text-lg mr-2" />
                    Apple
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-white hover:text-primary-400 transition-colors">
                  Sign up
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="login-success"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center space-y-6 text-center z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)]"
              >
                <MdCheckCircleOutline className="text-white text-5xl" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Authenticated</h2>
                <p className="text-slate-400">Preparing your dashboard...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
