import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert';
import { Badge } from '../ui/Badge';
import { Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * SuggestionCard Component
 * Smooth slide-up transition when suggestions change or enter view.
 */

export interface SuggestionCardProps {
  title?: string;
  description: string;
  expectedScore?: number | string;
  className?: string;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  title = 'Smart Suggestion',
  description,
  expectedScore,
  className,
}) => {
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
          variant="info"
          icon={<Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
          className={cn('bg-amber-950/20 border-amber-800/40 text-amber-200', className)}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <AlertTitle className="text-xs font-semibold text-amber-300 mb-0">
              {title}
            </AlertTitle>
            {expectedScore && (
              <Badge variant="warning" size="sm" className="bg-amber-950/80 text-amber-300 border-amber-700/60">
                +{expectedScore}
              </Badge>
            )}
          </div>
          <AlertDescription className="text-xs text-amber-200/80 leading-relaxed">
            {description}
          </AlertDescription>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};
SuggestionCard.displayName = 'SuggestionCard';
