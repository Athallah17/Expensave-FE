'use client';

import { GroupCard, GroupData } from '@/components/organisms/group/GroupCard';
import { EmptyState } from '@/components/molecules/group/EmptyState';

interface GroupsGridProps {
  groups: GroupData[];
  onGroupClick: (group: GroupData) => void;
}

export function GroupsGrid({ groups, onGroupClick }: GroupsGridProps) {
  if (groups.length === 0) {
    return (
      <EmptyState
        title="No groups found"
        description="Create your first group to start tracking shared expenses with friends"
        actionLabel="Create Group"
        onAction={() => console.log('Create group')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) => (
        <GroupCard
          key={group.id}
          group={group}
          delay={index * 0.1}
          onDetailsClick={onGroupClick}
        />
      ))}
    </div>
  );
}