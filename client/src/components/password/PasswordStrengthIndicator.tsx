import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * PasswordStrengthIndicator Component
 * Smoothly interpolates progress fill width and subtle glow accents with accessible ARIA progressbar semantics.
 */

export interface PasswordStrengthIndicatorProps {
  score: number; // 0 to 100
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  score = 0,
  className,
}) => {
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const getBarColor = (s: number) => {
    if (s >= 80) return 'bg-[var(--passguard-strength-strong,#10b981)] shadow-[0_0_8px_rgba(16,185,129,0.3)]';
    if (s >= 60) return 'bg-[var(--passguard-strength-good,#3b82f6)] shadow-[0_0_8px_rgba(59,130,246,0.3)]';
    if (s >= 40) return 'bg-[var(--passguard-strength-fair,#f59e0b)] shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    return 'bg-[var(--passguard-strength-weak,#ef4444)] shadow-[0_0_8px_rgba(239,68,68,0.3)]';
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-label="Password security score"
        aria-valuenow={normalizedScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`Password security score: ${normalizedScore} out of 100`}
        className="w-full bg-[var(--passguard-surface-hover,#334155)] h-[4px] rounded-full overflow-hidden"
      >
        <motion.div
          className={cn('h-full rounded-full transition-colors duration-200', getBarColor(normalizedScore))}
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};
PasswordStrengthIndicator.displayName = 'PasswordStrengthIndicator';
