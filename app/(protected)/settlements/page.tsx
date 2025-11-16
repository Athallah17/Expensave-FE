'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import  SettlementLayout from "@/components/templates/SettlementLayout";
import { SettlementsHeader } from '@/components/organisms/settlement/SettlementHeader';
import { SettlementTabs } from '@/components/organisms/settlement/SettlementTabs';
import { SettlementSummary } from '@/components/molecules/settlement/SettlementSummary';
import { SettlementsGrid } from '@/components/organisms/settlement/SettlementGrid';
import { SettlementDetailModal } from '@/components/organisms/settlement/SettlementDetailModal';
import { SettleUpModal } from '@/components/organisms/settlement/SettlementModal';
import { QuickSettleButton } from '@/components/molecules/settlement/QuickSettle';
import { SettlementData } from '@/components/molecules/settlement/SettlementCard';

const mockSettlements: SettlementData[] = [
  {
    id: '1',
    type: 'owes_you',
    name: 'John Doe',
    amount: 125.50,
    status: 'pending',
    group: 'Bali Trip 2024',
    date: 'Dec 10, 2024',
    dueDate: 'Dec 20, 2024'
  },
  {
    id: '2',
    type: 'you_owe',
    name: 'Jane Smith',
    amount: 45.00,
    status: 'pending',
    group: 'Office Lunch',
    date: 'Dec 12, 2024',
    dueDate: 'Dec 15, 2024'
  },
  {
    id: '3',
    type: 'owes_you',
    name: 'Mike Johnson',
    amount: 230.00,
    status: 'pending',
    group: 'Weekend Getaway',
    date: 'Dec 8, 2024'
  },
  {
    id: '4',
    type: 'you_owe',
    name: 'Sarah Williams',
    amount: 67.80,
    status: 'pending',
    date: 'Dec 11, 2024'
  },
  {
    id: '5',
    type: 'owes_you',
    name: 'Tom Brown',
    amount: 150.00,
    status: 'received',
    group: 'Apartment Rent',
    date: 'Dec 1, 2024'
  },
  {
    id: '6',
    type: 'you_owe',
    name: 'Emma Davis',
    amount: 89.99,
    status: 'paid',
    date: 'Nov 28, 2024'
  },
];

export function SettlementsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'owes_you' | 'you_owe' | 'settled'>('all');
  const [selectedSettlement, setSelectedSettlement] = useState<SettlementData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);

  const filteredSettlements = mockSettlements.filter(settlement => {
    const matchesSearch = settlement.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'owes_you' && settlement.type === 'owes_you' && settlement.status === 'pending') ||
      (activeTab === 'you_owe' && settlement.type === 'you_owe' && settlement.status === 'pending') ||
      (activeTab === 'settled' && (settlement.status === 'paid' || settlement.status === 'received'));
    return matchesSearch && matchesTab;
  });

  const totalOwesYou = mockSettlements
    .filter(s => s.type === 'owes_you' && s.status === 'pending')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalYouOwe = mockSettlements
    .filter(s => s.type === 'you_owe' && s.status === 'pending')
    .reduce((sum, s) => sum + s.amount, 0);

  const netBalance = totalOwesYou - totalYouOwe;

  const counts = {
    all: mockSettlements.length,
    owes_you: mockSettlements.filter(s => s.type === 'owes_you' && s.status === 'pending').length,
    you_owe: mockSettlements.filter(s => s.type === 'you_owe' && s.status === 'pending').length,
    settled: mockSettlements.filter(s => s.status === 'paid' || s.status === 'received').length,
  };

  const handleSettlementClick = (settlement: SettlementData) => {
    setSelectedSettlement(settlement);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => setSelectedSettlement(null), 300);
  };

  const handleSettle = () => {
    console.log('Settling:', selectedSettlement);
    setIsDetailModalOpen(false);
  };

  const handleRemind = () => {
    console.log('Sending reminder to:', selectedSettlement?.name);
  };

  const handleSettleUp = (data: any) => {
    console.log('Settle up:', data);
    setIsSettleModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <SettlementLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SettlementsHeader
              searchValue={searchValue}
              onSearchChange={setSearchValue}
            />

            <SettlementSummary
              totalOwesYou={totalOwesYou}
              totalYouOwe={totalYouOwe}
              // netBalance={netBalance}
            />

            <SettlementTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={counts}
            />

            <SettlementsGrid
              settlements={filteredSettlements}
              onSettlementClick={handleSettlementClick}
            />
          </motion.div>
        </div>

        <QuickSettleButton onClick={() => setIsSettleModalOpen(true)} />

        <SettlementDetailModal
          settlement={selectedSettlement}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onSettle={handleSettle}
          onRemind={handleRemind}
        />

        <SettleUpModal
          isOpen={isSettleModalOpen}
          onClose={() => setIsSettleModalOpen(false)}
          onSubmit={handleSettleUp}
        />
        </SettlementLayout>
      </div>
  );
}

export default SettlementsPage