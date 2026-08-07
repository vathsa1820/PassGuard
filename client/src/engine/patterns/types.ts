/**
 * PassGuard Pattern Detection Engine Types
 * Pure TypeScript definitions for pattern recognition.
 */

export type PatternType =
  | 'sequential-numbers'
  | 'sequential-letters'
  | 'repeated-chars'
  | 'repeated-words'
  | 'keyboard'
  | 'dictionary';

export interface PatternDetectionResult {
  type: PatternType;
  detected: boolean;
  message: string;
  matchedPattern?: string;
}
