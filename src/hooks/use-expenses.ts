'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Expense } from '@/lib/types';

const STORAGE_KEY = 'trackflow-expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem(STORAGE_KEY);
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses).map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
        }));
        setExpenses(parsedExpenses);
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      // In case of error, start with an empty list
      setExpenses([]);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [expenses, isInitialized]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    setExpenses(prev => [newExpense, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);
  
  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
  }, [expenses]);

  return { expenses, addExpense, deleteExpense, totalExpenses, isInitialized };
}
