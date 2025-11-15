'use client';

import { Plus } from 'lucide-react';

interface GroupsHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreateGroup: () => void;
}

export function GroupsHeader({ searchValue, onSearchChange, onCreateGroup }: GroupsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Groups</h1>
          <p className="text-slate-600">Manage your expense groups and track shared costs</p>
        </div>
        <button
          onClick={onCreateGroup}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Group
        </button>
      </div>
    </div>
  );
}
