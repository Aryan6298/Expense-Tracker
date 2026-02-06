export type ExpenseCategory = 'Food' | 'Travel' | 'Rent' | 'Shopping' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}
