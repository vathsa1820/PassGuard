import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  onContinue?: () => void;
  stateProps?: PasswordSecurityCardStateProps;
}

export const PasswordSecurityCard: React.FC<PasswordSecurityCardProps> = ({
  className,
  onContinue,
  stateProps,
}) => {
  const initialPassword = stateProps?.password !== undefined ? stateProps.password : 'P@ssw0rd2026!';
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (stateProps?.password !== undefined) {
      setPassword(stateProps.password);
    }
  }, [stateProps?.password]);

  const score = stateProps?.score !== undefined ? stateProps.score : 72;
  const status = stateProps?.status || 'Strong';
  const rules = stateProps?.rules || [
    { label: 'At least 12 characters', completed: true },
    { label: 'Uppercase letter', completed: true },
    { label: 'Lowercase letter', completed: true },
    { label: 'Number', completed: true },
    { label: 'Special character (!@#$%)', completed: false },
  ];

  const suggestion = stateProps?.suggestion !== undefined ? stateProps.suggestion : 'Add one special character (!@#$%) to improve your password strength score.';
  const expectedScoreBoost = stateProps?.expectedScoreBoost;
  const reuseWarning = stateProps?.reuseWarning || {
    isVisible: false,
    message: 'Previously used password detected. Avoid reusing passwords across multiple accounts.',
  };
  const successMessage = stateProps?.successMessage;

  return (
    <Card className={cn('w-full max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-slate-900 border-slate-800 shadow-xl overflow-hidden', className)}>
      {/* Card Header */}
      <CardHeader className="space-y-1 px-0 pt-0 pb-3 sm:pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
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
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
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

        {/* Success Banner if Excellent */}
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
          onClick={onContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
PasswordSecurityCard.displayName = 'PasswordSecurityCard';
