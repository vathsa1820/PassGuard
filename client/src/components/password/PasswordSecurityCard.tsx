import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { Label } from '../ui/Label';
import { Alert, AlertTitle, AlertDescription } from '../ui/Alert';
import { PasswordInput } from './PasswordInput';
import { PasswordHealthScore } from './PasswordHealthScore';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { RequirementChecklist } from './RequirementChecklist';
import { SuggestionCard } from './SuggestionCard';
import { ReuseWarning } from './ReuseWarning';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePasswordAnalysis } from '../../hooks/usePasswordAnalysis';
import { PasswordAnalysisOutput } from '../../engine';

import { useAdaptiveTheme } from '../../theme/useAdaptiveTheme';
import { AdaptiveDensity, PassGuardThemeOverride } from '../../theme/types';
import { PasswordPolicy } from '../../config';

export interface RequirementItem {
  label: string;
  completed: boolean;
}

export interface PasswordSecurityCardStateProps {
  password?: string;
  score?: number;
  status?: string;
  rules?: RequirementItem[];
  suggestion?: string | null;
  expectedScoreBoost?: number;
  reuseWarning?: { isVisible: boolean; message?: string } | null;
  successMessage?: string | null;
}

export interface PasswordSecurityCardProps {
  className?: string;
  value?: string;
  onChange?: (password: string) => void;
  onContinue?: (analysis?: PasswordAnalysisOutput | null) => void;
  showContinueButton?: boolean;
  stateProps?: PasswordSecurityCardStateProps;
  policy?: Partial<PasswordPolicy> | PasswordPolicy;
  density?: AdaptiveDensity;
  override?: PassGuardThemeOverride;
}

export const PasswordSecurityCard: React.FC<PasswordSecurityCardProps> = React.memo(({
  className,
  value,
  onChange,
  onContinue,
  showContinueButton = true,
  stateProps,
  policy,
  density: explicitDensity,
  override,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const theme = useAdaptiveTheme(containerRef, override);

  const containerWidth = theme.containerWidth;
  const activeDensity = explicitDensity && explicitDensity !== 'auto'
    ? (explicitDensity === 'minimal' ? 'compact' : explicitDensity)
    : theme.density;

  const isMinimal = explicitDensity === 'minimal' || (activeDensity === 'compact' && containerWidth > 0 && containerWidth < 280);
  const isCompact = activeDensity === 'compact';
  const isDetailed = activeDensity === 'detailed';
  const isStaticMode = stateProps !== undefined;

  const [internalPassword, setInternalPassword] = useState(stateProps?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const checklistId = React.useId();

  const password = value !== undefined ? value : internalPassword;

  useEffect(() => {
    if (stateProps?.password !== undefined) {
      setInternalPassword(stateProps.password);
    }
  }, [stateProps?.password]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    if (value === undefined) {
      setInternalPassword(nextValue);
    }
    onChange?.(nextValue);
  }, [value, onChange]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Real-time analysis hook driven by PassGuard Intelligence Engine & Policy
  const liveAnalysis = usePasswordAnalysis(isStaticMode ? (stateProps.password || '') : password, policy);

  // Memoize derived values for efficient rendering
  const score = isStaticMode
    ? (stateProps.score !== undefined ? stateProps.score : 0)
    : (password ? liveAnalysis.score : 0);

  const status = isStaticMode
    ? (stateProps.status || 'Neutral')
    : (password ? liveAnalysis.status : 'Neutral');

  const rules: RequirementItem[] = useMemo(() => {
    if (isStaticMode) {
      return stateProps.rules || [];
    }
    return liveAnalysis.rules.map((r) => ({ label: r.label, completed: r.passed }));
  }, [isStaticMode, stateProps?.rules, liveAnalysis.rules]);

  const suggestion = isStaticMode
    ? stateProps.suggestion
    : (password ? liveAnalysis.suggestion.message : null);

  const expectedScoreBoost = isStaticMode
    ? stateProps.expectedScoreBoost
    : (password ? liveAnalysis.suggestion.expectedScore : undefined);

  const reuseWarning = useMemo(() => {
    if (isStaticMode) {
      return stateProps.reuseWarning;
    }
    return liveAnalysis.reuse.reused
      ? { isVisible: true, message: liveAnalysis.reuse.message }
      : { isVisible: false, message: '' };
  }, [isStaticMode, stateProps?.reuseWarning, liveAnalysis.reuse]);

  const commonWarning = useMemo(() => {
    return !isStaticMode && password && liveAnalysis.commonPassword.isCommon
      ? liveAnalysis.commonPassword.message
      : null;
  }, [isStaticMode, password, liveAnalysis.commonPassword]);

  const successMessage = isStaticMode
    ? stateProps.successMessage
    : (password && score === 100 ? 'Excellent password! Meets all enterprise security standards.' : null);

  const analysis = isStaticMode ? null : liveAnalysis;

  const dynamicStyle = {
    '--passguard-bg': theme.colors.bg,
    '--passguard-surface': theme.colors.surface,
    '--passguard-surface-hover': theme.colors.surfaceHover,
    '--passguard-fg': theme.colors.fg,
    '--passguard-fg-muted': theme.colors.fgMuted,
    '--passguard-border': theme.colors.border,
    '--passguard-accent': theme.colors.accent,
    '--passguard-accent-hover': theme.colors.accentHover,
    '--passguard-focus': theme.colors.focus,
    '--passguard-radius': theme.radius,
    '--passguard-font': theme.font,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      data-passguard=""
      data-passguard-theme={theme.mode}
      data-passguard-density={activeDensity}
      style={dynamicStyle}
      className={cn(
        'w-full max-w-full mx-auto text-[var(--passguard-fg,#f8fafc)] font-sans transition-all space-y-2',
        isMinimal ? 'space-y-1.5' : isCompact ? 'space-y-2' : 'space-y-2.5',
        className
      )}
    >
      {/* Molecule 1: Password Label & PasswordInput */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <Label htmlFor="passguard-input" required className="font-semibold text-sm sm:text-base text-[var(--passguard-fg,#f8fafc)] flex items-center gap-1.5 leading-tight">
            {!isCompact && !isMinimal && (
              <ShieldCheck className="w-4 h-4 text-[var(--passguard-accent,#3b82f6)] passguard-header-icon lucide-shield-check shrink-0" aria-hidden="true" />
            )}
            <span>Password</span>
          </Label>
          <span className="sr-only">Password Security</span>
        </div>
        <PasswordInput
          id="passguard-input"
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
          placeholder="Enter password..."
        />
      </div>

      {/* Progress Bar (3-5px thin bar, 6-8px below input) */}
      <PasswordStrengthIndicator score={score} />

      {/* Compact Score Status Row (28-32px total height, aligned horizontally with input) */}
      <div className="flex items-center justify-between min-h-[28px] h-7 sm:h-8 w-full px-0 select-none">
        <PasswordHealthScore score={score} status={status} showScore={true} density={activeDensity} />
        {!isDetailed && (
          <button
            type="button"
            aria-expanded={isDetailsExpanded}
            aria-controls={checklistId}
            onClick={() => setIsDetailsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-medium text-[var(--passguard-accent,#3b82f6)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--passguard-focus,#3b82f6)] rounded px-1 py-0.5 cursor-pointer"
          >
            <span>{isDetailsExpanded ? 'Hide details' : 'Show details'}</span>
            {isDetailsExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-current shrink-0" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-current shrink-0" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Requirement Checklist (Expandable via details toggle) */}
      <RequirementChecklist
        id={checklistId}
        rules={rules}
        density={activeDensity}
        isExpanded={isDetailsExpanded}
        showToggle={false}
      />

      {/* Detailed Container Rich Security Telemetry (>600px width) */}
      {isDetailed && analysis && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--passguard-border,#334155)]/40 text-xs">
          <div className="p-2 rounded-[var(--passguard-radius,0.375rem)] bg-[var(--passguard-surface,#1e293b)] border border-[var(--passguard-border,#334155)]/60">
            <span className="text-[var(--passguard-fg-muted,#94a3b8)] block text-[10px] uppercase font-mono">Entropy</span>
            <span className="font-bold font-mono">{analysis.entropy} bits</span>
          </div>
          <div className="p-2 rounded-[var(--passguard-radius,0.375rem)] bg-[var(--passguard-surface,#1e293b)] border border-[var(--passguard-border,#334155)]/60">
            <span className="text-[var(--passguard-fg-muted,#94a3b8)] block text-[10px] uppercase font-mono">Length</span>
            <span className="font-bold font-mono">{password.length} chars</span>
          </div>
          <div className="p-2 rounded-[var(--passguard-radius,0.375rem)] bg-[var(--passguard-surface,#1e293b)] border border-[var(--passguard-border,#334155)]/60">
            <span className="text-[var(--passguard-fg-muted,#94a3b8)] block text-[10px] uppercase font-mono">Crack Time</span>
            <span className="font-bold font-mono truncate block">{analysis.crackTime}</span>
          </div>
          <div className="p-2 rounded-[var(--passguard-radius,0.375rem)] bg-[var(--passguard-surface,#1e293b)] border border-[var(--passguard-border,#334155)]/60">
            <span className="text-[var(--passguard-fg-muted,#94a3b8)] block text-[10px] uppercase font-mono">Breach Flag</span>
            <span className={cn('font-bold font-mono', analysis.commonPassword.isCommon ? 'text-[var(--passguard-error,#ef4444)]' : 'text-[var(--passguard-success,#10b981)]')}>
              {analysis.commonPassword.isCommon ? 'Flagged' : 'Safe'}
            </span>
          </div>
        </div>
      )}

      {/* Success Banner if 100% score */}
      {successMessage && (
        <Alert variant="success" icon={<CheckCircle2 className="w-4 h-4 text-[var(--passguard-success,#10b981)] shrink-0 mt-0.5" />}>
          <AlertTitle className="text-xs font-semibold text-[var(--passguard-success,#10b981)] mb-0.5">
            Security Standard Met
          </AlertTitle>
          <AlertDescription className="text-xs text-[var(--passguard-fg-muted,#94a3b8)]">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Common Breach Warning */}
      {commonWarning && (
        <Alert variant="error" icon={<AlertOctagon className="w-4 h-4 text-[var(--passguard-error,#ef4444)] shrink-0 mt-0.5" />}>
          <AlertTitle className="text-xs font-semibold text-[var(--passguard-error,#ef4444)] mb-0.5">
            Common Password Flagged
          </AlertTitle>
          <AlertDescription className="text-xs text-[var(--passguard-fg-muted,#94a3b8)]">
            {commonWarning}
          </AlertDescription>
        </Alert>
      )}

      {/* Molecule 5: SuggestionCard */}
      {suggestion && (
        <SuggestionCard
          title="Smart Suggestion"
          description={suggestion}
          expectedScore={expectedScoreBoost}
          density={activeDensity}
        />
      )}

      {/* Molecule 6: ReuseWarning */}
      {reuseWarning && (
        <ReuseWarning
          isVisible={reuseWarning.isVisible}
          message={reuseWarning.message}
          density={activeDensity}
        />
      )}

      {/* Primary Action Button */}
      {(onContinue || showContinueButton) && (
        <div className="pt-1 sm:pt-2">
          <Button
            variant="default"
            size={isCompact ? 'md' : 'lg'}
            className={cn(
              'w-full font-semibold shadow-md gap-2 active:scale-[0.98] transition-transform',
              isMinimal ? 'h-9 text-xs' : isCompact ? 'h-10 text-sm' : 'h-11 sm:h-12 text-sm sm:text-base'
            )}
            onClick={() => onContinue?.(analysis)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
});
PasswordSecurityCard.displayName = 'PasswordSecurityCard';
PasswordSecurityCard.displayName = 'PasswordSecurityCard';
