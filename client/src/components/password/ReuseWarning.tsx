import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ReuseWarningProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export const ReuseWarning: React.FC<ReuseWarningProps> = ({
  isVisible,
  message = 'Previously used password detected. Reusing passwords exposes your account to breach risks.',
  className,
}) => {
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
            variant="warning"
            icon={<AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
            className={cn('bg-red-950/20 border-red-800/40 text-red-200', className)}
          >
            <AlertTitle className="text-xs font-semibold text-red-300 mb-0.5">
              Reuse Warning
            </AlertTitle>
            <AlertDescription className="text-xs text-red-200/80 leading-relaxed">
              {message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
ReuseWarning.displayName = 'ReuseWarning';
