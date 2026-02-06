'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { Expense, ExpenseCategory } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

const CATEGORY_NAMES = CATEGORIES.map(c => c.name) as [ExpenseCategory, ...ExpenseCategory[]];

const expenseSchema = z.object({
  title: z.string().min(2, { message: 'Min 2 chars' }),
  amount: z.coerce.number().positive({ message: 'Must be > 0' }),
  category: z.enum(CATEGORY_NAMES, { required_error: 'Category is required' }),
  date: z.date({ required_error: 'Date is required' }),
});

type AddExpenseFormProps = {
  addExpense: (expense: Omit<Expense, 'id'>) => void;
};

export function AddExpenseForm({ addExpense }: AddExpenseFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof expenseSchema>) {
    addExpense(values);
    form.reset({ title: '', amount: undefined, category: undefined, date: new Date() });
    form.clearErrors();
    toast({
        title: "Expense added!",
        description: `${values.title} was successfully added.`,
    })
  }
  
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-glass p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-start gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Expense Title" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Amount" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} value={field.value ?? ''}/>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Category" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {CATEGORIES.map(({ name, icon: Icon }) => (
                        <SelectItem key={name} value={name}>
                            <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {name}
                            </div>
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('2000-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full relative overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100"
            onMouseDown={createRipple}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
