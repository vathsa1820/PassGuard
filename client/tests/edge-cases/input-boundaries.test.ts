import { describe, it, expect } from 'vitest';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Edge Case: Input Boundaries (Empty, Whitespace, Short, Long)', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Empty Input ("")', () => {
    it('returns a valid, structured analysis result without crashing', async () => {
      const result = await analyzer.analyze('');
      expect(result).toBeDefined();
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(result.status).toBe('Weak');
      expect(Array.isArray(result.rules)).toBe(true);
      expect(Array.isArray(result.patterns)).toBe(true);
      expect(result.commonPassword).toBeDefined();
      expect(result.reuse).toBeDefined();
      expect(result.suggestion).toBeDefined();
    });
  });

  describe('2. Whitespace Inputs', () => {
    it('evaluates single and multiple spaces safely', async () => {
      const singleSpace = await analyzer.analyze(' ');
      const multiSpace = await analyzer.analyze('    ');
      expect(singleSpace.score).toBeLessThan(60);
      expect(multiSpace.score).toBeLessThan(60);
    });

    it('evaluates leading, trailing, internal whitespace, tabs, and newlines', async () => {
      const leading = await analyzer.analyze(' password');
      const trailing = await analyzer.analyze('password ');
      const internal = await analyzer.analyze('pass word');
      const tab = await analyzer.analyze('\tpassword');
      const newline = await analyzer.analyze('password\n');

      expect(leading.score).toBeDefined();
      expect(trailing.score).toBeDefined();
      expect(internal.score).toBeDefined();
      expect(tab.score).toBeDefined();
      expect(newline.score).toBeDefined();
    });
  });

  describe('3. Very Short Passwords', () => {
    it('evaluates 1-4 character inputs without throwing or producing score out of bounds', async () => {
      const shortInputs = ['a', 'ab', '123', '!', 'Ab1!'];
      for (const input of shortInputs) {
        const result = await analyzer.analyze(input);
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
        expect(result.rules.find((r) => r.id === 'min-length')?.passed).toBe(false);
      }
    });
  });

  describe('4. Very Long Passwords', () => {
    it('evaluates 100 character password quickly and correctly', async () => {
      const long100 = 'A1!' + 'a'.repeat(97);
      const result = await analyzer.analyze(long100);
      expect(result.score).toBeGreaterThanOrEqual(70);
    });

    it('evaluates 1,000 character password without catastrophic slowdown', async () => {
      const long1000 = 'P@ssw0rd123!' + 'x'.repeat(988);
      const start = performance.now();
      const result = await analyzer.analyze(long1000);
      const duration = performance.now() - start;

      expect(result.score).toBeGreaterThanOrEqual(70);
      expect(duration).toBeLessThan(50); // Under 50ms
    });

    it('evaluates 10,000 character password safely', async () => {
      const long10000 = 'P@ssw0rd123!' + 'y'.repeat(9988);
      const start = performance.now();
      const result = await analyzer.analyze(long10000);
      const duration = performance.now() - start;

      expect(result.score).toBeGreaterThanOrEqual(70);
      expect(duration).toBeLessThan(100); // Under 100ms
    });

    it('evaluates 100,000 character password without crashing or stack overflow', async () => {
      const long100000 = 'P@ssw0rd123!' + 'z'.repeat(99988);
      const start = performance.now();
      const result = await analyzer.analyze(long100000);
      const duration = performance.now() - start;

      expect(result.score).toBeGreaterThanOrEqual(70);
      expect(duration).toBeLessThan(300); // Under 300ms
    });
  });
});
