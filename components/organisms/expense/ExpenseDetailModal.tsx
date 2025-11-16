'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, Receipt, User, Calendar as CalendarIcon } from 'lucide-react';
import { ExpenseCardData } from '@/components/molecules/expense/ExpenseCard';
import { CategoryBadge } from '@/components/atoms/CategoryBadges';
import { AmountDisplay } from '@/components/atoms/AmountDisplay';
import { useExpense } from '@/hooks/useExpense';

interface ExpenseDetailModalProps {
  expense: ExpenseCardData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpenseDetailModal({ expense, isOpen, onClose }: ExpenseDetailModalProps) {
  if (!expense) return null;

  const { updateExpense, deleteExpense } = useExpense();

  // 🔥 EDIT FORM STATE
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    paidBy: expense.paidBy,
  });

  const handleChange = (e: any) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await updateExpense(expense.id, form);
    setIsEditing(false);
    onClose();
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-50 p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {isEditing ? (
                    <input
                      name="title"
                      className="border p-2 rounded w-full"
                      value={form.title}
                      onChange={handleChange}
                    />
                  ) : (
                    expense.title
                  )}
                </h2>

                {!isEditing && (
                  <CategoryBadge
                    icon={expense.categoryIcon}
                    label={expense.category}
                    color={expense.categoryColor}
                  />
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 mb-6">
              <p className="text-sm text-slate-600 mb-2">Amount</p>

              {isEditing ? (
                <input
                  name="amount"
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.amount}
                  onChange={handleChange}
                />
              ) : (
                <AmountDisplay amount={expense.amount} size="lg" />
              )}
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              {/* Date */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="font-semibold text-slate-800">{expense.date}</p>
                </div>
              </div>

              {/* Paid By */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Paid by</p>

                  {isEditing ? (
                    <input
                      name="paidBy"
                      type="number"
                      className="border p-2 rounded"
                      value={form.paidBy}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="font-semibold text-slate-800">{expense.paidBy}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-slate-200">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-xl"
                >
                  Save
                </button>
              )}

              <button className="px-6 py-3 border-2 border-rose-300 text-rose-600 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
