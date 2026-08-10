import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--passguard-surface,#0f172a)] text-[var(--passguard-fg,#f8fafc)] border border-[var(--passguard-border,#334155)] shadow-2xl backdrop-blur-sm',
      outline: 'bg-transparent text-[var(--passguard-fg,#f8fafc)] border border-[var(--passguard-border,#334155)]',
      ghost: 'bg-[var(--passguard-surface-hover,rgba(255,255,255,0.05))] text-[var(--passguard-fg,#f8fafc)] border-none shadow-none',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--passguard-radius,0.75rem)] p-5 sm:p-6 transition-all duration-200 antialiased',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg sm:text-xl font-bold tracking-tight text-[var(--passguard-fg,#f8fafc)]', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs sm:text-sm text-[var(--passguard-fg-muted,#94a3b8)] leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 border-t border-[var(--passguard-border,#334155)]', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';
