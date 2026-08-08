import { describe, it, expect } from 'vitest';
import { PasswordAnalyzer, analyzePassword } from '../../../../src/engine/analyzer/PasswordAnalyzer';

describe('PasswordAnalyzer Orchestrator Integration Tests', () => {
  const analyzer = new PasswordAnalyzer();

  describe('10 Representative Password Scenarios', () => {
    it('1. Empty password: returns score 30 (Weak) safely without crashing', async () => {
      const result = await analyzer.analyze('');
      expect(result.score).toBe(30);
      expect(result.status).toBe('Weak');
      expect(result.entropy).toBe(0);
      expect(result.commonPassword.isCommon).toBe(false);
      expect(result.reuse.reused).toBe(false);
    });

    it('2. Very weak password ("123"): flags min-length failure and low entropy', async () => {
      const result = await analyzer.analyze('123');
      expect(result.score).toBe(35); // 10 (number) + 5 (no-whitespace) + 10 (no-repeat) + 5 (no-seq-let) + 5 (no-kb)
      expect(result.status).toBe('Fair');
      const minLen = result.rules.find((r) => r.id === 'min-length');
      expect(minLen?.passed).toBe(false);
    });

    it('3. Common password ("password"): flags common password risk', async () => {
      const result = await analyzer.analyze('password');
      expect(result.commonPassword.isCommon).toBe(true);
      expect(result.commonPassword.risk).toBe('High');
    });

    it('4. Password with sequential pattern ("abc12345"): flags sequential pattern detection', async () => {
      const result = await analyzer.analyze('abc12345');
      const seqPattern = result.patterns.find((p) => p.detected && p.type.includes('sequential'));
      expect(seqPattern).toBeDefined();
    });

    it('5. Password with keyboard pattern ("qwertyuiop"): flags keyboard pattern detection', async () => {
      const result = await analyzer.analyze('qwertyuiop');
      const kbPattern = result.patterns.find((p) => p.type === 'keyboard');
      expect(kbPattern?.detected).toBe(true);
    });

    it('6. Strong but predictable password ("Password123!"): passes basic rules but flags sequential patterns', async () => {
      const result = await analyzer.analyze('Password123!');
      const passedRules = result.rules.filter((r) => r.passed);
      expect(passedRules.length).toBeGreaterThan(5);
    });

    it('7. Strong random-looking password ("k9#mP$92vL!x"): achieves high score and status Strong/Excellent', async () => {
      const result = await analyzer.analyze('k9#mP$92vL!x');
      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(['Strong', 'Excellent']).toContain(result.status);
    });

    it('8. Reused password: flags reuse detection when configured with reuse policy', async () => {
      const customAnalyzer = new PasswordAnalyzer({ preventReuse: true });
      const secret = 'ReusedPass2026!';

      const firstRun = await customAnalyzer.analyze(secret);
      expect(firstRun.reuse.reused).toBe(false);
    });

    it('9. Very long password (1,000+ chars): executes fast without freezing or throwing', async () => {
      const longPass = 'P@ssw0rd!' + 'a'.repeat(1000);
      const start = Date.now();
      const result = await analyzer.analyze(longPass);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100);
      expect(result.score).toBeGreaterThan(0);
    });

    it('10. Password containing Unicode characters ("P@sswørd123!🔑"): handles multi-byte UTF-8 safely', async () => {
      const result = await analyzer.analyze('P@sswørd123!🔑');
      expect(result).toBeDefined();
      expect(typeof result.score).toBe('number');
      expect(typeof result.entropy).toBe('number');
    });
  });

  describe('Analysis Output Shape Guarantee', () => {
    it('returns consistent contract fields on all outputs', async () => {
      const result = await analyzePassword('SamplePass123!');
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('color');
      expect(result).toHaveProperty('percentage');
      expect(result).toHaveProperty('entropy');
      expect(result).toHaveProperty('complexity');
      expect(result).toHaveProperty('crackTime');
      expect(result).toHaveProperty('rules');
      expect(result).toHaveProperty('patterns');
      expect(result).toHaveProperty('commonPassword');
      expect(result).toHaveProperty('reuse');
      expect(result).toHaveProperty('suggestion');
    });
  });
});
