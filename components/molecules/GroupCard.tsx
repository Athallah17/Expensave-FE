import { Card } from "@/components/atoms/Card";

interface GroupCardProps {
  id: number;
  name: string;
  description?: string;
}

export function GroupCard({ id, name, description }: GroupCardProps) {
  return (
    <Card title={name} description={description}>
      <a
        href={`/groups/${id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Details
      </a>
    </Card>
  );
}
