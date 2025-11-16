'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Calculator } from 'lucide-react';
import { QuickActionButton } from '@/components/molecules/dashboard/QuickAction';
import { AddExpenseModal } from '../expense/AddExpenseModal';
import { CreateGroupModal } from '@/components/molecules/group/GroupModal';

export function QuickActionsCard() {
  const [openModal, setOpenModal] = useState<null | 'expense' | 'group' | 'split'>(null);

  const actions = [
    { label: 'Add Expense', icon: Plus, gradient: 'from-teal-500 to-emerald-500', type: 'expense' as const },
    { label: 'New Group', icon: Users, gradient: 'from-blue-500 to-cyan-500', type: 'group' as const },
    { label: 'Split Bill', icon: Calculator, gradient: 'from-purple-500 to-pink-500', type: 'split' as const },
  ];

  const handleOpen = (type: 'expense' | 'group' | 'split') => {
    setOpenModal(type);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <QuickActionButton
            key={action.label}
            {...action}
            onClick={() => handleOpen(action.type)}
          />
        ))}
      </div>

      {/* Modals */}
      {openModal === 'expense' && <AddExpenseModal isOpen={true} onClose={handleClose} />}
      {openModal === 'group' && <CreateGroupModal isOpen={true} onClose={handleClose} />}
      {/* You can implement SplitBillModal similarly if needed */}
    </motion.div>
  );
}
