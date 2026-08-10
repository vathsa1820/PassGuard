import { describe, it, expect } from 'vitest';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Performance Benchmarks & Profiling Suite', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Execution Time Thresholds Across Input Profiles', () => {
    it('analyzes empty input in under 10ms', async () => {
      const start = performance.now();
      await analyzer.analyze('');
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(10);
    });

    it('analyzes standard password ("P@ssGu@rd2026!Xz#") in under 20ms', async () => {
      await analyzer.analyze('warmup');
      const start = performance.now();
      await analyzer.analyze('P@ssGu@rd2026!Xz#');
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(20);
    });

    it('analyzes long password (1,000 chars) in under 50ms', async () => {
      const longInput = 'P@ssw0rd123!' + 'a'.repeat(988);
      const start = performance.now();
      await analyzer.analyze(longInput);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50);
    });

    it('analyzes 10,000 char password in under 100ms', async () => {
      const longInput = 'P@ssw0rd123!' + 'b'.repeat(9988);
      const start = performance.now();
      await analyzer.analyze(longInput);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(100);
    });

    it('analyzes 100,000 char password in under 500ms', async () => {
      const longInput = 'P@ssw0rd123!' + 'c'.repeat(99988);
      const start = performance.now();
      await analyzer.analyze(longInput);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(500);
    });
  });

  describe('2. Rapid Keystroke Analysis Throughput', () => {
    it('processes 100 incremental keystrokes without queue lag or main thread lockup', async () => {
      const start = performance.now();
      let pass = '';
      const sample = 'Ab1!P@ssGu@rd2026';
      for (let i = 0; i < 100; i++) {
        pass += sample[i % sample.length];
        await analyzer.analyze(pass);
      }
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1500);
    });
  });
});
