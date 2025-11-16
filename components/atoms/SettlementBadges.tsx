export function SettlementBadge({ status }: { status: 'pending' | 'paid' | 'received' }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    received: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}