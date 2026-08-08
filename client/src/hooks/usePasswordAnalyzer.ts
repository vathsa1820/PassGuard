import { useState } from 'react';
import { usePasswordAnalysis } from './usePasswordAnalysis';

export interface UsePasswordAnalyzerOptions {
  initialPassword?: string;
}

/**
 * Custom React hook connecting the PassGuard Intelligence Engine to reactive UI state.
 * Evaluates password inputs on every keystroke in real-time.
 */
export function usePasswordAnalyzer(options: UsePasswordAnalyzerOptions = {}) {
  const [password, setPassword] = useState(options.initialPassword || '');
  const analysis = usePasswordAnalysis(password);

  return {
    password,
    setPassword,
    analysis,
    isAnalyzing: false,
  };
}

