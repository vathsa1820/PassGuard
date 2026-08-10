import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert';
import { Badge } from '../ui/Badge';
import { Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAdaptiveThemeContext } from '../../theme';
import { AdaptiveDensity } from '../../theme/types';

/**
 * SuggestionCard Component
 * Smooth slide-up transition when suggestions change or enter view.
 * Supports compact single-line display in dense containers.
 */

export interface SuggestionCardProps {
  title?: string;
  description: string;
  expectedScore?: number | string;
  className?: string;
  density?: AdaptiveDensity;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  title = 'Smart Suggestion',
  description,
  expectedScore,
  className,
  density: explicitDensity,
}) => {
  const contextTheme = useAdaptiveThemeContext();
  const density = explicitDensity && explicitDensity !== 'auto'
    ? (explicitDensity === 'minimal' ? 'compact' : explicitDensity)
    : (contextTheme?.density || 'standard');

  const isCompact = density === 'compact';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={description}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Alert
          variant="warning"
          icon={<Lightbulb className="w-4 h-4 text-[var(--passguard-warning,#f59e0b)] shrink-0 mt-0.5" />}
          className={cn(
            'bg-[var(--passguard-warning,#f59e0b)]/10 border-[var(--passguard-warning,#f59e0b)]/30 text-[var(--passguard-fg,#f8fafc)]',
            isCompact ? 'p-2 sm:p-2.5 flex-row items-center gap-2' : '',
            className
          )}
        >
          {isCompact ? (
            <div className="flex items-center justify-between w-full text-xs font-medium">
              <span className="truncate min-w-0 flex-1">💡 {description}</span>
              {expectedScore && (
                <Badge variant="warning" size="sm" className="shrink-0 ml-2">
                  +{expectedScore}
                </Badge>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between w-full mb-1">
                <AlertTitle className="text-xs font-semibold text-[var(--passguard-warning,#f59e0b)] mb-0">
                  {title}
                </AlertTitle>
                {expectedScore && (
                  <Badge variant="warning" size="sm">
                    +{expectedScore}
                  </Badge>
                )}
              </div>
              <AlertDescription className="text-xs text-[var(--passguard-fg-muted,#94a3b8)] leading-relaxed">
                {description}
              </AlertDescription>
            </>
          )}
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};
SuggestionCard.displayName = 'SuggestionCard';
