import { Card } from "@/components/atoms/Card";

interface ExpenseCardProps {
  id: number;
  title: string;
  amount: number;
  category?: string;
  date?: string;
}

export function ExpenseCard({ id, title, amount, category, date }: ExpenseCardProps) {
  return (
    <Card title={title} description={category}>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm">{date}</span>
        <span className="font-semibold text-green-600">
          {amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        </span>
      </div>
      <a
        href={`/expenses/${id}`}
        className="block text-sm text-blue-600 mt-2 hover:underline"
      >
        View Details
      </a>
    </Card>
  );
}
