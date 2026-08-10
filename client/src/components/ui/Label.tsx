import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Label Component
 * Accessible form label with optional required asterisk and disabled state.
 */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, disabled, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-xs font-medium leading-none text-[var(--passguard-fg,#f8fafc)] select-none flex items-center gap-1',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-[var(--passguard-error,#ef4444)] font-bold" aria-hidden="true">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';
