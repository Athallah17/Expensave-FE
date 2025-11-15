'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, DollarSign, TrendingUp, Calendar, Plus } from 'lucide-react';
import { GroupData } from '@/components/organisms/group/GroupCard';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { MembersSection } from '@/components/molecules/group/MemberSection';
import { useGroup } from '@/hooks/useGroup';

interface GroupDetailModalProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GroupDetailModal({ groupId, isOpen, onClose }: GroupDetailModalProps) {
  const { getGroupDetails } = useGroup();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(false);
  const memberCount = group?.memberCount || 1;
  
useEffect(() => {
  if (!isOpen || !groupId) return;

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await getGroupDetails(groupId); // Axios response
      const data = res.data; // <-- Extract the payload

      if (data) {
        setGroup({
          id: data.id.toString(),
          name: data.name || 'Unnamed Group',
          description: data.description || '',
          status: data.status || 'active', // fallback
          color: data.color || 'from-teal-500 to-emerald-500', // fallback
          members: data.members?.map((m: any) => ({
            id: m.id.toString(),
            name: m.name,
            email: m.email,
            shortCode: m.shortCode,
            role: m.role,
            joinedAt: m.joinedAt,
            avatar: m.avatar, // optional
          })) || [],
          memberCount: data.members?.length || 0,
          totalExpenses: data.totalExpenses || 0,
          lastActivity:
            data.lastActivity ||
            (data.members?.length
              ? new Date(data.members[data.members.length - 1].joinedAt).toLocaleDateString()
              : new Date(data.createdAt).toLocaleDateString()),
        });
      }
    } catch (err) {
      console.error('Failed to fetch group details', err);
    } finally {
      setLoading(false);
    }
  };

  fetchDetails();
}, [isOpen, groupId]);


  if (!isOpen || !group) return null;

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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
          >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Group Initial Badge */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
                    >
                      {group.name ? group.name.charAt(0).toUpperCase() : '?'}
                    </div>

                    {/* Group Name & Status */}
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-slate-800 mb-1 truncate">
                        {group.name}
                      </h2>
                      <StatusBadge status={group.status} />
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-600" />
                  </button>
                </div>

              {/* Description */}
              <p className="text-slate-600 mb-8">{group.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-semibold">Members</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{group.memberCount}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-semibold">Total Expenses</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">${group.totalExpenses}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-semibold">Your Share</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    ${(group.totalExpenses / group.memberCount).toFixed(2)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold">Last Activity</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{group.lastActivity}</p>
                </div>
              </div>

              {/* Members Section */}
              <MembersSection
                groupId={groupId}
                group={group}
              />

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Add Expense
                </button>
                <button className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                  Settle Up
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
