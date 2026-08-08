import { useState, useEffect, useRef, useMemo } from 'react';
import { PasswordAnalyzer, PasswordAnalysisOutput } from '../engine';
import { createRulesFromPolicy } from '../engine/rules/passwordRules';
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

  const policyRef = useRef(activePolicy);
  policyRef.current = activePolicy;

  const [analysis, setAnalysis] = useState<PasswordAnalysisOutput>(() =>
    createInitialAnalysisOutput(password, activePolicy)
  );

  const prevPasswordRef = useRef<string>(password);

  useEffect(() => {
    let isCurrent = true;
    prevPasswordRef.current = password;

    if (!password) {
      setAnalysis(createInitialAnalysisOutput('', policyRef.current));
      return;
    }

    const analyzer = getOrCreateAnalyzer(policyRef.current);

    analyzer.analyze(password).then((result) => {
      if (isCurrent) {
        setAnalysis(result);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [password, policySerialized]);

  return analysis;
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

  return {
    score: 0,
    status: 'Weak',
    color: 'red',
    percentage: 0,
    entropy: 0,
    complexity: 'Very Low',
    crackTime: 'Instant',
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
