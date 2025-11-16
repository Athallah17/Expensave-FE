'use client';

import { ExpenseCard, ExpenseCardData } from '@/components/molecules/expense/ExpenseCard';
import { EmptyState } from '@/components/molecules/expense/EmptyState';

interface ExpensesGridProps {
  expenses: ExpenseCardData[];
  onExpenseClick: (expense: ExpenseCardData) => void;
}

export function ExpensesGrid({ expenses, onExpenseClick }: ExpensesGridProps) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        title="No expenses found"
        description="Start tracking your expenses by adding your first one"
        actionLabel="Add Expense"
        onAction={() => console.log('Add expense')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
      {expenses.map((expense, index) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          delay={index * 0.05}
          onClick={() => onExpenseClick(expense)}
        />
      ))}
    </div>
  );
}