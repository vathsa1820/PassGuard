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
      default: 'bg-[var(--passguard-surface,#1e293b)] text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-border,#334155)]',
      secondary: 'bg-[var(--passguard-surface-hover,#334155)] text-[var(--passguard-fg-muted,#94a3b8)] border-[var(--passguard-border,#334155)]',
      outline: 'bg-transparent text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-border,#334155)]',
      success: 'bg-[var(--passguard-success,#10b981)]/20 text-[var(--passguard-success,#10b981)] border-[var(--passguard-success,#10b981)]/40',
      warning: 'bg-[var(--passguard-warning,#f59e0b)]/20 text-[var(--passguard-warning,#f59e0b)] border-[var(--passguard-warning,#f59e0b)]/40',
      error: 'bg-[var(--passguard-error,#ef4444)]/20 text-[var(--passguard-error,#ef4444)] border-[var(--passguard-error,#ef4444)]/40',
      neutral: 'bg-[var(--passguard-surface,#1e293b)] text-[var(--passguard-fg-muted,#94a3b8)] border-[var(--passguard-border,#334155)]',
    };

    const dotColors = {
      default: 'bg-[var(--passguard-fg-muted,#94a3b8)]',
      secondary: 'bg-[var(--passguard-fg-muted,#94a3b8)]',
      outline: 'bg-[var(--passguard-fg-muted,#94a3b8)]',
      success: 'bg-[var(--passguard-success,#10b981)] animate-pulse',
      warning: 'bg-[var(--passguard-warning,#f59e0b)] animate-pulse',
      error: 'bg-[var(--passguard-error,#ef4444)] animate-pulse',
      neutral: 'bg-[var(--passguard-fg-muted,#94a3b8)]',
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
