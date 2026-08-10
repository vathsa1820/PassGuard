import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { useAdaptiveThemeContext } from '../../theme';
import { AdaptiveDensity } from '../../theme/types';

/**
 * PasswordHealthScore Component
 * Renders animated numeric counter (0 -> score) and smooth badge layout transition with screen-reader live updates.
 * Adapts typography and padding based on container density.
 */

export interface PasswordHealthScoreProps {
  score?: number; // 0 to 100
  status?: string;
  showScore?: boolean;
  className?: string;
  density?: AdaptiveDensity;
}

export const PasswordHealthScore: React.FC<PasswordHealthScoreProps> = ({
  score = 0,
  status = 'Weak',
  showScore = true,
  className,
  density: explicitDensity,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const contextTheme = useAdaptiveThemeContext();
  const density = explicitDensity && explicitDensity !== 'auto'
    ? (explicitDensity === 'minimal' ? 'compact' : explicitDensity)
    : (contextTheme?.density || 'standard');

  const isCompact = density === 'compact';

  useEffect(() => {
    let start = displayScore;
    const end = score;
    if (start === end) return;

    const duration = 400; // ms smooth count
    const startTime = performance.now();

    const updateScore = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easedProgress);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(updateScore);
      }
    };

    const animId = requestAnimationFrame(updateScore);
    return () => cancelAnimationFrame(animId);
  }, [score]);

  const getBadgeVariant = (s: number) => {
    if (s >= 80) return 'success';
    if (s >= 50) return 'warning';
    return 'error';
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-[var(--passguard-radius,0.5rem)] bg-[var(--passguard-bg,#0f172a)] border border-[var(--passguard-border,#334155)] transition-all',
        isCompact ? 'p-2 sm:p-2.5' : 'p-3',
        className
      )}
    >
      <div className="space-y-0.5">
        <span className="text-xs font-medium text-[var(--passguard-fg-muted,#94a3b8)] block">Password Score</span>
        {showScore && (
          <div className="flex items-baseline gap-1">
            <span className={cn('font-bold font-mono text-[var(--passguard-fg,#f8fafc)]', isCompact ? 'text-lg' : 'text-xl')}>
              {displayScore}
            </span>
            <span className="text-xs text-[var(--passguard-fg-muted,#94a3b8)] font-mono">/100</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant={getBadgeVariant(score)} dot size={isCompact ? 'sm' : 'md'}>
            {status}
          </Badge>
        </motion.div>
      </AnimatePresence>

      {/* Screen-Reader Polite Announcement */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Password security score: {score} out of 100, status: {status}.
      </span>
    </div>
  );
};
PasswordHealthScore.displayName = 'PasswordHealthScore';
