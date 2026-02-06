'use client';

import { TotalExpenses } from './total-expenses';

type HeaderProps = {
    total: number;
    isLoading: boolean;
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9.5V22.5" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.25 14.25H16" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.25 18.25H20.75" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-2xl font-bold tracking-tighter">TrackFlow</span>
    </div>
  );
}

export function Header({ total, isLoading }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <Logo />
      <TotalExpenses total={total} isLoading={isLoading} />
    </header>
  );
}
