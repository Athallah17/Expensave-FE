'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { SettlementBadge } from '@/components/atoms/SettlementBadges';

export interface SettlementData {
  id: string;
  type: 'owes_you' | 'you_owe';
  name: string;
  amount: number;
  status: 'pending' | 'paid' | 'received';
  group?: string;
  date: string;
  dueDate?: string;
}

interface SettlementCardProps {
  settlement: SettlementData;
  delay?: number;
  onClick: () => void;
}

export function SettlementCard({ settlement, delay = 0, onClick }: SettlementCardProps) {
  const isOwesYou = settlement.type === 'owes_you';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-md cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-3">
        <UserAvatar name={settlement.name} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-sm truncate group-hover:text-amber-600 transition-colors">
            {settlement.name}
          </h3>
          <SettlementBadge status={settlement.status} />
        </div>
        {isOwesYou ? (
          <ArrowRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        ) : (
          <ArrowRight className="w-5 h-5 text-rose-500 flex-shrink-0 rotate-180" />
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`text-lg font-bold ${isOwesYou ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isOwesYou ? '+' : '-'}${settlement.amount.toFixed(2)}
        </span>
        <span className="text-xs text-slate-500">{settlement.date}</span>
      </div>

      {settlement.group && (
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            From: <span className="font-semibold text-slate-700">{settlement.group}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}
