import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * RequirementChecklist Component
 * Responsive 1-col on mobile -> 2-col on tablet grid layout with text wrapping safeguards.
 */

export interface RequirementRule {
  label: string;
  completed: boolean;
}

export interface RequirementChecklistProps {
  rules: RequirementRule[];
  className?: string;
}

export const RequirementChecklist: React.FC<RequirementChecklistProps> = ({
  rules = [],
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
        Requirements
      </span>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <AnimatePresence initial={false}>
          {rules.map((rule, idx) => (
            <motion.li
              key={rule.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'flex items-center gap-2 p-2 rounded-md transition-colors border select-none overflow-hidden',
                rule.completed
                  ? 'bg-slate-900/60 text-slate-200 border-slate-800/60'
                  : 'bg-slate-950/40 text-slate-500 border-slate-900'
              )}
            >
              <motion.div
                animate={{ scale: rule.completed ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] transition-colors',
                  rule.completed
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                    : 'bg-slate-900 text-slate-600 border border-slate-800'
                )}
              >
                {rule.completed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
              </motion.div>
              <span className="truncate min-w-0">{rule.label}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
RequirementChecklist.displayName = 'RequirementChecklist';
