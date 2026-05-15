import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdTrendingUp, 
  MdAccountBalanceWallet, 
  MdAutoGraph, 
  MdFileUpload,
  MdCheck,
  MdArrowForward
} from 'react-icons/md';
import LandingNavbar from '../components/LandingNavbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // We removed the automatic redirect here as per user request.
    // Users will stay on the landing page until they click a login/app link.
  }, [user, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const features = [
    {
      title: "Daily Tracking",
      desc: "Real-time synchronization across all your accounts. Monitor cash flow with precision without lifting a finger.",
      icon: MdTrendingUp
    },
    {
      title: "Smart Budgets",
      desc: "Dynamic limits that adapt to your lifestyle. Stay on track with automated alerts and visual progress.",
      icon: MdAccountBalanceWallet
    },
    {
      title: "AI Insights",
      desc: "Predictive analysis of your spending habits. Experience the future of financial management.",
      icon: MdAutoGraph
    },
    {
      title: "CSV Export",
      desc: "Seamlessly export your data for accounting software or personal archives in one click.",
      icon: MdFileUpload
    }
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-primary-500/30 selection:text-primary-200">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-300">Expenzor Intelligence 2.0 Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              Manage Every Expense <br />
              <span className="bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent italic">Smarter with Expenzor.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              Experience the future of financial tracking. Our AI-powered platform automatically categorizes, analyzes, and optimizes your spending in real-time within a frictionless, glassmorphic workspace.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => navigate(user ? '/dashboard' : '/signup')}
                className="px-8 py-4 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95"
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
              </button>
              <button
                onClick={() => navigate(user ? '/dashboard' : '/login')}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center group"
              >
                View Dashboard
                <MdArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:ml-12"
          >
            {/* Mockup Dashboard */}
            <div className="relative bg-[#111827]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex space-x-2 mb-10">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Total Spend</p>
                  <p className="text-3xl font-black">$4,250.00</p>
                  <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary-500" 
                    />
                  </div>
                </div>
                
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">Recent</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">#1</div>
                        <span className="text-xs font-bold">Dining</span>
                      </div>
                      <span className="text-xs text-slate-400">-$120</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <MdTrendingUp size={14} />
                        </div>
                        <span className="text-xs font-bold">Travel</span>
                      </div>
                      <span className="text-xs text-slate-400">-$450</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI Card */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-8 right-[-1rem] bg-[#1f2937]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl max-w-[180px]"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 flex items-center justify-center">
                    <MdAutoGraph size={14} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">AI Insight</span>
                </div>
                <p className="text-[11px] leading-tight text-slate-300">Spending optimized by <span className="text-emerald-400 font-bold">14%</span> since last month.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Intelligent Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to control your finances, wrapped in a frictionless interface.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className={`p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group ${i === 0 || i === 3 ? 'lg:col-span-2 md:col-span-1' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="text-2xl text-primary-400" />
                </div>
                <h3 className="text-xl font-black mb-4">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose the plan that fits your financial complexity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Free */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <div className="mb-8">
                <span className="text-4xl font-black">$0</span>
                <span className="text-slate-500 ml-2">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Basic tracking', '1 linked account'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-400">
                    <MdCheck className="text-primary-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">Start Free</button>
            </motion.div>

            {/* Pro */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-2 border-primary-500/30 relative shadow-2xl flex flex-col"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-[10px] font-black uppercase tracking-widest">Most Popular</div>
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <div className="mb-8">
                <span className="text-4xl font-black">$12</span>
                <span className="text-slate-500 ml-2">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['AI Insights', 'Unlimited accounts', 'Smart Budgets'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-300">
                    <MdCheck className="text-primary-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-[#6366f1] text-white font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">Get Pro</button>
            </motion.div>

            {/* Enterprise */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <div className="mb-8">
                <span className="text-4xl font-black">Custom</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Custom integrations', 'Dedicated support'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-400">
                    <MdCheck className="text-primary-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">Contact Us</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <h2 className="text-2xl font-black mb-6">Expenzor</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              © 2024 Expenzor Intelligence. All rights reserved. Precise finance management for the modern world.
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <div className="flex flex-wrap gap-8 mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
            </div>
            <div className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Enter email for updates" 
                className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500"
              />
              <button className="bg-white text-slate-950 px-6 py-3 rounded-r-xl text-sm font-bold hover:bg-slate-200 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
