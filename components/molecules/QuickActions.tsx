import { Card } from "@/components/atoms/Card";
import { CustomButton } from "@/components/atoms/CustomButton";

export const QuickActions = () => {
  return (
    <div className="flex gap-4">
      <Card title="Add Expense">
        <CustomButton>Add Expense</CustomButton>
      </Card>
      <Card title="Create Group">
        <CustomButton className="bg-green-500 hover:bg-green-600">Create Group</CustomButton>
      </Card>
    </div>
  );
};
