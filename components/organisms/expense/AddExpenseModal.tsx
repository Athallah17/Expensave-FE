// components/organisms/AddExpenseModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { useState } from 'react';
import { ShoppingBag, Coffee, Car, Film, Home, Utensils } from 'lucide-react';
import { useExpense } from '@/hooks/useExpense';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'food', label: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'transport', label: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-600' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
  { id: 'entertainment', label: 'Entertainment', icon: Film, color: 'bg-purple-100 text-purple-600' },
  { id: 'housing', label: 'Housing', icon: Home, color: 'bg-teal-100 text-teal-600' },
  { id: 'other', label: 'Other', icon: Coffee, color: 'bg-slate-100 text-slate-600' },
];

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const { createExpense } = useExpense();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    group: '',
    notes: '',
  });

  const handleSubmit = async () => {
    await createExpense({
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      group: formData.group || null,
      notes: formData.notes || '',
    });

    onClose();

    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      group: '',
      notes: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg 
            bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-50 p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Add Expense</h2>
                <p className="text-sm text-slate-600">Record a new expense</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Lunch at cafe"
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Amount *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.category === cat.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center mx-auto mb-1`}
                      >
                        <cat.icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700">{cat.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date + Group */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Group</label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Personal</option>
                    {/* Replace below with real groups from backend */}
                    <option value="bali-trip">Bali Trip 2024</option>
                    <option value="apartment">Apartment Rent</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional details..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>

              {/* Receipt */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Receipt (Optional)
                </label>
                <button className="w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl 
                hover:border-violet-500 hover:bg-violet-50 transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to upload receipt</p>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl 
                font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.amount || !formData.category}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white 
                rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Expense
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
