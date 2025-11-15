'use client';

interface TabButtonProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function TabButton({ label, count, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
        active
          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
          : 'text-slate-600 hover:bg-white/70'
      }`}
    >
      {label} <span className="ml-1">({count})</span>
    </button>
  );
}