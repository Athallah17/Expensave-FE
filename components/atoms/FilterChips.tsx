'use client';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

export function FilterChip({ label, active, onClick, count }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
          : 'bg-white/70 text-slate-600 hover:bg-white'
      }`}
    >
      {label} {count !== undefined && `(${count})`}
    </button>
  );
}