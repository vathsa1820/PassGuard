import { describe, it, expect } from 'vitest';
import { validatePasswordPolicy, resolvePasswordPolicy } from '../../src/config/policyValidator';

describe('Edge Case: Policy Configuration Validation', () => {
  it('rejects minLength = 0 or minLength < 0 with validation errors', () => {
    const res0 = validatePasswordPolicy({ minLength: 0 });
    const resNeg = validatePasswordPolicy({ minLength: -5 });

    expect(res0.valid).toBe(false);
    expect(res0.errors).toContain('minLength must be at least 1.');
    expect(resNeg.valid).toBe(false);
    expect(resNeg.errors).toContain('minLength must be at least 1.');
  });

  it('rejects maxLength < minLength with validation error', () => {
    const res = validatePasswordPolicy({ minLength: 16, maxLength: 8 });

    expect(res.valid).toBe(false);
    expect(res.errors[0]).toMatch(/maxLength \(8\) cannot be less than minLength \(16\)/);
  });

  it('rejects non-boolean values passed to rule flags', () => {
    const res = validatePasswordPolicy({ requireUppercase: 'yes' as any });

    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Property 'requireUppercase' must be a boolean value.");
  });

  it('rejects null or non-object policy configurations', () => {
    const resNull = validatePasswordPolicy(null);
    const resString = validatePasswordPolicy('invalid-policy');

    expect(resNull.valid).toBe(false);
    expect(resString.valid).toBe(false);
  });

  it('merges missing optional properties safely with defaultPasswordPolicy', () => {
    const partial = resolvePasswordPolicy({ minLength: 14 });

    expect(partial.minLength).toBe(14);
    expect(partial.requireUppercase).toBe(true);
    expect(partial.preventReuse).toBe(true);
  });

  it('throws descriptive Error when resolvePasswordPolicy receives invalid policy object', () => {
    expect(() => resolvePasswordPolicy({ minLength: -1 })).toThrow(/Invalid PasswordPolicy configuration/);
  });
});
