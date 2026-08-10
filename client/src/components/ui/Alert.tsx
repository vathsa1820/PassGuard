import * as React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', icon, children, ...props }, ref) => {
    const variantStyles = {
      info: 'bg-[var(--passguard-info,#3b82f6)]/15 text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-info,#3b82f6)]/30',
      success: 'bg-[var(--passguard-success,#10b981)]/15 text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-success,#10b981)]/30',
      warning: 'bg-[var(--passguard-warning,#f59e0b)]/15 text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-warning,#f59e0b)]/30',
      error: 'bg-[var(--passguard-error,#ef4444)]/15 text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-error,#ef4444)]/30',
    };

    const defaultIcons = {
      info: <Info className="w-4 h-4 text-[var(--passguard-info,#3b82f6)] shrink-0 mt-0.5" />,
      success: <CheckCircle2 className="w-4 h-4 text-[var(--passguard-success,#10b981)] shrink-0 mt-0.5" />,
      warning: <AlertTriangle className="w-4 h-4 text-[var(--passguard-warning,#f59e0b)] shrink-0 mt-0.5" />,
      error: <AlertCircle className="w-4 h-4 text-[var(--passguard-error,#ef4444)] shrink-0 mt-0.5" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-[var(--passguard-radius,0.5rem)] border p-3.5 text-xs sm:text-sm flex gap-3 items-start transition-all duration-200 antialiased',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon !== undefined ? icon : defaultIcons[variant]}
        <div className="flex-1 space-y-0.5 leading-relaxed">{children}</div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight text-[var(--passguard-fg,#f8fafc)] mb-1', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs text-[var(--passguard-fg-muted,#94a3b8)] leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
