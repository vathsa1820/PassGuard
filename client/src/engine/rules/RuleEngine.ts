import { RuleResult, RuleDefinition } from './types';
import { defaultPasswordRules } from './passwordRules';

/**
 * RuleEngine Class
 * Modular, pure rule execution engine.
 * Takes a password string and evaluates it against rules without state side-effects.
 */
export class RuleEngine {
  private rules: RuleDefinition[];

  constructor(rules: RuleDefinition[] = defaultPasswordRules) {
    this.rules = rules;
  }

  /**
   * Evaluates all configured rules against the password input string.
   */
  public evaluate(password: string): RuleResult[] {
    return this.rules.map((rule) => {
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
   * Extends the engine with custom user rules.
   */
  public addRule(rule: RuleDefinition): void {
    this.rules.push(rule);
  }
}

/**
 * Pure helper function for immediate rule evaluation.
 */
export function evaluateRules(
  password: string,
  rules: RuleDefinition[] = defaultPasswordRules
): RuleResult[] {
  const engine = new RuleEngine(rules);
  return engine.evaluate(password);
}
