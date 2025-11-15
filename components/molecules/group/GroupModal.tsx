'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useGroup } from '@/hooks/useGroup';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const { createGroup, addMember } = useGroup(); // use hook here
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [''],
    color: 'from-teal-500 to-emerald-500'
  });

  const handleAddMemberField = () => {
    setFormData(prev => ({ ...prev, members: [...prev.members, ''] }));
  };

  const handleRemoveMemberField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const handleMemberChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((m, i) => i === index ? value : m)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    // 1️⃣ Create group first
    await createGroup({ name: formData.name, description: formData.description });

    // 2️⃣ Add members
    for (const memberEmail of formData.members.filter(m => m.trim() !== '')) {
      await addMember(formData.name, { shortCode: memberEmail });
      // replace `formData.name` with the actual groupId if createGroup returns it
    }

    // 3️⃣ Reset form
    setFormData({ name: '', description: '', members: [''], color: 'from-teal-500 to-emerald-500' });

    // 4️⃣ Close modal
    onClose();
  };

  const colors = [
    'from-teal-500 to-emerald-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-pink-500',
    'from-indigo-500 to-purple-500'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-50 p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Create New Group</h2>
                <p className="text-sm text-slate-600">Start tracking expenses with your friends</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Group Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Bali Trip 2024"
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's this group for?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Members</label>
                  <button onClick={handleAddMemberField} className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-teal-700">
                    <UserPlus className="w-4 h-4" /> Add Member
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="email"
                        value={member}
                        onChange={(e) => handleMemberChange(i, e.target.value)}
                        placeholder="ABC123"
                        className="flex-1 px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      />
                      {formData.members.length > 1 && (
                        <button onClick={() => handleRemoveMemberField(i)} className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">You'll be added as a member automatically</p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Group Color</label>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} hover:scale-110 transition-transform ${formData.color === color ? 'ring-2 ring-offset-2 ring-teal-500' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.name.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
