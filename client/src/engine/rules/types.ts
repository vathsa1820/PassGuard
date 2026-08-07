/**
 * PassGuard Rule Engine Types
 * Pure TypeScript definitions for rule evaluation results.
 */

export interface RuleResult {
  id: string;
  label: string;
  passed: boolean;
  message: string;
}

export interface RuleDefinition {
  id: string;
  label: string;
  validator: (password: string) => boolean;
  failureMessage: string;
  successMessage: string;
}
