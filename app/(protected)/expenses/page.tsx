'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExpenseLayout from '@/components/templates/ExpenseLayout';
import { ExpensesHeader } from '@/components/organisms/expense/ExpenseHeader';
import { ExpenseFilters } from '@/components/organisms/expense/ExpenseFilter';
import { ExpenseStats } from '@/components/molecules/expense/ExpenseStats';
import { ExpensesGrid } from '@/components/organisms/expense/ExpenseGrid';
import { ExpenseDetailModal } from '@/components/organisms/expense/ExpenseDetailModal';
import { AddExpenseModal } from '@/components/organisms/expense/AddExpenseModal';
import { QuickAddButton } from '@/components/molecules/expense/QuickAdd';
import { ExpenseCardData } from '@/components/molecules/expense/ExpenseCard';
import { useExpense } from '@/hooks/useExpense';

import { ShoppingBag, Coffee, Car, Film, Home, Utensils } from 'lucide-react';

const categoryMap: Record<string, any> = {
  Food: { icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  Transport: { icon: Car, color: 'bg-blue-300 text-blue-600' },
  Shopping: { icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
  Entertainment: { icon: Film, color: 'bg-purple-100 text-purple-600' },
  Housing: { icon: Home, color: 'bg-teal-100 text-teal-600' },
};

export function ExpensesPageTemplate() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { getAllExpenses } = useExpense();
  const [expenses, setExpenses] = useState<ExpenseCardData[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseCardData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // -----------------------
  // FETCH REAL BACKEND DATA
  // -----------------------
  useEffect(() => {
    async function fetchData() {
      const data = await getAllExpenses();

      if (!data) return;

      const formatted = data.map((e: any): ExpenseCardData => {
        const cat = categoryMap[e.category] ?? {
          icon: ShoppingBag,
          color: 'bg-gray-100 text-gray-600',
        };

        return {
          id: String(e.id),
          title: e.title,
          amount: -Math.abs(e.amount),
          category: e.category,
          categoryIcon: cat.icon,
          categoryColor: cat.color,
          date: new Date(e.date).toLocaleDateString(),
          paidBy: e.paidBy ?? 'You',
          group: e.groupName ?? undefined,
          receipt: e.receipt ?? false,
        };
      });

      setExpenses(formatted);
    }

    fetchData();
  }, []);

  // FILTERING LOGIC
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'personal' && !expense.group) ||
      (activeFilter === 'group' && expense.group) ||
      expense.category.toLowerCase() === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleExpenseClick = (expense: ExpenseCardData) => {
    setSelectedExpense(expense);
    setIsDetailModalOpen(true);
  };

  return (
    <ExpenseLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ExpensesHeader searchValue={searchValue} onSearchChange={setSearchValue} onAddExpense={() => setIsAddModalOpen(true)} />

            <ExpenseStats expenses={expenses} />
            
            <ExpenseFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} counts={{}} />
            
            <ExpensesGrid expenses={filteredExpenses} onExpenseClick={handleExpenseClick} />
          </motion.div>
        </div>

        <QuickAddButton onClick={() => setIsAddModalOpen(true)} />

        <ExpenseDetailModal expense={selectedExpense} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />

        <AddExpenseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={() => {}} />
      </div>
    </ExpenseLayout>
  );
}

export default ExpensesPageTemplate;
