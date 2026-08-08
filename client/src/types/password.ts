import { PasswordAnalysisOutput } from '../engine/analyzer/types';
import { RuleResult } from '../engine/rules/types';
import { SuggestionOutput } from '../engine/suggestions/types';
import { ScoreStatus } from '../engine/scoring/types';
import { EntropyComplexity } from '../engine/entropy/types';
import { PatternDetectionResult } from '../engine/patterns/types';
import { CommonPasswordResult } from '../engine/common-passwords/types';
import { ReuseResult } from '../engine/reuse/types';

/** Unified primary analysis result interface for PassGuard */
export type PasswordAnalysis = PasswordAnalysisOutput;
export type { PasswordAnalysisOutput };

/** Represents an individual password policy rule validation result */
export type PasswordRuleResult = RuleResult;

/** Represents a smart recommendation output */
export type PasswordSuggestion = SuggestionOutput;

/** Qualitative password security assessment status */
export type PasswordStatus = ScoreStatus | 'Neutral';

export type {
  EntropyComplexity,
  PatternDetectionResult,
  CommonPasswordResult,
  ReuseResult,
};

