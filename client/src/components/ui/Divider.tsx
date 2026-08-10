import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Divider Component
 * Clean semantic separator line for vertical or horizontal layout structure.
 */

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('w-[1px] h-full bg-[var(--passguard-border,#334155)] self-stretch my-0 mx-2', className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn('flex items-center w-full my-4 text-xs text-[var(--passguard-fg-muted,#94a3b8)]', className)}
          {...props}
        >
          <div className="flex-1 h-[1px] bg-[var(--passguard-border,#334155)]" />
          <span className="px-3 select-none font-medium">{label}</span>
          <div className="flex-1 h-[1px] bg-[var(--passguard-border,#334155)]" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn('w-full h-[1px] bg-[var(--passguard-border,#334155)] my-4', className)}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
