'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreVertical, Users, DollarSign } from 'lucide-react';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { AvatarGroup } from '@/components/atoms/AvatarGroup';
import { useGroup } from '@/hooks/useGroup';

export interface GroupData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'settled' | 'past';
  members: Array<{ id?: string | number; name: string; avatar?: string }>;
  memberCount: number;
  totalExpenses: number;
  lastActivity: string;
  color: string;
}

interface GroupCardProps {
  group: GroupData;
  delay?: number;
  onDetailsClick: (group: GroupData) => void;
}

export function GroupCard({ group, delay = 0, onDetailsClick }: GroupCardProps) {
  const { getGroupDetails } = useGroup();
  const [members, setMembers] = useState<GroupData['members']>(group.members);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const groupDetails = await getGroupDetails(group.id);
        console.log(groupDetails);
        if (groupDetails?.members) {
          setMembers(
            groupDetails.members.map((m: any) => ({
              id: m.id,
              name: m.name,
              avatar: m.avatar // if backend provides avatar URL
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch members', err);
      }
    };

    fetchMembers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
          >
            {group.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 text-sm group-hover:text-teal-600 transition-colors truncate">
              {group.name}
            </h3>
            <StatusBadge status={group.status} />
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">{group.description}</p>

      {/* Stats */}
      <div className="mb-3">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{members.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>${group.totalExpenses}</span>
          </div>
        </div>
      </div>

      {/* Members & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <AvatarGroup members={members} max={3} />
        <motion.button
          whileHover={{ x: 2 }}
          onClick={() => onDetailsClick({ ...group, members })}
          className="flex items-center gap-0.5 text-xs font-semibold text-teal-600 hover:text-teal-700"
        >
          Details
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
