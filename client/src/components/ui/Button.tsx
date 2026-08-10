import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Button Component
 * Subtle scale-up on hover and press-down scale-down on tap inspired by Linear & Vercel.
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-[var(--passguard-radius,0.375rem)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--passguard-focus,#3b82f6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--passguard-bg,#0f172a)] disabled:opacity-50 disabled:pointer-events-none select-none';

    const variantStyles = {
      default: 'bg-[var(--passguard-accent,#3b82f6)] text-white hover:bg-[var(--passguard-accent-hover,#2563eb)] active:opacity-90 shadow-sm',
      secondary: 'bg-[var(--passguard-surface,#1e293b)] text-[var(--passguard-fg,#f8fafc)] hover:bg-[var(--passguard-surface-hover,#334155)] border border-[var(--passguard-border,#334155)]',
      outline: 'border border-[var(--passguard-border,#334155)] bg-transparent text-[var(--passguard-fg,#f8fafc)] hover:bg-[var(--passguard-surface-hover,#334155)]',
      ghost: 'bg-transparent text-[var(--passguard-fg-muted,#94a3b8)] hover:bg-[var(--passguard-surface-hover,#334155)] hover:text-[var(--passguard-fg,#f8fafc)]',
      destructive: 'bg-[var(--passguard-error,#ef4444)] text-white hover:opacity-90 shadow-sm',
      link: 'text-[var(--passguard-accent,#3b82f6)] underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-10 w-10 p-0 text-sm justify-center',
    };

    return (
      <motion.button
        ref={ref as any}
        type={type}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.985 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...(props as any)}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
