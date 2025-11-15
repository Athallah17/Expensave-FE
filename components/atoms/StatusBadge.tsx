export function StatusBadge({ status }: { status?: 'active' | 'settled' | 'past' }) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    settled: 'bg-blue-100 text-blue-700',
    past: 'bg-slate-100 text-slate-600',
  };

  const safeStatus = typeof status === 'string' ? status : 'past'; // default if missing
  const label = safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[safeStatus]}`}>
      {label}
    </span>
  );
}
