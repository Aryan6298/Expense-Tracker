import type { ExpenseCategory } from './types';
import { Utensils, Plane, Home, ShoppingBag, MoreHorizontal } from 'lucide-react';

export const CATEGORIES: { name: ExpenseCategory; icon: React.ElementType; color: string }[] = [
    { name: 'Food', icon: Utensils, color: 'text-chart-1' },
    { name: 'Travel', icon: Plane, color: 'text-chart-2' },
    { name: 'Rent', icon: Home, color: 'text-chart-3' },
    { name: 'Shopping', icon: ShoppingBag, color: 'text-chart-4' },
    { name: 'Other', icon: MoreHorizontal, color: 'text-chart-5' },
];
