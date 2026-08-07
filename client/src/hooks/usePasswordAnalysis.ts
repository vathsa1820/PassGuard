import { useMemo } from 'react';
import { analyzePassword } from '../utils/passwordAnalyzer';

export function usePasswordAnalysis(password: string) {
  return useMemo(() => analyzePassword(password), [password]);
}
