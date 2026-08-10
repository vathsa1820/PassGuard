import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button, ButtonProps } from './Button';

/**
 * IconButton Component
 * Specialized button for square or circular icon triggers (eye visibility toggle, close buttons, copy button).
 * Enforces mandatory aria-label for accessibility.
 */

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string; // Mandatory for accessibility
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant = 'ghost', size = 'md', 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        aria-label={ariaLabel}
        className={cn('rounded-[var(--passguard-radius,0.375rem)] p-0 flex items-center justify-center shrink-0', className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';
