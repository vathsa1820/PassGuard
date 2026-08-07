import { calculateEntropy } from './entropyCalculator';
import { calculateScore } from './scoreCalculator';
import { PasswordAnalysis } from '../types/password';

export function analyzePassword(password: string): PasswordAnalysis {
  const entropy = calculateEntropy(password);
  const score = calculateScore(password, entropy);

  return {
    score,
    entropy,
    feedback: [],
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^a-zA-Z0-9]/.test(password),
    isCommon: false,
  };
}
