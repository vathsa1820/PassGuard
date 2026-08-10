import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAdaptiveThemeContext } from '../../theme';
import { AdaptiveDensity } from '../../theme/types';

export interface ReuseWarningProps {
  isVisible: boolean;
  message?: string;
  className?: string;
  density?: AdaptiveDensity;
}

export const ReuseWarning: React.FC<ReuseWarningProps> = ({
  isVisible,
  message = 'Previously used password detected. Reusing passwords exposes your account to breach risks.',
  className,
  density: explicitDensity,
}) => {
  const contextTheme = useAdaptiveThemeContext();
  const density = explicitDensity && explicitDensity !== 'auto'
    ? (explicitDensity === 'minimal' ? 'compact' : explicitDensity)
    : (contextTheme?.density || 'standard');

  const isCompact = density === 'compact';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <Alert
            variant="error"
            icon={<AlertTriangle className="w-4 h-4 text-[var(--passguard-error,#ef4444)] shrink-0 mt-0.5" />}
            className={cn(
              'bg-[var(--passguard-error,#ef4444)]/10 border-[var(--passguard-error,#ef4444)]/30 text-[var(--passguard-fg,#f8fafc)]',
              isCompact ? 'p-2 sm:p-2.5' : '',
              className
            )}
          >
            <AlertTitle className="text-xs font-semibold text-[var(--passguard-error,#ef4444)] mb-0.5">
              Reuse Warning
            </AlertTitle>
            <AlertDescription className="text-xs text-[var(--passguard-fg-muted,#94a3b8)] leading-relaxed">
              {message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
ReuseWarning.displayName = 'ReuseWarning';
