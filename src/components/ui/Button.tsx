'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      // Primary CTA - Brand purple
      primary: 'bg-brand text-white hover:bg-brand-dark focus:ring-brand',
      // Secondary
      secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500',
      // Outline
      outline: 'border-2 border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500',
      // Ghost
      ghost: 'text-gray-300 hover:bg-gray-800 focus:ring-gray-500',
      // Danger
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      // Success - keep green for success actions
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
