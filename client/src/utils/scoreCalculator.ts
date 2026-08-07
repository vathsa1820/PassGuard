import { StrengthScore } from '../types/score';

export function calculateScore(password: string, entropy: number): StrengthScore {
  if (!password) return 0;
  if (entropy < 28) return 1;
  if (entropy < 40) return 2;
  if (entropy < 60) return 3;
  return 4;
}
