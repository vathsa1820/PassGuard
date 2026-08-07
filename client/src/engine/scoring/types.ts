/**
 * PassGuard Score Engine Types
 * Pure TypeScript definitions for score calculation.
 */

export type ScoreStatus = 'Weak' | 'Fair' | 'Strong' | 'Excellent';
export type ScoreColor = 'red' | 'orange' | 'blue' | 'green';

export interface ScoreOutput {
  score: number;
  status: ScoreStatus;
  color: ScoreColor;
  percentage: number;
}

export type ScoreWeightsMap = Record<string, number>;

export interface EvaluatedRuleInput {
  id: string;
  passed: boolean;
}
