import { RuleResult, RuleDefinition } from './types';
import { defaultPasswordRules, createRulesFromPolicy } from './passwordRules';
import { PasswordPolicy, resolvePasswordPolicy, defaultPasswordPolicy } from '../../config';

/**
 * RuleEngine Class
 * Modular, pure rule execution engine.
 * Consumes configurable PasswordPolicy to dynamically evaluate password requirements.
 */
export class RuleEngine {
  private policy: PasswordPolicy;
  private rules: RuleDefinition[];

  constructor(policyOrRules?: Partial<PasswordPolicy> | PasswordPolicy | RuleDefinition[]) {
    if (Array.isArray(policyOrRules)) {
      this.policy = defaultPasswordPolicy;
      this.rules = policyOrRules;
    } else {
      this.policy = resolvePasswordPolicy(policyOrRules);
      this.rules = createRulesFromPolicy(this.policy);
    }
  }

  /**
   * Evaluates all active policy rules against the password input string.
   */
  public evaluate(password: string, policyOverride?: Partial<PasswordPolicy> | PasswordPolicy): RuleResult[] {
    const activeRules = policyOverride
      ? createRulesFromPolicy(resolvePasswordPolicy(policyOverride))
      : this.rules;

    return activeRules.map((rule) => {
      const passed = rule.validator(password);
      return {
        id: rule.id,
        label: rule.label,
        passed,
        message: passed ? rule.successMessage : rule.failureMessage,
      };
    });
  }

  /**
   * Returns the current active policy configuration.
   */
  public getPolicy(): PasswordPolicy {
    return this.policy;
  }

  /**
   * Extends the engine with custom user rules.
   */
  public addRule(rule: RuleDefinition): void {
    this.rules.push(rule);
  }
}

/**
 * Helper function for immediate rule analysis using a PasswordPolicy.
 */
export function analyzeRules(
  password: string,
  policy: Partial<PasswordPolicy> | PasswordPolicy = defaultPasswordPolicy
): RuleResult[] {
  const engine = new RuleEngine(policy);
  return engine.evaluate(password);
}

/**
 * Pure helper function for backward-compatible rule evaluation.
 */
export function evaluateRules(
  password: string,
  rulesOrPolicy: RuleDefinition[] | Partial<PasswordPolicy> | PasswordPolicy = defaultPasswordPolicy
): RuleResult[] {
  const engine = new RuleEngine(rulesOrPolicy as any);
  return engine.evaluate(password);
}

