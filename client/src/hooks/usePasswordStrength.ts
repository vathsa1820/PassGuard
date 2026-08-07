import { useMemo } from 'react';
import { calculateEntropy } from '../utils/entropyCalculator';
import { calculateScore } from '../utils/scoreCalculator';

export function usePasswordStrength(password: string) {
  return useMemo(() => {
    const entropy = calculateEntropy(password);
    const score = calculateScore(password, entropy);
    return { entropy, score };
  }, [password]);
}
