'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { ExpenseCard } from './expense-card';
import { Skeleton } from './ui/skeleton';

type ExpenseListProps = {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
  isLoading: boolean;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function ExpenseList({ expenses, deleteExpense, isLoading }: ExpenseListProps) {
  if (isLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-[93px] w-full" />
            <Skeleton className="h-[93px] w-full" />
            <Skeleton className="h-[93px] w-full" />
        </div>
    )
  }
    
  if (expenses.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-12 text-center"
      >
        <motion.div
            variants={itemVariants}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <Wind className="mx-auto h-16 w-16 text-muted-foreground/50" />
        </motion.div>
        <motion.h3 variants={itemVariants} className="mt-6 text-xl font-semibold">Tumbleweeds... it's a bit empty here.</motion.h3>
        <motion.p variants={itemVariants} className="mt-2 text-sm text-muted-foreground">
          Click "Add New Expense" to start tracking your spending.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} deleteExpense={deleteExpense} />
        ))}
      </AnimatePresence>
    </div>
  );
}
