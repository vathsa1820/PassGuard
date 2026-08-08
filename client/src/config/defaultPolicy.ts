import { PasswordPolicy } from './policyTypes';

/**
 * Enterprise-grade secure default password policy.
 * Applied automatically when developers provide no custom policy configuration.
 */
export const defaultPasswordPolicy: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: true,
  preventKeyboardPatterns: true,
  checkCommonPasswords: true,
  preventReuse: true,
};
