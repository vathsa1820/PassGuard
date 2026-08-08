import { usePasswordAnalysis } from './usePasswordAnalysis';

export function usePasswordStrength(password: string) {
  const analysis = usePasswordAnalysis(password);
  return {
    entropy: analysis.entropy,
    score: analysis.score,
  };
}

