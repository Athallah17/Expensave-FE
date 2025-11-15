'use client';

import { TabButton } from '@/components/atoms/TabButton';

interface GroupTabsProps {
  activeTab: 'all' | 'active' | 'settled';
  onTabChange: (tab: 'all' | 'active' | 'settled') => void;
  counts: { all: number; active: number; settled: number };
}

export function GroupTabs({ activeTab, onTabChange, counts }: GroupTabsProps) {
  return (
    <div className="flex gap-2 mb-6 bg-white/50 backdrop-blur-sm p-2 rounded-2xl w-fit">
      <TabButton
        label="All Groups"
        count={counts.all}
        active={activeTab === 'all'}
        onClick={() => onTabChange('all')}
      />
      <TabButton
        label="Active"
        count={counts.active}
        active={activeTab === 'active'}
        onClick={() => onTabChange('active')}
      />
      <TabButton
        label="Settled"
        count={counts.settled}
        active={activeTab === 'settled'}
        onClick={() => onTabChange('settled')}
      />
    </div>
  );
}