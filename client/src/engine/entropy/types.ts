/**
 * PassGuard Entropy Engine Types
 * Pure TypeScript definitions for entropy and crack time estimation.
 */

export type EntropyComplexity = 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';

export interface CharsetAnalysis {
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  charsetSize: number;
}

export interface EntropyOutput {
  entropy: number;
  charsetSize: number;
  length: number;
  crackTime: string;
  complexity: EntropyComplexity;
}
