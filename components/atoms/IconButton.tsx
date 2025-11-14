'use client';

import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  badge?: boolean;
  variant?: 'default' | 'ghost';
}

export function IconButton({ icon: Icon, onClick, badge, variant = 'default' }: IconButtonProps) {
  const variants = {
    default: 'hover:bg-teal-50',
    ghost: 'hover:bg-slate-100'
  };

  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-xl transition-colors relative ${variants[variant]}`}
    >
      <Icon className="w-5 h-5 text-slate-600" />
      {badge && <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />}
    </button>
  );
}