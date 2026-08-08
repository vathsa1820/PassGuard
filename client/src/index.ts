/**
 * PassGuard Public React API
 * Enterprise-grade, zero-knowledge password security & real-time analysis library.
 */

// Primary CSS Stylesheet
import './styles/globals.css';

// Primary UI Security Components
export {
  PasswordSecurityCard,
  type PasswordSecurityCardProps,
  type PasswordSecurityCardStateProps,
  type RequirementItem,
} from './components/password/PasswordSecurityCard';

export {
  PasswordInput,
  type PasswordInputProps,
} from './components/password/PasswordInput';

export {
  PasswordHealthScore,
  type PasswordHealthScoreProps,
} from './components/password/PasswordHealthScore';

export {
  PasswordStrengthIndicator,
  type PasswordStrengthIndicatorProps,
} from './components/password/PasswordStrengthIndicator';

export {
  RequirementChecklist,
  type RequirementChecklistProps,
} from './components/password/RequirementChecklist';

export {
  SuggestionCard,
  type SuggestionCardProps,
} from './components/password/SuggestionCard';

export {
  ReuseWarning,
  type ReuseWarningProps,
} from './components/password/ReuseWarning';

// Reactive React Hooks
export { usePasswordAnalysis } from './hooks/usePasswordAnalysis';
export { usePasswordAnalyzer, type UsePasswordAnalyzerOptions } from './hooks/usePasswordAnalyzer';
export { usePasswordStrength } from './hooks/usePasswordStrength';

// Password Policy Configuration System
export {
  type PasswordPolicy,
  defaultPasswordPolicy,
  validatePasswordPolicy,
  resolvePasswordPolicy,
  type PolicyValidationResult,
} from './config';

// High-level Asynchronous Password Analysis Entrypoint
export { analyzePassword } from './engine/analyzer/PasswordAnalyzer';

// Public Data Types
export type {
  PasswordAnalysis,
  PasswordAnalysisOutput,
  PasswordRuleResult,
  PasswordSuggestion,
  PasswordStatus,
  EntropyComplexity,
  PatternDetectionResult,
  CommonPasswordResult,
  ReuseResult,
} from './types/password';
