import { EntropyComplexity } from './types';

/**
 * Calculates raw Shannon entropy in bits: E = L * log2(R)
 */
export function calculateRawEntropy(length: number, charsetSize: number): number {
  if (length <= 0 || charsetSize <= 1) return 0;
  return length * Math.log2(charsetSize);
}

/**
 * Maps entropy bits to human complexity tiers.
 */
export function determineComplexity(entropy: number): EntropyComplexity {
  if (entropy < 28) return 'Very Low';
  if (entropy < 46) return 'Low';
  if (entropy < 66) return 'Medium';
  if (entropy < 86) return 'High';
  return 'Very High';
}

/**
 * Estimates offline crack time assuming 10 billion guesses/second (modern GPU cluster).
 */
export function estimateCrackTime(entropy: number): string {
  if (entropy <= 0) return 'Instant';

  const guesses = Math.pow(2, entropy);
  const guessesPerSecond = 10_000_000_000; // 10 billion/sec
  const seconds = guesses / guessesPerSecond;

  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `Approximately ${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `Approximately ${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `Approximately ${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `Approximately ${Math.round(seconds / 86400)} days`;

  const years = Math.round(seconds / 31536000);
  if (years < 1000) return `Approximately ${years} years`;
  if (years < 1_000_000) return `Over ${Math.round(years / 1000)} thousand years`;
  return 'Over 1 million years';
}
