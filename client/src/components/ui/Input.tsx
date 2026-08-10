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
          <div className="absolute left-3 flex items-center pointer-events-none text-[var(--passguard-fg-muted,#94a3b8)] group-focus-within:text-[var(--passguard-accent,#3b82f6)] transition-colors duration-200">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-[var(--passguard-radius,0.375rem)] border bg-[var(--passguard-bg,#0f172a)] px-3 py-2 text-sm text-[var(--passguard-fg,#f8fafc)] placeholder:text-[var(--passguard-fg-muted,#94a3b8)] transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--passguard-bg,#0f172a)]',
            error
              ? 'border-[var(--passguard-error,#ef4444)] focus-visible:ring-[var(--passguard-error,#ef4444)]'
              : 'border-[var(--passguard-border,#334155)] focus-visible:border-[var(--passguard-focus,#3b82f6)] focus-visible:ring-[var(--passguard-focus,#3b82f6)]',
            disabled && 'cursor-not-allowed opacity-50 bg-[var(--passguard-surface,#1e293b)]',
            startIcon && 'pl-9',
            endIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 flex items-center text-[var(--passguard-fg-muted,#94a3b8)]">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
