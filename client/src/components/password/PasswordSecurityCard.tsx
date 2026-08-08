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
import { ShieldCheck, ArrowRight, CheckCircle2, AlertOctagon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePasswordAnalysis } from '../../hooks/usePasswordAnalysis';
import { PasswordAnalysisOutput } from '../../engine';

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
  stateProps?: PasswordSecurityCardStateProps;
  policy?: Partial<PasswordPolicy> | PasswordPolicy;
}

export const PasswordSecurityCard: React.FC<PasswordSecurityCardProps> = React.memo(({
  className,
  value,
  onChange,
  onContinue,
  stateProps,
  policy,
}) => {
  const isStaticMode = stateProps !== undefined;

  const [internalPassword, setInternalPassword] = useState(stateProps?.password || '');
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <Card className={cn('w-full max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-slate-900 border-slate-800 shadow-xl overflow-hidden', className)}>
      {/* Card Header */}
      <CardHeader className="space-y-1 px-0 pt-0 pb-3 sm:pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl font-bold text-slate-100 truncate">
              Password Security
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-400 truncate">
              Create a strong password to protect your account
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5 sm:space-y-4 p-0">
        {/* Molecule 1: PasswordInput */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="passguard-input" required className="text-xs sm:text-sm">
            Password
          </Label>
          <PasswordInput
            id="passguard-input"
            value={password}
            onChange={handlePasswordChange}
            showPassword={showPassword}
            toggleVisibility={togglePasswordVisibility}
            placeholder="Enter password..."
          />
        </div>

        {/* Molecule 2 & 3: PasswordHealthScore & PasswordStrengthIndicator */}
        <div className="space-y-2">
          <PasswordHealthScore score={score} status={status} showScore={true} />
          <PasswordStrengthIndicator score={score} />
        </div>

        {/* Molecule 4: RequirementChecklist */}
        <RequirementChecklist rules={rules} />

        {/* Success Banner if 100% score */}
        {successMessage && (
          <Alert variant="success" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}>
            <AlertTitle className="text-xs font-semibold text-emerald-300 mb-0.5">
              Security Standard Met
            </AlertTitle>
            <AlertDescription className="text-xs text-emerald-200/80">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Common Breach Warning */}
        {commonWarning && (
          <Alert variant="error" icon={<AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}>
            <AlertTitle className="text-xs font-semibold text-red-300 mb-0.5">
              Common Password Flagged
            </AlertTitle>
            <AlertDescription className="text-xs text-red-200/80">
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
          />
        )}

        {/* Molecule 6: ReuseWarning */}
        {reuseWarning && (
          <ReuseWarning
            isVisible={reuseWarning.isVisible}
            message={reuseWarning.message}
          />
        )}
      </CardContent>

      <Divider className="my-1.5 sm:my-2" />

      {/* Primary Action Button */}
      <CardFooter className="px-0 pb-0 pt-1.5 sm:pt-2">
        <Button
          variant="default"
          size="lg"
          className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold shadow-md gap-2 active:scale-[0.98] transition-transform"
          onClick={() => onContinue?.(analysis)}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
});
PasswordSecurityCard.displayName = 'PasswordSecurityCard';
