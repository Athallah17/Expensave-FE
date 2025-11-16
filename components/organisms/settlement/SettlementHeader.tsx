'use client';

import { Search, Filter } from 'lucide-react';

interface SettlementsHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function SettlementsHeader({ searchValue, onSearchChange }: SettlementsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Settlements</h1>
        <p className="text-slate-600">Track who owes you and who you owe</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search settlements..."
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all">
          <Filter className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
}