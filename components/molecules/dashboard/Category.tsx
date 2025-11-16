import { ProgressBar } from '@/components/atoms/ProgressBar';

interface CategoryRowProps {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  delay?: number;
}

export function CategoryRow({ name, amount, percentage, color, delay = 0 }: CategoryRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-sm font-bold text-slate-800">{amount}</span>
      </div>
      <ProgressBar percentage={percentage} color={color} delay={delay} />
    </div>
  );
}