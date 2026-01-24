'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'selected' | 'completed' | 'inProgress';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl border transition-all duration-200';

    const variants = {
      default: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
      selected: 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500',
      completed: 'bg-emerald-50 border-emerald-300 dark:bg-emerald-900/10 dark:border-emerald-700',
      inProgress: 'bg-amber-50 border-amber-300 dark:bg-amber-900/10 dark:border-amber-700',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
