'use client';

import { FilterChip } from '@/components/atoms/FilterChips';

interface ExpenseFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

export function ExpenseFilters({ activeFilter, onFilterChange, counts }: ExpenseFiltersProps) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'personal', label: 'Personal' },
    { id: 'group', label: 'Group' },
    { id: 'food', label: 'Food' },
    { id: 'transport', label: 'Transport' },
    { id: 'shopping', label: 'Shopping' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {filters.map(filter => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          active={activeFilter === filter.id}
          onClick={() => onFilterChange(filter.id)}
          count={counts[filter.id]}
        />
      ))}
    </div>
  );
}