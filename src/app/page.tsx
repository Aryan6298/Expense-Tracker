'use client';

import { motion } from 'framer-motion';
import { useExpenses } from '@/hooks/use-expenses';
import { Header } from '@/components/header';
import { AddExpenseForm } from '@/components/add-expense-form';
import { ExpenseTable } from '@/components/expense-table';

export default function Home() {
  const { expenses, addExpense, deleteExpense, totalExpenses, isInitialized } = useExpenses();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-5xl p-4 md:p-6"
    >
      <div className="space-y-6">
        <Header total={totalExpenses} isLoading={!isInitialized} />
        <AddExpenseForm addExpense={addExpense} />
        <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Expense History</h2>
            <ExpenseTable expenses={expenses} deleteExpense={deleteExpense} isLoading={!isInitialized} />
        </div>
      </div>
    </motion.div>
  );
}
