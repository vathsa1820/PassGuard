import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Progress Bar Component
 * Supports smooth animated value filling, dynamic colored status themes,
 * and multi-segment evaluation modes.
 */

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  segments?: number; // e.g. 4 for password score segments
  showLabel?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = 'default',
      segments,
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantColors = {
      default: 'bg-[var(--passguard-accent,#3b82f6)]',
      success: 'bg-[var(--passguard-success,#10b981)]',
      warning: 'bg-[var(--passguard-warning,#f59e0b)]',
      error: 'bg-[var(--passguard-error,#ef4444)]',
    };

    return (
      <div ref={ref} className={cn('w-full space-y-1.5', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between text-xs text-[var(--passguard-fg-muted,#94a3b8)]">
            <span>Progress</span>
            <span className="font-mono">{Math.round(percentage)}%</span>
          </div>
        )}

        {segments && segments > 1 ? (
          <div className="flex gap-1.5 w-full">
            {Array.from({ length: segments }).map((_, idx) => {
              const segmentThreshold = ((idx + 1) / segments) * 100;
              const isFilled = percentage >= segmentThreshold;
              return (
                <div
                  key={idx}
                  className={cn(
                    'h-2 flex-1 rounded-full transition-all duration-300',
                    isFilled ? variantColors[variant] : 'bg-[var(--passguard-surface-hover,#334155)]'
                  )}
                />
              );
            })}
          </div>
        ) : (
          <div
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            className="w-full bg-[var(--passguard-surface-hover,#334155)] h-2 rounded-full overflow-hidden"
          >
            <div
              className={cn(
                'h-full transition-all duration-300 ease-out rounded-full',
                variantColors[variant]
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
