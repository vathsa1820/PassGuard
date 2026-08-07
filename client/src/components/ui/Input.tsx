import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input Component
 * Smooth blue glow focus ring and icon color transitions inspired by Vercel & Stripe forms.
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, startIcon, endIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full group">
        {startIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
            error
              ? 'border-red-500/80 focus-visible:ring-red-500'
              : 'border-slate-800 focus-visible:border-blue-500 focus-visible:ring-blue-500/80 focus-visible:shadow-[0_0_12px_rgba(59,130,246,0.15)]',
            disabled && 'cursor-not-allowed opacity-50 bg-slate-900',
            startIcon && 'pl-9',
            endIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 flex items-center text-slate-400">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
