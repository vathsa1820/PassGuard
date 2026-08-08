import { describe, it, expect } from 'vitest';
import { analyzePassword } from '../../src/index';

describe('Password Analysis Integration', () => {
  it('performs full local password analysis correctly', async () => {
    const result = await analyzePassword('P@ssGu@rd2026!');
    expect(result.score).toBeGreaterThan(60);
    expect(result.status).toMatch(/Strong|Excellent/);
    expect(Array.isArray(result.rules)).toBe(true);
    expect(result.rules.length).toBeGreaterThan(0);
  });
});
