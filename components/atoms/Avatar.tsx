export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-white font-semibold`}>
      {initials}
    </div>
  );
}