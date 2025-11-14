'use client';

import { Users, Calculator, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Users,
    title: 'Group Trip Tracking',
    description: 'Manage shared expenses during trips and see who owes what in real-time',
    gradient: 'from-teal-100 to-emerald-100',
    iconColor: 'text-teal-600',
    borderColor: 'border-emerald-100/50'
  },
  {
    icon: Calculator,
    title: 'Smart Bill Splitting',
    description: 'Split bills fairly with our intelligent calculator and settle debts easily',
    gradient: 'from-amber-100 to-orange-100',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100/50'
  },
  {
    icon: TrendingUp,
    title: 'Expense Tracking',
    description: 'Monitor your spending habits and achieve your savings goals together',
    gradient: 'from-rose-100 to-pink-100',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-100/50'
  }
];

export default function FeatureCards() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)" }}
              className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border ${feature.borderColor} transition-all`}
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-5`}
              >
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}