import ExpenseLayout from "@/components/templates/ExpenseLayout";
import { ExpenseForm } from "@/components/organisms/ExpenseForm";

export default function NewExpensePage() {
  return (
    <ExpenseLayout>
      <h1 className="text-xl font-bold mb-4">Add Expense</h1>
      <ExpenseForm />
    </ExpenseLayout>
  );
}
