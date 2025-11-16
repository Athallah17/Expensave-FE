import { SettlementCard, SettlementData } from '@/components/molecules/settlement/SettlementCard';
// import { EmptyState } from '@/components/molecules/EmptyState';

interface SettlementsGridProps {
  settlements: SettlementData[];
  onSettlementClick: (settlement: SettlementData) => void;
}

export function SettlementsGrid({ settlements, onSettlementClick }: SettlementsGridProps) {
  if (settlements.length === 0) {
    return (
      <p>NO Settlement FOunds</p>
      // <EmptyState
      //   title="No settlements found"
      //   description="All settled up! You have no pending settlements."
      // />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {settlements.map((settlement, index) => (
        <SettlementCard
          key={settlement.id}
          settlement={settlement}
          delay={index * 0.05}
          onClick={() => onSettlementClick(settlement)}
        />
      ))}
    </div>
  );
}