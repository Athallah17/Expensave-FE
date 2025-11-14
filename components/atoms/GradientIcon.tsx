import { LucideIcon } from 'lucide-react';

interface GradientIconProps {
  icon: LucideIcon;
  gradient: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GradientIcon({ icon: Icon, gradient, size = 'md' }: GradientIconProps) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  );
}