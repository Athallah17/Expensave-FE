'use client';

import { Plus, Download, Upload } from 'lucide-react';
// import { SearchInput } from '@/components/atoms/SearchInput';

interface ExpensesHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddExpense: () => void;
}

export function ExpensesHeader({ searchValue, onSearchChange, onAddExpense }: ExpensesHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Expenses</h1>
          <p className="text-slate-600">Track and manage all your spending</p>
        </div>
        <div className="flex gap-2">
          {/* <button className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all text-slate-700 font-medium">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all text-slate-700 font-medium">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button> */}
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>
      </div>
{/* 
      <SearchInput 
        value={searchValue} 
        onChange={onSearchChange}
        placeholder="Search expenses..."
      /> */}
    </div>
  );
}