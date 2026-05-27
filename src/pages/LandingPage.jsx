import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdTrendingUp, 
  MdAccountBalanceWallet, 
  MdAutoGraph, 
  MdFileUpload,
  MdCheck,
  MdArrowForward,
  MdSecurity,
  MdBolt,
  MdSync,
  MdPlayCircleOutline,
  MdEmail,
  MdLanguage,
  MdChatBubbleOutline,
  MdLockOutline
} from 'react-icons/md';
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import LandingNavbar from '../components/LandingNavbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingYearly, setBillingYearly] = useState(false);

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
      icon: MdTrendingUp,
      tag: "REAL-TIME",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Smart Budgets",
      desc: "Dynamic limits that adapt to your lifestyle. Stay on track with automated alerts and visual progress.",
      icon: MdAccountBalanceWallet,
      tag: "AUTOMATED",
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: "AI Insights",
      desc: "Predictive analysis of your spending habits. Experience the future of financial management.",
      icon: MdAutoGraph,
      tag: "AI-POWERED",
      color: "from-purple-500 to-indigo-400"
    },
    {
      title: "CSV Export",
      desc: "Seamlessly export your data for accounting software or personal archives in one click.",
      icon: MdFileUpload,
      tag: "PORTABLE",
      color: "from-orange-500 to-amber-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-primary-500/30 selection:text-primary-200">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating Pills */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 left-10 hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <MdSecurity className="text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Bank-Level Security</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 right-10 hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <MdBolt className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Real-Time Sync</span>
            </motion.div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-300">Expenzor Intelligence 2.0 Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              Manage Every Expense <br />
              <span className="bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic">Smarter with Expenzor.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              Experience the future of financial tracking. Our AI-powered platform automatically categorizes, analyzes, and optimizes your spending in real-time within a frictionless, glassmorphic workspace.
            </p>

            <div className="flex flex-wrap gap-5 mb-12">
              <button
                onClick={() => navigate(user ? '/dashboard' : '/signup')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95 border border-white/10"
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
              </button>
              <button
                onClick={() => navigate(user ? '/dashboard' : '/login')}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center group shadow-lg"
              >
                View Dashboard
                <MdArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trusted By Section */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Trusted by modern finance teams</p>
              <div className="flex items-center gap-6 opacity-60 grayscale">
                <div className="text-lg font-black tracking-tighter">Stripe</div>
                <div className="text-lg font-black tracking-tighter">Plaid</div>
                <div className="text-lg font-black tracking-tighter">Coinbase</div>
                <div className="text-lg font-black tracking-tighter">Square</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:ml-12"
          >
            {/* Glowing borders around dashboard */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-20" />
            
            {/* Mockup Dashboard */}
            <div className="relative bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="flex space-x-2 mb-10 relative">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
              
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Total Spend</p>
                  <p className="text-3xl font-black text-white">$4,250.00</p>
                  <div className="mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                    />
                  </div>
                </div>
                
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Recent</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">#1</div>
                        <span className="text-xs font-bold text-slate-200">Dining</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">-$120</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                          <MdTrendingUp size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-200">Travel</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">-$450</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI Card */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-8 right-[-1rem] bg-[#1f2937]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] max-w-[180px]"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <MdAutoGraph size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-white">AI Insight</span>
                </div>
                <p className="text-[11px] leading-tight text-slate-300">Spending optimized by <span className="text-emerald-400 font-bold">14%</span> since last month.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-6 relative overflow-hidden border-t border-white/5">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-600/8 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">

          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">About Expenzor</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white mb-6">
              Built for people who take <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400">their money seriously.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Expenzor was born from one frustration — existing finance tools were either too complex for everyday use or too simple to be meaningful. We built something different.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          >
            {[
              { value: '50K+', label: 'Transactions Tracked', color: 'from-primary-500 to-indigo-500' },
              { value: '99.9%', label: 'Uptime Reliability', color: 'from-emerald-500 to-teal-400' },
              { value: '< 200ms', label: 'Avg. Response Time', color: 'from-amber-500 to-orange-400' },
              { value: 'AES-256', label: 'Encryption Standard', color: 'from-purple-500 to-pink-400' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="relative p-8 rounded-[2rem] bg-[#0b1120] border border-white/5 hover:border-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                <p className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission + Values Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-4">Our Mission</p>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Radical clarity over your financial life.
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                We believe financial awareness is a superpower. Most people are flying blind — they earn, they spend, and they wonder where it all goes. Expenzor changes that by turning raw transaction data into clear, actionable intelligence you can actually use.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our AI doesn't just categorize — it understands context, detects patterns, and gives you a predictive view of your financial trajectory. We're not a budgeting app. We're your financial command center.
              </p>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {[
                {
                  icon: MdLockOutline,
                  title: 'Privacy by Design',
                  desc: 'Your data is yours. We never sell, share, or monetize your financial information. Ever.',
                  color: 'bg-emerald-500/10 text-emerald-400',
                },
                {
                  icon: MdBolt,
                  title: 'Speed & Reliability',
                  desc: 'Built on a modern architecture that delivers real-time sync with sub-200ms response times.',
                  color: 'bg-amber-500/10 text-amber-400',
                },
                {
                  icon: MdAutoGraph,
                  title: 'AI-First Approach',
                  desc: 'Every feature is backed by machine learning — from categorization to predictive budgeting.',
                  color: 'bg-primary-500/10 text-primary-400',
                },
                {
                  icon: MdSync,
                  title: 'Always Improving',
                  desc: 'We ship updates weekly. Our roadmap is public and driven by the community we serve.',
                  color: 'bg-purple-500/10 text-purple-400',
                },
              ].map((val) => (
                <div
                  key={val.title}
                  className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-[#0b1120] border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl ${val.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <val.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{val.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Security & Privacy Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] bg-gradient-to-br from-[#0d1525] to-[#080f1e] border border-white/8 p-10 md:p-16 mb-24 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <MdSecurity className="text-emerald-400 text-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Security & Privacy</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                  Bank-grade security. <br /> Zero compromises.
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Your financial data is protected with AES-256 encryption at rest and TLS 1.3 in transit. We never store raw credentials and undergo regular third-party security audits.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'AES-256 Encryption', sub: 'At rest & in transit' },
                  { label: 'TLS 1.3', sub: 'Secure connections' },
                  { label: 'Zero Data Selling', sub: 'Your data stays yours' },
                  { label: 'Regular Audits', sub: 'Third-party verified' },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mb-3" />
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to take control?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join thousands of professionals who've already made the switch to smarter financial management.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all active:scale-95 border border-white/10"
              >
                Start for Free
              </button>
              <a
                href="#features"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                Explore Features <MdArrowForward />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Section */}

      <section id="features" className="py-24 md:py-40 px-6 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Platform Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Intelligent Financial Control</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Everything you need to master your finances, wrapped in a frictionless, beautifully crafted interface.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className={`relative p-8 rounded-[2rem] bg-[#0b1120] border border-white/5 hover:border-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group overflow-hidden hover:-translate-y-1 ${i === 0 || i === 3 ? 'lg:col-span-2 md:col-span-1' : ''}`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <f.icon className="text-2xl text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-24 md:py-32 px-6 relative border-t border-white/5">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">See It In Action</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                A command center for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">your net worth.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {/* <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-lg">
                <MdPlayCircleOutline size={24} />
              </button> */}
              {/* <span className="text-sm font-bold text-slate-300">Watch Demo</span> */}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative rounded-[2.5rem] bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 p-4 md:p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Minimal browser/app header */}
            <div className="flex items-center space-x-2 mb-6 px-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              <div className="ml-4 flex-1 h-8 rounded-lg bg-white/5 flex items-center px-4">
                <span className="text-[10px] font-medium text-slate-500 tracking-wider">expenzor.com/dashboard</span>
              </div>
            </div>

            {/* Content Area Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                    <MdTrendingUp className="text-primary-400 text-xl" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Spending Velocity</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Your average daily spend is dropping. You are on track to save $400 this month.</p>
                </div>
                <div className="bg-[#1f2937]/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                    <MdAccountBalanceWallet className="text-indigo-400 text-xl" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Budget Health</h4>
                  <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 bg-[#1f2937]/30 rounded-3xl p-6 border border-white/5 min-h-[300px] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-center relative z-10">
                  <MdAutoGraph className="text-6xl text-slate-600 mx-auto mb-4 group-hover:scale-110 group-hover:text-primary-500/50 transition-all duration-700" />
                  <p className="text-slate-500 font-medium">Interactive Analytics Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Choose the plan that fits your financial complexity. No hidden fees, ever.</p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center mt-10 p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-1">
              <button
                onClick={() => setBillingYearly(false)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  !billingYearly ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingYearly(true)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  billingYearly ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Yearly
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                  billingYearly ? 'bg-emerald-500/20 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'
                }`}>SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-[#0b1120] border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Starter</p>
                <h3 className="text-2xl font-black text-white mb-1">Free</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="text-5xl font-black text-white">$0</span>
                  <span className="text-slate-500 mb-2">/month</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  { text: 'Basic expense tracking', desc: 'Up to 50 entries/month' },
                  { text: '1 budget category', desc: 'Simple limits' },
                  { text: 'CSV export', desc: 'Download your data' },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <MdCheck className="text-slate-400 text-xs" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-300">{item.text}</p>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 hover:-translate-y-0.5 transition-all active:scale-95"
              >Start Free</button>
            </motion.div>

            {/* Pro */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-10 rounded-[2.5rem] bg-gradient-to-b from-[#131e35] to-[#0b1120] border border-primary-500/40 shadow-[0_0_60px_-10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_80px_-10px_rgba(99,102,241,0.4)] hover:-translate-y-1 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl -z-0" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/30">Most Popular</div>
              
              <div className="relative z-10 mb-8">
                <p className="text-xs font-black uppercase tracking-widest text-primary-400 mb-3">Pro</p>
                <h3 className="text-2xl font-black text-white mb-1">Professional</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="text-5xl font-black text-white">${billingYearly ? '9' : '12'}</span>
                  <span className="text-slate-500 mb-2">/month</span>
                </div>
                {billingYearly && <p className="text-xs text-emerald-400 font-bold mt-1">Billed annually — save $36/yr</p>}
                <p className="text-sm text-slate-500 mt-2">For serious financial control</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1 relative z-10">
                {[
                  { text: 'AI-powered insights', desc: 'Predictive spending analysis' },
                  { text: 'Unlimited entries', desc: 'No monthly limits' },
                  { text: 'Smart budget alerts', desc: 'Real-time notifications' },
                  { text: 'Priority support', desc: 'Response within 24hrs' },
                  { text: 'Advanced CSV & PDF export', desc: 'Full data portability' },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <MdCheck className="text-primary-400 text-xs" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{item.text}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all active:scale-95"
              >Get Pro</button>
            </motion.div>

            {/* Enterprise */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[2.5rem] bg-[#0b1120] border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Scale</p>
                <h3 className="text-2xl font-black text-white mb-1">Enterprise</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="text-5xl font-black text-white">Custom</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">For teams & organizations</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  { text: 'Everything in Pro', desc: 'Full feature access' },
                  { text: 'Custom integrations', desc: 'Connect your tools' },
                  { text: 'Dedicated account manager', desc: 'White-glove support' },
                  { text: 'SLA & compliance reports', desc: 'Audit-ready' },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <MdCheck className="text-slate-400 text-xs" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-300">{item.text}</p>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 hover:-translate-y-0.5 transition-all active:scale-95">Contact Sales</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#020408] border-t border-white/[0.04] overflow-hidden">
        {/* Subtle glow divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-8 bg-primary-500/5 blur-2xl" />

        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-black text-lg">E</span>
                </div>
                <span className="text-xl font-black tracking-tighter text-white">Expenzor</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-8">
                AI-powered personal finance platform built for the modern professional. Track smarter, spend wiser.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[FaTwitter, FaGithub, FaLinkedin, FaDiscord].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Product column */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">Product</p>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">Company</p>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources column */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">Resources</p>
              <ul className="space-y-3">
                {['Help Center', 'Security', 'Privacy Policy', 'Terms of Service', 'Status'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-sm">
              <p className="text-xs font-black uppercase tracking-widest text-primary-400 mb-2">Newsletter</p>
              <h4 className="text-xl font-black text-white mb-2">Stay ahead of your finances</h4>
              <p className="text-sm text-slate-500">Get tips, updates, and product news. No spam, ever.</p>
            </div>
            <div className="flex w-full md:w-auto md:min-w-[380px]">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-1 bg-white/5 border border-white/10 rounded-l-2xl px-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/30 transition-all"
              />
              <button className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-3.5 rounded-r-2xl text-sm font-bold hover:from-primary-500 hover:to-indigo-500 transition-all whitespace-nowrap shadow-lg shadow-primary-500/20">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <p className="text-xs text-slate-600">© 2026 Expenzor Intelligence, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Cookies</a>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-500 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
