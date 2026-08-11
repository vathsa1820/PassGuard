import { useState, useEffect, useRef, useMemo } from 'react';
import { PasswordAnalyzer, PasswordAnalysisOutput } from '../engine';
import { createRulesFromPolicy } from '../engine/rules/passwordRules';
import { calculateScore } from '../engine/scoring/ScoreEngine';
import { PasswordPolicy, resolvePasswordPolicy } from '../config';

// Shared singleton instance of default PasswordAnalyzer
const defaultAnalyzerInstance = new PasswordAnalyzer();
const analyzerCache = new Map<string, PasswordAnalyzer>();

function getOrCreateAnalyzer(policy?: PasswordPolicy): PasswordAnalyzer {
  if (!policy) return defaultAnalyzerInstance;
  const key = JSON.stringify(policy);
  let instance = analyzerCache.get(key);
  if (!instance) {
    instance = new PasswordAnalyzer(policy);
    analyzerCache.set(key, instance);
  }
  return instance;
}

/**
 * Custom React hook connecting the PassGuard Intelligence Engine to reactive UI components.
 * 
 * - Accepts current password string and optional PasswordPolicy configuration
 * - Evaluates input against intelligence engines according to active policy
 * - Updates automatically on every password change
 * - Handles empty-password state cleanly
 * - Avoids race conditions and unnecessary recalculations
 * - Keeps UI fully responsive
 */
export function usePasswordAnalysis(
  password: string = '',
  policy?: Partial<PasswordPolicy> | PasswordPolicy
): PasswordAnalysisOutput {
  const policySerialized = useMemo(() => JSON.stringify(policy || {}), [policy]);

  const activePolicy = useMemo(() => {
    return policy ? resolvePasswordPolicy(policy) : undefined;
  }, [policySerialized]);

  const [asyncAnalysis, setAsyncAnalysis] = useState<PasswordAnalysisOutput | null>(null);
  const [analyzedPassword, setAnalyzedPassword] = useState<string>('');

  useEffect(() => {
    let isCurrent = true;

    if (!password) {
      setAsyncAnalysis(null);
      setAnalyzedPassword('');
      return;
    }

    const analyzer = getOrCreateAnalyzer(activePolicy);

    analyzer.analyze(password).then((result) => {
      if (isCurrent) {
        setAsyncAnalysis(result);
        setAnalyzedPassword(password);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [password, policySerialized]);

  const syncAnalysis = useMemo(() => {
    return createInitialAnalysisOutput(password, activePolicy);
  }, [password, policySerialized]);

  if (asyncAnalysis && analyzedPassword === password) {
    return asyncAnalysis;
  }

  return syncAnalysis;
}

/**
 * Generates an initial or empty-state analysis result according to active PasswordPolicy.
 */
function createInitialAnalysisOutput(password: string, policy?: PasswordPolicy): PasswordAnalysisOutput {
  const isPresent = Boolean(password);
  const activePolicy = policy || resolvePasswordPolicy();

  const rules = createRulesFromPolicy(activePolicy).map((r) => {
    const passed = r.validator(password);
    return {
      id: r.id,
      label: r.label,
      passed,
      message: passed ? r.successMessage : r.failureMessage,
    };
  });

  const scoreResult = calculateScore(rules);

  return {
    score: isPresent ? scoreResult.score : 0,
    status: isPresent ? scoreResult.status : 'Weak',
    color: isPresent ? scoreResult.color : 'red',
    percentage: isPresent ? scoreResult.percentage : 0,
    entropy: isPresent ? Math.round(password.length * 4) : 0,
    complexity: isPresent ? 'Medium' : 'Very Low',
    crackTime: isPresent ? 'Calculating...' : 'Instant',
    rules,
    patterns: [],
    commonPassword: { isCommon: false, risk: 'None', message: 'Password is not in common breach database.' },
    reuse: { reused: false, message: isPresent ? 'Checking reuse status...' : 'Password is empty.' },
    suggestion: {
      title: 'Minimum Length Required',
      message: `Increase password length to at least ${activePolicy.minLength} characters to significantly improve security.`,
      expectedScore: 25,
    },
  };
}
