import { TopCategoryCard } from "@/components/molecules/TopCategory";

interface CategoryData {
  category: string;
  amount: number;
  color?: string;
}

interface TopCategoriesSectionProps {
  data: CategoryData[];
  loading?: boolean;
}

export const TopCategoriesSection = ({ data, loading }: TopCategoriesSectionProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-200 p-2 rounded-lg">
      {data.map((cat) => (
        <TopCategoryCard
          key={cat.category}
          category={cat.category}
          amount={cat.amount}
          color={cat.color}
        />
      ))}
    </div>
  );
};
