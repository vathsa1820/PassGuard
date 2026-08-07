import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-slate-800 text-slate-200 border-slate-700/80',
      secondary: 'bg-slate-800/60 text-slate-300 border-slate-700/50',
      outline: 'bg-transparent text-slate-300 border-slate-700',
      success: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
      warning: 'bg-amber-950/80 text-amber-300 border-amber-800/60 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
      error: 'bg-red-950/80 text-red-300 border-red-800/60 shadow-[0_0_8px_rgba(239,68,68,0.15)]',
      neutral: 'bg-slate-900 text-slate-400 border-slate-800',
    };

    const dotColors = {
      default: 'bg-slate-400',
      secondary: 'bg-slate-400',
      outline: 'bg-slate-400',
      success: 'bg-emerald-400 animate-pulse',
      warning: 'bg-amber-400 animate-pulse',
      error: 'bg-red-400 animate-pulse',
      neutral: 'bg-slate-500',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-[11px] gap-1 font-semibold tracking-wide',
      md: 'px-2.5 py-1 text-xs gap-1.5 font-semibold tracking-wide',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border transition-all duration-150 select-none antialiased',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </div>
    );
  }
);
Badge.displayName = 'Badge';
