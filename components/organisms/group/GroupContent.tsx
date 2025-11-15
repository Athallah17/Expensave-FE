'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GroupsHeader } from '@/components/organisms/group/GroupHeader';
import { GroupTabs } from '@/components/organisms/group/GroupTabs';
import { GroupsGrid } from '@/components/organisms/group/GroupGrid';
import { GroupDetailModal } from '@/components/organisms/group/GroupDetailModal';
import { CreateGroupModal } from '@/components/molecules/group/GroupModal';
import { GroupData } from '@/components/organisms/group/GroupCard';
import { useGroup } from "@/hooks/useGroup";

const GroupsPageTemplate = () => {
  const { getGroups, createGroup } = useGroup();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'settled'>('all');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const randomColor = () => {
    const colors = [
      'from-teal-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-lime-500',
      'from-red-500 to-rose-500',
      'from-indigo-500 to-violet-500',
      'from-pink-500 to-fuchsia-500',
      'from-emerald-500 to-teal-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const transformGroups = (data: any[]): GroupData[] => {
    return data.map((group, index) => ({
      id: group.id, // use backend id if available
      name: group.name,
      description: group.description || '',
      status: group.status || 'active',
      members: group.members.map((m: any) => ({ name: m.name })),
      memberCount: group.members.length,
      totalExpenses: group.totalExpenses || 0,
      lastActivity: new Date(group.createdAt).toLocaleDateString(),
      color: randomColor(),
    }));
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getGroups();
      setGroups(transformGroups(res?.data || []));
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      group.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesTab = activeTab === 'all' || group.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: groups.length,
    active: groups.filter(g => g.status === 'active').length,
    settled: groups.filter(g => g.status === 'settled').length,
  };

  const handleGroupClick = (group: GroupData) => {
    setSelectedGroupId(group.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedGroupId(null), 300);
  };

  const handleCreateGroup = async (data: { name: string; description: string; members: string[] }) => {
    try {
      await createGroup({ name: data.name, description: data.description });
      setIsCreateModalOpen(false);
      fetchGroups(); // refresh group list after creation
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GroupsHeader
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onCreateGroup={() => setIsCreateModalOpen(true)}
          />

          <GroupTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          <GroupsGrid
            groups={filteredGroups}
            onGroupClick={handleGroupClick}
          />
        </motion.div>
      </div>

      {selectedGroupId && (
        <GroupDetailModal
          groupId={selectedGroupId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
};

export default GroupsPageTemplate;
