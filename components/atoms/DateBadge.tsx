import { Calendar } from 'lucide-react';

export function DateBadge({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <Calendar className="w-3.5 h-3.5" />
      {date}
    </div>
  );
}
