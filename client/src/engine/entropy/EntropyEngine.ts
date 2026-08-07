import { EntropyOutput } from './types';
import { analyzeCharset } from './charset';
import { calculateRawEntropy, determineComplexity, estimateCrackTime } from './calculations';

/**
 * EntropyEngine Class
 * Pure password entropy and crack time calculation engine.
 */
export class EntropyEngine {
  public evaluate(password: string): EntropyOutput {
    if (!password) {
      return {
        entropy: 0,
        charsetSize: 0,
        length: 0,
        crackTime: 'Instant',
        complexity: 'Very Low',
      };
    }

    const { charsetSize } = analyzeCharset(password);
    const length = password.length;
    const rawEntropy = calculateRawEntropy(length, charsetSize);
    const entropy = Math.round(rawEntropy * 10) / 10; // 1 decimal precision
    const complexity = determineComplexity(entropy);
    const crackTime = estimateCrackTime(entropy);

    return {
      entropy,
      charsetSize,
      length,
      crackTime,
      complexity,
    };
  }
}

/**
 * Pure helper function for direct entropy evaluation.
 */
export function calculateEntropy(password: string): EntropyOutput {
  const engine = new EntropyEngine();
  return engine.evaluate(password);
}
