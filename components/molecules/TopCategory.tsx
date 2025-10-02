import {Card} from "@/components/atoms/Card";

interface TopCategoryProps {
    category: string;
    amount: number;
    percentage: number;
    color?: string;
}
export const TopCategoryCard = ({ category, amount, color }: TopCategoryProps) => {
  return (
    <Card title={category}>
      <p className={`text-xl font-bold ${color || "text-gray-800"}`}>${amount.toFixed(2)}</p>
    </Card>
  );
};