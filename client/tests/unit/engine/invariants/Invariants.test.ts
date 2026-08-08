import { describe, it, expect } from 'vitest';
import { analyzePassword, PasswordAnalyzer } from '../../../../src/engine/analyzer/PasswordAnalyzer';
import { defaultScoreWeights } from '../../../../src/engine/scoring/scoreWeights';

describe('Property & Invariant Tests', () => {
  const analyzer = new PasswordAnalyzer();

  it('Invariant 1: Score is bounded strictly between 0 and 100 for any random input', async () => {
    const testCases = [
      '',
      'a',
      '1234567890',
      'qwertyuiopasdfghjklzxcvbnm',
      '!@#$%^&*()_+~`|}{[]:;?><,./-',
      'P@ssGu@rd2026!Xz#9',
      'x'.repeat(500),
      '🌟🚀🔑🗝️🛡️',
    ];

    for (const input of testCases) {
      const res = await analyzer.analyze(input);
      expect(res.score).toBeGreaterThanOrEqual(0);
      expect(res.score).toBeLessThanOrEqual(100);
    }
  });

  it('Invariant 2: Empty input never throws or crashes', async () => {
    await expect(analyzer.analyze('')).resolves.not.toThrow();
  });

  it('Invariant 3: Extremely long input (10,000 characters) never crashes', async () => {
    const hugeInput = 'A1!'.repeat(3334); // 10,002 chars
    await expect(analyzer.analyze(hugeInput)).resolves.not.toThrow();
  });

  it('Invariant 4: Analyzer always returns complete consistent object shape', async () => {
    const res = await analyzer.analyze('TestString123!');
    expect(res).toHaveProperty('score');
    expect(res).toHaveProperty('status');
    expect(res).toHaveProperty('entropy');
    expect(res).toHaveProperty('rules');
    expect(res).toHaveProperty('patterns');
    expect(res).toHaveProperty('commonPassword');
    expect(res).toHaveProperty('reuse');
    expect(res).toHaveProperty('suggestion');
  });

  it('Invariant 5: Zero plaintext password string appears in returned analysis object', async () => {
    const plaintext = 'UniqueSecretKey2026!#';
    const res = await analyzer.analyze(plaintext);
    const jsonString = JSON.stringify(res);

    expect(jsonString).not.toContain(plaintext);
  });

  it('Invariant 6: Suggestion engine object is a single suggestion representation', async () => {
    const res = await analyzer.analyze('weak');
    expect(res.suggestion).toHaveProperty('title');
    expect(res.suggestion).toHaveProperty('message');
    expect(res.suggestion).toHaveProperty('expectedScore');
  });

  it('Invariant 7: Rule IDs remain strictly unique within rule output list', async () => {
    const res = await analyzer.analyze('CheckRuleIds123!');
    const ids = res.rules.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('Invariant 8: Total default score weights sum up to 100', () => {
    const sum = Object.values(defaultScoreWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
  });

  it('Invariant 9: Analysis is 100% deterministic for identical inputs and configuration', async () => {
    const pass = 'DeterministicPass123!';
    const run1 = await analyzer.analyze(pass);
    const run2 = await analyzer.analyze(pass);

    expect(run1.score).toBe(run2.score);
    expect(run1.status).toBe(run2.status);
    expect(run1.entropy).toBe(run2.entropy);
    expect(run1.rules).toEqual(run2.rules);
  });
});
