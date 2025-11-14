'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 rounded-3xl p-12 text-white shadow-2xl shadow-teal-200/50"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Your Finances?
        </h2>
        <p className="text-teal-50 mb-8 text-lg">
          Join thousands of users who trust Expensave for their expense management
        </p>
        <motion.a
          href="/auth/register"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-2xl font-semibold transition-all"
        >
          Start Tracking Now
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}