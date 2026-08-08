import { PasswordPolicy } from './policyTypes';
import { defaultPasswordPolicy } from './defaultPolicy';

export interface PolicyValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a PasswordPolicy configuration object for security constraints and type correctness.
 * 
 * Enforces rules such as:
 * - minLength must be an integer >= 1
 * - maxLength must be an integer >= minLength
 * - boolean rule flags must be strictly boolean values
 */
export function validatePasswordPolicy(policy: unknown): PolicyValidationResult {
  const errors: string[] = [];

  if (!policy || typeof policy !== 'object') {
    return {
      valid: false,
      errors: ['Password policy configuration must be a non-null object.'],
    };
  }

  const p = policy as Partial<PasswordPolicy>;

  // minLength validation
  if (p.minLength !== undefined) {
    if (typeof p.minLength !== 'number' || isNaN(p.minLength) || !Number.isInteger(p.minLength)) {
      errors.push('minLength must be a valid integer.');
    } else if (p.minLength < 1) {
      errors.push('minLength must be at least 1.');
    }
  }

  // maxLength validation
  if (p.maxLength !== undefined) {
    if (typeof p.maxLength !== 'number' || isNaN(p.maxLength) || !Number.isInteger(p.maxLength)) {
      errors.push('maxLength must be a valid integer.');
    } else if (
      p.minLength !== undefined &&
      typeof p.minLength === 'number' &&
      p.maxLength < p.minLength
    ) {
      errors.push(`maxLength (${p.maxLength}) cannot be less than minLength (${p.minLength}).`);
    }
  }

  // Boolean flags validation
  const booleanFlags: (keyof PasswordPolicy)[] = [
    'requireUppercase',
    'requireLowercase',
    'requireNumber',
    'requireSymbol',
    'preventRepeatedCharacters',
    'preventSequentialPatterns',
    'preventKeyboardPatterns',
    'checkCommonPasswords',
    'preventReuse',
  ];

  for (const flag of booleanFlags) {
    if (p[flag] !== undefined && typeof p[flag] !== 'boolean') {
      errors.push(`Property '${flag}' must be a boolean value.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Merges partial custom policy options with defaultPasswordPolicy and validates the result.
 * Throws a descriptive Error if validation fails.
 */
export function resolvePasswordPolicy(customPolicy?: Partial<PasswordPolicy> | PasswordPolicy): PasswordPolicy {
  if (!customPolicy) {
    return defaultPasswordPolicy;
  }

  const mergedPolicy: PasswordPolicy = {
    ...defaultPasswordPolicy,
    ...customPolicy,
  };

  const validation = validatePasswordPolicy(mergedPolicy);
  if (!validation.valid) {
    throw new Error(`Invalid PasswordPolicy configuration:\n- ${validation.errors.join('\n- ')}`);
  }

  return mergedPolicy;
}
