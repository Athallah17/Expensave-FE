'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet as WalletIcon, Smartphone, Check } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethodIcon } from '@/components/atoms/PaymentMethod';

interface SettleUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'cash', label: 'Cash', icon: WalletIcon },
  { id: 'digital', label: 'Digital Wallet', icon: Smartphone },
];

export function SettleUpModal({ isOpen, onClose, onSubmit }: SettleUpModalProps) {
  const [formData, setFormData] = useState({
    person: '',
    amount: '',
    method: '',
    note: ''
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ person: '', amount: '', method: '', note: '' });
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-50 p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Settle Up</h2>
                <p className="text-sm text-slate-600">Record a settlement payment</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Person *</label>
                <select
                  value={formData.person}
                  onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                >
                  <option value="">Select person</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Amount *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method *</label>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setFormData({ ...formData, method: method.id })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.method === method.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                        formData.method === method.id ? 'bg-amber-100' : 'bg-slate-100'
                      }`}>
                        <method.icon className={`w-5 h-5 ${
                          formData.method === method.id ? 'text-amber-600' : 'text-slate-600'
                        }`} />
                      </div>
                      <p className="text-xs font-semibold text-slate-700 text-center">{method.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Note (Optional)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.person || !formData.amount || !formData.method}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Settle Up
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}