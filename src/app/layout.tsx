import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Expense Dashboard',
  description: 'A modern and visually appealing Expense Tracker web app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", inter.variable)}>
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-background animated-gradient -z-10" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
