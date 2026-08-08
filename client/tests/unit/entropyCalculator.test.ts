import { describe, it, expect } from 'vitest';
import { calculateEntropy } from '../../src/engine/entropy/EntropyEngine';

describe('Entropy Engine Utility', () => {
  it('calculates zero entropy for empty strings', () => {
    const result = calculateEntropy('');
    expect(result.entropy).toBe(0);
    expect(result.complexity).toBe('Very Low');
  });

  it('calculates higher entropy for complex passwords', () => {
    const simple = calculateEntropy('password');
    const complex = calculateEntropy('P@ssw0rd!2026');
    expect(complex.entropy).toBeGreaterThan(simple.entropy);
  });
});
