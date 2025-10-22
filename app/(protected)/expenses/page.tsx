import ExpenseLayout from "@/components/templates/ExpenseLayout";
import { ExpenseCard } from "@/components/molecules/ExpenseCard";
import { CustomButton } from "@/components/atoms/CustomButton";
import { ModalButton } from "@/components/molecules/ModalButton";
import { ExpenseForm } from "@/components/organisms/ExpenseForm";

async function getExpenses() {
    // Placeholder data
    return [
        {
            id: 1,
            title: "Groceries",
            amount: 50,
            category: "Food",
            date: "2024-06-01",
        },
        {
            id: 2,
            title: "Internet Bill",
            amount: 30,
            category: "Utilities",
            date: "2024-06-03",
        },
        {
            id: 3,
            title: "Movie Tickets",
            amount: 25,
            category: "Entertainment",
            date: "2024-06-05",
        },
    ];
}

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <ExpenseLayout>
        <h1 className="text-2xl font-bold mb-4">My Expenses</h1>
        <div className="p-4 mb-6 space-y-4">
            <p>Total Expenses: ${expenses.reduce((acc: number, e: any) => acc + e.amount, 0).toFixed(2)}</p>
            {/* Button To add Expense */}
            <ModalButton
                label="Add New Expense"
                modalComponent={<ExpenseForm />}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((e: any) => (
            <ExpenseCard
                key={e.id}
                id={e.id}
                title={e.title}
                amount={e.amount}
                category={e.category}
                date={new Date(e.date).toLocaleDateString()}
            />
            ))}
        </div>
    </ExpenseLayout>
  );
}
