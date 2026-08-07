import { RuleResult } from '../rules/types';
import { ScoreStatus, ScoreColor } from '../scoring/types';
import { EntropyComplexity } from '../entropy/types';
import { PatternDetectionResult } from '../patterns/types';
import { CommonPasswordResult } from '../common-passwords/types';
import { ReuseResult } from '../reuse/types';
import { SuggestionOutput } from '../suggestions/types';

export interface PasswordAnalysisOutput {
  score: number;
  status: ScoreStatus;
  color: ScoreColor;
  percentage: number;
  entropy: number;
  complexity: EntropyComplexity;
  crackTime: string;
  rules: RuleResult[];
  patterns: PatternDetectionResult[];
  commonPassword: CommonPasswordResult;
  reuse: ReuseResult;
  suggestion: SuggestionOutput;
}
