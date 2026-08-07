import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

/**
 * PasswordHealthScore Component
 * Renders animated numeric counter (0 -> score) and smooth badge layout transition.
 */

export interface PasswordHealthScoreProps {
  score?: number; // 0 to 100
  status?: string;
  showScore?: boolean;
  className?: string;
}

export const PasswordHealthScore: React.FC<PasswordHealthScoreProps> = ({
  score = 0,
  status = 'Weak',
  showScore = true,
  className,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

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
    <div className={cn('flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80', className)}>
      <div className="space-y-0.5">
        <span className="text-xs font-medium text-slate-400 block">Password Score</span>
        {showScore && (
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-100">{displayScore}</span>
            <span className="text-xs text-slate-500 font-mono">/100</span>
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
          <Badge variant={getBadgeVariant(score)} dot size="md">
            {status}
          </Badge>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
PasswordHealthScore.displayName = 'PasswordHealthScore';
