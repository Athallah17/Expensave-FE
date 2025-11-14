'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  type: 'login' | 'register';
  title: string;
  subtitle: string;
}

const floatingIcons = [
  { Icon: Wallet, color: 'text-teal-400', delay: 0 },
  { Icon: TrendingUp, color: 'text-emerald-400', delay: 0.2 },
  { Icon: Users, color: 'text-rose-400', delay: 0.4 },
];

export default function AuthLayout({ children, type, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map(({ Icon, color, delay }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${index === 0 ? 'top-20 left-20' : index === 1 ? 'top-40 right-32' : 'bottom-32 left-40'}`}
          >
            <Icon className={`w-32 h-32 ${color}`} />
          </motion.div>
        ))}
      </div>

      {/* Back to Home */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-200/20 p-8 border border-white/50">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200/50">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-slate-600">{subtitle}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {children}
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 text-center"
          >
            {type === 'login' ? (
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                  Sign up for free
                </Link>
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                  Login
                </Link>
              </p>
            )}
          </motion.div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-slate-500">
            🔒 Secure • Free Forever • No Credit Card Required
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
