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
      info: 'bg-slate-900/90 text-slate-200 border-slate-800/80',
      success: 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60 shadow-[0_2px_8px_rgba(16,185,129,0.08)]',
      warning: 'bg-amber-950/40 text-amber-200 border-amber-800/60 shadow-[0_2px_8px_rgba(245,158,11,0.08)]',
      error: 'bg-red-950/40 text-red-200 border-red-800/60 shadow-[0_2px_8px_rgba(239,68,68,0.08)]',
    };

    const defaultIcons = {
      info: <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />,
      success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
      warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
      error: <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-3.5 text-xs sm:text-sm flex gap-3 items-start transition-all duration-200 antialiased',
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
    className={cn('font-semibold leading-none tracking-tight text-slate-100 mb-1', className)}
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
    className={cn('text-xs text-slate-400 leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
