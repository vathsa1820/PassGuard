import * as React from 'react';
import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAdaptiveThemeContext } from '../../theme';
import { AdaptiveDensity } from '../../theme/types';

/**
 * RequirementChecklist Component
 * Supports compact requirement summary, progressive disclosure expand/collapse interaction,
 * container-aware density modes, and full WCAG accessibility attributes (aria-expanded, aria-controls).
 */

export interface RequirementRule {
  label: string;
  completed: boolean;
}

export interface RequirementChecklistProps {
  rules: RequirementRule[];
  className?: string;
  density?: AdaptiveDensity;
  defaultExpanded?: boolean;
}

export const RequirementChecklist: React.FC<RequirementChecklistProps> = ({
  rules = [],
  className,
  density: explicitDensity,
  defaultExpanded = false,
}) => {
  const contextTheme = useAdaptiveThemeContext();
  const density = explicitDensity && explicitDensity !== 'auto'
    ? (explicitDensity === 'minimal' ? 'compact' : explicitDensity)
    : (contextTheme?.density || 'standard');

  const isCompact = density === 'compact';
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || !isCompact);
  const listId = useId();

  const completedCount = rules.filter((r) => r.completed).length;
  const totalCount = rules.length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] transition-colors',
              isAllCompleted
                ? 'bg-[var(--passguard-success,#10b981)]/20 text-[var(--passguard-success,#10b981)] border border-[var(--passguard-success,#10b981)]/40'
                : 'bg-[var(--passguard-surface-hover,#334155)] text-[var(--passguard-fg-muted,#94a3b8)] border border-[var(--passguard-border,#334155)]'
            )}
            aria-hidden="true"
          >
            {isAllCompleted ? <Check className="w-2.5 h-2.5" /> : <span className="font-mono text-[9px]">{completedCount}</span>}
          </span>
          <span className="text-xs font-semibold text-[var(--passguard-fg,#f8fafc)] select-none flex items-center gap-1">
            <span>Requirements</span>
            <span className="text-[var(--passguard-fg-muted,#94a3b8)] font-normal">({completedCount}/{totalCount} met)</span>
          </span>
        </div>

        {isCompact && (
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={listId}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--passguard-accent,#3b82f6)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--passguard-focus,#3b82f6)] rounded px-1 py-0.5 cursor-pointer select-none"
          >
            <span>{isExpanded ? 'Hide details' : 'View details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {(isExpanded || !isCompact) && (
          <motion.ul
            id={listId}
            initial={isCompact ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={isCompact ? { opacity: 0, height: 0 } : undefined}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs overflow-hidden pt-1"
          >
            {rules.map((rule, idx) => (
              <motion.li
                key={rule.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-[var(--passguard-radius,0.375rem)] transition-colors border select-none overflow-hidden',
                  rule.completed
                    ? 'bg-[var(--passguard-surface,#1e293b)] text-[var(--passguard-fg,#f8fafc)] border-[var(--passguard-border,#334155)]'
                    : 'bg-[var(--passguard-bg,#0f172a)] text-[var(--passguard-fg-muted,#94a3b8)] border-[var(--passguard-border,#334155)]/50'
                )}
              >
                <motion.div
                  animate={{ scale: rule.completed ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                  className={cn(
                    'w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] transition-colors',
                    rule.completed
                      ? 'bg-[var(--passguard-success,#10b981)]/20 text-[var(--passguard-success,#10b981)] border border-[var(--passguard-success,#10b981)]/40'
                      : 'bg-[var(--passguard-surface-hover,#334155)] text-[var(--passguard-fg-muted,#94a3b8)] border border-[var(--passguard-border,#334155)]'
                  )}
                >
                  {rule.completed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                </motion.div>
                <span className="truncate min-w-0">{rule.label}</span>
                <span className="sr-only">
                  {rule.completed ? `${rule.label} — requirement met` : `${rule.label} — requirement not met`}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
RequirementChecklist.displayName = 'RequirementChecklist';
