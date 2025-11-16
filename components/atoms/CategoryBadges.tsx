import { LucideIcon } from 'lucide-react';

interface CategoryBadgeProps {
  icon: LucideIcon;
  label: string;
  color: string;
}

export function CategoryBadge({ icon: Icon, label, color }: CategoryBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${color} text-xs font-semibold`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}