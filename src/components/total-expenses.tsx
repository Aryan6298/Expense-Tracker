'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from './animated-number';
import { Skeleton } from './ui/skeleton';

type TotalExpensesProps = {
  total: number;
  isLoading: boolean;
};

export function TotalExpenses({ total, isLoading }: TotalExpensesProps) {
  return (
    <Card className="bg-glass shadow-sm w-full sm:w-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-4 pt-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        {isLoading ? (
            <Skeleton className="h-8 w-32 mt-1" />
        ) : (
            <AnimatedNumber 
                value={total}
                className="text-2xl font-bold"
            />
        )}
      </CardContent>
    </Card>
  );
}
