'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  'No more awkward money conversations',
  'Automatic settlement calculations',
  'Track multiple groups simultaneously',
  'Beautiful, intuitive interface',
  'Fair split algorithms',
  'Free to use forever'
];

export default function BenefitsSection() {
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
    <section className="px-6 py-16 bg-gradient-to-b from-white to-teal-50/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-slate-800"
        >
          Why Choose Expensave?
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-teal-100/30"
            >
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <span className="text-slate-700">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}