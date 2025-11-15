import { Users, DollarSign, Calendar } from 'lucide-react';

interface GroupStatsProps {
  memberCount: number;
  totalExpenses: number;
  lastActivity: string;
}

export function GroupStats({ memberCount, totalExpenses, lastActivity }: GroupStatsProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-slate-600">
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>{memberCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="w-4 h-4" />
        <span>${totalExpenses}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>{lastActivity}</span>
      </div>
    </div>
  );
}