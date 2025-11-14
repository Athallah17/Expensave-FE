'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { loading, error, handleAuth } = useAuth('register');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700 block">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="••••••••"
          />
        </div>
        <p className="text-xs text-slate-500">Must be at least 8 characters</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-200/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {/* Terms */}
      <p className="text-xs text-slate-500 text-center">
        By signing up, you agree to our{' '}
        <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}