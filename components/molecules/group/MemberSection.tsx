'use client';

import { UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useGroup } from '@/hooks/useGroup';

interface Member {
  id: number;
  name: string;
  userId?: string; // optional if you want to remove via API
}

interface MembersSectionProps {
  groupId: string;
  group: {
    members: Member[];
    totalExpenses: number;
    memberCount: number;
    lastActivity?: string; // optional
  };
}

export function MembersSection({ groupId, group }: MembersSectionProps) {
  const { addMember, removeMember } = useGroup();
  const [formMembers, setFormMembers] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  // Add/remove input fields locally
  const handleAddMemberField = () => setFormMembers([...formMembers, '']);
  const handleRemoveMemberField = (index: number) =>
    setFormMembers(formMembers.filter((_, i) => i !== index));
  const handleMemberChange = (index: number, value: string) =>
    setFormMembers(formMembers.map((m, i) => (i === index ? value : m)));

  // Add member via API
  const handleAddMemberAPI = async (index: number) => {
    const shortCode = formMembers[index].trim();
    if (!shortCode) return;

    setLoading(true);
    try {
      await addMember(groupId, { shortCode });
      setFormMembers(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Failed to add member', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove member via API
  const handleRemoveMemberAPI = async (userId?: string) => {
    if (!userId) return;

    setLoading(true);
    try {
      await removeMember(groupId, userId);
    } catch (err) {
      console.error('Failed to remove member', err);
    } finally {
      setLoading(false);
    }
  };

  // Compute your share
  const sharePerMember =
    group.memberCount > 0 ? group.totalExpenses / group.memberCount : 0;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Members</h3>

      {/* Add Member Field */}
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-slate-700">
          Add Members
        </label>
        <button
          onClick={handleAddMemberField}
          className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          <UserPlus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="space-y-2">
        {formMembers.map((member, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={member}
              onChange={(e) => handleMemberChange(i, e.target.value)}
              placeholder="Enter shortCode (e.g., YH6G8)"
              className="flex-1 px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 placeholder:text-slate-400 text-sm"
            />
            <button
              onClick={() => handleAddMemberAPI(i)}
              disabled={loading || !member.trim()}
              className="px-3 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
            {formMembers.length > 1 && (
              <button
                onClick={() => handleRemoveMemberField(i)}
                className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Existing Members */}
      <div className="mt-4 space-y-2">
        {group.members.length > 0 ? (
          group.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-white/70 rounded-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-white font-semibold">
                  {member.name?.charAt(0) || '?'}
                </div>
                <p className="font-semibold text-slate-800">{member.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    ${sharePerMember.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">Owes</p>
                </div>
                {member.userId && (
                  <button
                    onClick={() => handleRemoveMemberAPI(member.userId)}
                    className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No members yet</p>
        )}
      </div>
    </div>
  );
}
