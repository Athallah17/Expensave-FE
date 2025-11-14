'use client';

import { Wallet, Bell, Menu } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { UserProfile } from '@/components/molecules/dashboard/UserProfile';

interface HeaderBarProps {
  onMenuClick: () => void;
}

export function HeaderBar({ onMenuClick }: HeaderBarProps) {
  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-teal-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-teal-50 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800 hidden sm:block">Expensave</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconButton icon={Bell} badge />
            <UserProfile name="John Doe" email="john@example.com" initials="JD" />
          </div>
        </div>
      </div>
    </nav>
  );
}