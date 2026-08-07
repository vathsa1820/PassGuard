import { RuleResult } from '../rules/types';
import { PatternDetectionResult } from '../patterns/types';
import { EntropyOutput } from '../entropy/types';
import { ReuseResult } from '../reuse/types';

export interface SuggestionInput {
  ruleResults?: RuleResult[];
  patternResults?: PatternDetectionResult[];
  entropyResult?: EntropyOutput;
  reuseResult?: ReuseResult;
  currentScore?: number;
}

export interface SuggestionOutput {
  title: string;
  message: string;
  expectedScore?: number;
}

export interface CandidateSuggestion extends SuggestionOutput {
  priority: number; // Lower number = Higher priority
}
