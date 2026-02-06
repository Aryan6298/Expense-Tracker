'use client';

import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

type AnimatedNumberProps = {
  value: number;
  className?: string;
  format?: (value: number) => string;
};

const defaultValueFormatter = (v: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(v);

export function AnimatedNumber({ value, className, format = defaultValueFormatter }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, latest => format(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, motionValue]);
  
  return <motion.span className={className}>{rounded}</motion.span>;
}
