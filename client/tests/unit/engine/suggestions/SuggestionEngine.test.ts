import { describe, it, expect } from 'vitest';
import { SuggestionEngine } from '../../../../src/engine/suggestions/SuggestionEngine';

describe('SuggestionEngine Unit Tests', () => {
  const engine = new SuggestionEngine();

  it('returns appropriate guidance when password passes all rules', () => {
    const output = engine.evaluate({
      ruleResults: [
        { id: 'min-length', passed: true },
        { id: 'uppercase', passed: true },
        { id: 'lowercase', passed: true },
        { id: 'number', passed: true },
        { id: 'special-char', passed: true },
      ],
      patternResults: [],
      entropyResult: { entropy: 80, complexity: 'High', crackTime: 'Centuries' },
      reuseResult: { reused: false },
      currentScore: 100,
    });

    expect(output).toHaveProperty('title');
    expect(output).toHaveProperty('message');
    expect(output).toHaveProperty('expectedScore');
    expect(typeof output.expectedScore).toBe('number');
  });

  it('returns length improvement suggestion as top priority when min-length fails', () => {
    const output = engine.evaluate({
      ruleResults: [
        { id: 'min-length', passed: false },
        { id: 'uppercase', passed: false },
      ],
      patternResults: [],
      entropyResult: { entropy: 10, complexity: 'Very Low' },
      reuseResult: { reused: false },
      currentScore: 20,
    });

    expect(output.title).toMatch(/length|longer/i);
    expect(output.expectedScore).toBeGreaterThan(20);
  });

  it('prioritizes reuse warning when password reuse is detected', () => {
    const output = engine.evaluate({
      ruleResults: [
        { id: 'min-length', passed: true },
        { id: 'uppercase', passed: true },
      ],
      patternResults: [],
      entropyResult: { entropy: 70, complexity: 'High' },
      reuseResult: { reused: true, message: 'Password has been reused.' },
      currentScore: 80,
    });

    expect(output.title).toMatch(/unique|reuse/i);
  });

  it('ensures returned expectedScore is greater than or equal to currentScore', () => {
    const output = engine.evaluate({
      ruleResults: [{ id: 'special-char', passed: false }],
      patternResults: [],
      entropyResult: { entropy: 40, complexity: 'Fair' },
      reuseResult: { reused: false },
      currentScore: 50,
    });

    expect(output.expectedScore).toBeGreaterThanOrEqual(50);
  });
});
