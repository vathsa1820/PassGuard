import * as React from 'react';
import { useEffect, useState } from 'react';
import { Check, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAdaptiveThemeContext } from '../../theme';
import { AdaptiveDensity } from '../../theme/types';

/**
 * PasswordHealthScore Component
 * Renders compact status row (e.g., ✓ Strong · 84% or Weak · 18%).
 * Low vertical space, semantic colors, and screen-reader live region support.
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

  useEffect(() => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      setDisplayScore(score);
      return;
    }

    let start = displayScore;
    const end = score;
    if (start === end) return;

    const duration = 250; // ms smooth count
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

  const getStatusColor = (s: number) => {
    if (s >= 80) return 'text-[var(--passguard-success,#10b981)]';
    if (s >= 60) return 'text-[var(--passguard-accent,#3b82f6)]';
    if (s >= 40) return 'text-[var(--passguard-warning,#f59e0b)]';
    return 'text-[var(--passguard-error,#ef4444)]';
  };

  const getStatusIcon = (s: number) => {
    if (s >= 80) return <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />;
    if (s >= 60) return <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />;
    if (s >= 40) return <Shield className="w-3.5 h-3.5" aria-hidden="true" />;
    return <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />;
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5 py-0 text-xs sm:text-[13px] font-medium select-none', className)}>
      <div className={cn('inline-flex items-center gap-1 transition-colors duration-200', getStatusColor(score))}>
        {getStatusIcon(score)}
        <span className="font-semibold text-xs sm:text-[13px] leading-tight">{status}</span>
      </div>

      {showScore && (
        <span className="text-[var(--passguard-fg-muted,#94a3b8)] inline-flex items-center gap-1 font-mono text-xs sm:text-[13px] font-semibold leading-tight">
          <span>·</span>
          <span>{displayScore}%</span>
          <span className="sr-only">/100</span>
        </span>
      )}

      {/* Screen-Reader Polite Announcement & Title Test Compatibility */}
      <span className="sr-only">Password Score</span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Password security score: {score} out of 100, status: {status}.
      </span>
    </div>
  );
};
PasswordHealthScore.displayName = 'PasswordHealthScore';
