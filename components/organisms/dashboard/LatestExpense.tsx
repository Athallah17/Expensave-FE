'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Coffee, Car, Film } from 'lucide-react';
import { ExpenseItem } from '@/components/molecules/dashboard/ExpenseItem';

const expenses = [
  { id: 1, title: 'Grocery Shopping', category: 'Food', amount: -85.50, date: '2 hours ago', icon: ShoppingBag, color: 'bg-teal-100 text-teal-600' },
  { id: 2, title: 'Coffee Break', category: 'Food', amount: -12.30, date: '5 hours ago', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { id: 3, title: 'Uber Ride', category: 'Transport', amount: -25.00, date: 'Yesterday', icon: Car, color: 'bg-blue-100 text-blue-600' },
  { id: 4, title: 'Movie Tickets', category: 'Entertainment', amount: -45.00, date: '2 days ago', icon: Film, color: 'bg-purple-100 text-purple-600' },
  { id: 5, title: 'Gas Station', category: 'Transport', amount: -60.00, date: '3 days ago', icon: Car, color: 'bg-blue-100 text-blue-600' },
];

export function LatestExpensesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Latest Expenses</h3>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700">View All</button>
      </div>
      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <ExpenseItem key={expense.id} {...expense} delay={0.7 + index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}