import { useState, useEffect } from 'react';
import { PasswordAnalysisOutput, analyzePassword } from '../engine';

export interface UsePasswordAnalyzerOptions {
  initialPassword?: string;
}

/**
 * Custom React hook connecting the PassGuard Intelligence Engine to reactive UI state.
 * Evaluates password inputs on every keystroke in real-time.
 */
export function usePasswordAnalyzer(options: UsePasswordAnalyzerOptions = {}) {
  const [password, setPassword] = useState(options.initialPassword || '');
  const [analysis, setAnalysis] = useState<PasswordAnalysisOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setIsAnalyzing(true);

    analyzePassword(password).then((result) => {
      if (isCurrent) {
        setAnalysis(result);
        setIsAnalyzing(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [password]);

  return {
    password,
    setPassword,
    analysis,
    isAnalyzing,
  };
}
