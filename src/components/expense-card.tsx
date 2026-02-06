'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ExpenseCardProps = {
  expense: Expense;
  deleteExpense: (id: string) => void;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export function ExpenseCard({ expense, deleteExpense }: ExpenseCardProps) {
    const categoryInfo = CATEGORIES.find(c => c.name === expense.category);
    const Icon = categoryInfo?.icon || CATEGORIES.find(c => c.name === 'Other')!.icon;
    const color = categoryInfo?.color || 'text-chart-5';

    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(expense.amount);

    return (
        <motion.div variants={cardVariants} layout whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}>
            <Card className="bg-glass group relative overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10", color)}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="font-semibold">{expense.title}</p>
                            <p className="text-sm text-muted-foreground">{format(expense.date, 'MMM d, yyyy')}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-lg font-bold">{formattedAmount}</p>
                             <Badge variant="outline" className={cn("mt-1 border-dashed font-mono", color.replace('text-', 'border-'))}>{expense.category}</Badge>
                        </div>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete expense</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this expense from your records.
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
                </CardContent>
            </Card>
        </motion.div>
    );
}
