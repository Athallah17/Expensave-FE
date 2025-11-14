'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100/60 rounded-full mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-teal-700">Smart Money Management</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight"
        >
          Split Bills,
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"> Save Together</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Track expenses, manage group trips, and settle up with friends effortlessly. 
          Make saving money simple and collaborative.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/auth/register"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-200"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="/auth/login"
            whileHover={{ scale: 1.05, borderColor: 'rgb(20, 184, 166)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-2xl border-2 border-slate-200 hover:text-teal-600 transition-all font-medium flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm"
          >
            Login
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}