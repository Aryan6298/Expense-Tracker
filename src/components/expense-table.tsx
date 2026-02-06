'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2, Wind } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from './ui/skeleton';

type ExpenseTableProps = {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
  isLoading: boolean;
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(amount);

export function ExpenseTable({ expenses, deleteExpense, isLoading }: ExpenseTableProps) {
  if (isLoading) {
    return (
        <div className="space-y-2 rounded-lg border bg-glass p-4">
            <div className="flex justify-between px-4 pb-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/6" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
    )
  }

  return (
    <div className="rounded-lg border bg-glass shadow-sm overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-2/5">Expense</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <AnimatePresence>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => {
                            const categoryInfo = CATEGORIES.find(c => c.name === expense.category);
                            const Icon = categoryInfo?.icon || CATEGORIES.find(c => c.name === 'Other')!.icon;

                            return (
                                <motion.tr 
                                    key={expense.id}
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                    className="group hover:bg-muted/30"
                                >
                                    <TableCell className="font-medium">{expense.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("border-dashed font-mono text-xs", categoryInfo?.color?.replace('text-', 'border-'))}>
                                            <Icon className="mr-1 h-3 w-3" />
                                            {expense.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{format(expense.date, 'MMM d, yyyy')}</TableCell>
                                    <TableCell className="text-right font-mono">{formatCurrency(expense.amount)}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete "{expense.title}".
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteExpense(expense.id)} className="bg-destructive hover:bg-destructive/90">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </motion.tr>
                            )
                        })
                    ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                            <TableCell colSpan={5} className="h-60 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center gap-4"
                                >
                                    <Wind className="h-16 w-16 text-muted-foreground/30" />
                                    <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">No expenses yet.</h3>
                                    <p className="text-sm text-muted-foreground">Add an expense using the form above.</p>
                                    </div>
                                </motion.div>
                            </TableCell>
                        </motion.tr>
                    )}
                </AnimatePresence>
            </TableBody>
        </Table>
    </div>
  );
}
