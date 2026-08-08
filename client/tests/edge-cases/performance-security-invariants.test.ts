import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Edge Case: Performance Benchmarks & Security Invariants', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Performance Benchmarks', () => {
    it('executes analysis in under 50ms for standard 16-character complex password', async () => {
      const start = performance.now();
      await analyzer.analyze('P@ssGu@rd2026!Xz#');
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50);
    });

    it('executes 100 consecutive rapid analyses in under 1000ms total', async () => {
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        await analyzer.analyze(`Pass${i}!@#2026`);
      }
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1000);
    });
  });

  describe('2. Privacy & Security Invariants Under Edge Cases', () => {
    let logSpy: any;
    let fetchSpy: any;

    beforeEach(() => {
      logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      fetchSpy = vi.fn();
      if (typeof window !== 'undefined') {
        window.fetch = fetchSpy;
      }
    });

    afterEach(() => {
      logSpy.mockRestore();
    });

    it('never includes raw password string in returned analysis object values', async () => {
      const secret = 'SuperUltraSecretPass2026!#';
      const result = await analyzer.analyze(secret);

      const jsonString = JSON.stringify(result);

      // Verify raw secret does not appear anywhere in output JSON structure
      expect(jsonString).not.toContain(secret);
      expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining(secret));
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });
});
