'use client';

interface SettlementTabsProps {
  activeTab: 'all' | 'owes_you' | 'you_owe' | 'settled';
  onTabChange: (tab: 'all' | 'owes_you' | 'you_owe' | 'settled') => void;
  counts: Record<string, number>;
}

export function SettlementTabs({ activeTab, onTabChange, counts }: SettlementTabsProps) {
  const tabs = [
    { id: 'all' as const, label: 'All' },
    { id: 'owes_you' as const, label: 'Owes You' },
    { id: 'you_owe' as const, label: 'You Owe' },
    { id: 'settled' as const, label: 'Settled' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          {tab.label} ({counts[tab.id] || 0})
        </button>
      ))}
    </div>
  );
}