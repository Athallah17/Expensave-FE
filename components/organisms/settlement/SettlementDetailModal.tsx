'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, MessageSquare } from 'lucide-react';
import { SettlementData } from '@/components/molecules/settlement/SettlementCard';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { SettlementBadge } from '@/components/atoms/SettlementBadges';

interface SettlementDetailModalProps {
  settlement: SettlementData | null;
  isOpen: boolean;
  onClose: () => void;
  onSettle: () => void;
  onRemind: () => void;
}

export function SettlementDetailModal({ settlement, isOpen, onClose, onSettle, onRemind }: SettlementDetailModalProps) {
  if (!settlement) return null;

  const isOwesYou = settlement.type === 'owes_you';

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
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <UserAvatar name={settlement.name} size="lg" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">{settlement.name}</h2>
                  <SettlementBadge status={settlement.status} />
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className={`bg-gradient-to-br rounded-2xl p-6 mb-6 border ${
              isOwesYou 
                ? 'from-emerald-50 to-teal-50 border-emerald-100/50' 
                : 'from-rose-50 to-pink-50 border-rose-100/50'
            }`}>
              <p className="text-sm text-slate-600 mb-2">
                {isOwesYou ? 'Owes You' : 'You Owe'}
              </p>
              <p className={`text-3xl font-bold ${isOwesYou ? 'text-emerald-600' : 'text-rose-600'}`}>
                ${settlement.amount.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="font-semibold text-slate-800">{settlement.date}</p>
                </div>
              </div>

              {settlement.group && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Group</p>
                    <p className="font-semibold text-slate-800">{settlement.group}</p>
                  </div>
                </div>
              )}

              {settlement.dueDate && settlement.status === 'pending' && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Due Date</p>
                    <p className="font-semibold text-amber-600">{settlement.dueDate}</p>
                  </div>
                </div>
              )}
            </div>

            {settlement.status === 'pending' && (
              <div className="flex gap-3 pt-6 border-t border-slate-200">
                {isOwesYou ? (
                  <>
                    <button
                      onClick={onRemind}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-amber-200 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Reminder
                    </button>
                    <button
                      onClick={onSettle}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Mark as Paid
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onSettle}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <DollarSign className="w-5 h-5" />
                    Settle Now
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}