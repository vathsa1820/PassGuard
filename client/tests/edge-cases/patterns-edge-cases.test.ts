import { describe, it, expect } from 'vitest';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Edge Case: Pattern Detection & Extreme Mixed Inputs', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Repeated Character Patterns', () => {
    it('detects repeated single character sequences ("aaaaaa", "111111", "!!!!!!!!")', async () => {
      const inputs = ['aaaaaa', '111111', '!!!!!!!!'];
      for (const input of inputs) {
        const result = await analyzer.analyze(input);
        const rep = result.patterns.find((p) => p.type === 'repeated-chars');
        expect(rep?.detected).toBe(true);
      }
    });

    it('detects repeated word/substring sequences ("abababab", "abcabcabc")', async () => {
      const inputs = ['abababab', 'abcabcabc'];
      for (const input of inputs) {
        const result = await analyzer.analyze(input);
        const repWords = result.patterns.find((p) => p.type === 'repeated-words');
        expect(repWords?.detected).toBe(true);
      }
    });
  });

  describe('2. Sequential Numbers & Letters', () => {
    it('detects ascending and descending sequential numbers ("123456789", "987654321")', async () => {
      const asc = await analyzer.analyze('123456789');
      const desc = await analyzer.analyze('987654321');

      expect(asc.patterns.find((p) => p.type === 'sequential-numbers')?.detected).toBe(true);
      expect(desc.patterns.find((p) => p.type === 'sequential-numbers')?.detected).toBe(true);
    });

    it('detects ascending, descending, and uppercase sequential letters ("abcdef", "fedcba", "ABCDEF")', async () => {
      const asc = await analyzer.analyze('abcdef');
      const desc = await analyzer.analyze('fedcba');
      const upper = await analyzer.analyze('ABCDEF');

      expect(asc.patterns.find((p) => p.type === 'sequential-letters')?.detected).toBe(true);
      expect(desc.patterns.find((p) => p.type === 'sequential-letters')?.detected).toBe(true);
      expect(upper.patterns.find((p) => p.type === 'sequential-letters')?.detected).toBe(true);
    });
  });

  describe('3. Keyboard Row Spatial Patterns', () => {
    it('detects QWERTY keyboard row patterns ("qwerty", "asdfgh", "zxcvbn")', async () => {
      const inputs = ['qwerty', 'asdfgh', 'zxcvbn'];
      for (const input of inputs) {
        const result = await analyzer.analyze(input);
        expect(result.patterns.find((p) => p.type === 'keyboard')?.detected).toBe(true);
      }
    });
  });

  describe('4. Common Password Dataset Boundaries', () => {
    it('flags common passwords from dataset ("password", "123456", "admin", "qwerty")', async () => {
      const commons = ['password', '123456', 'admin', 'qwerty'];
      for (const pass of commons) {
        const result = await analyzer.analyze(pass);
        expect(result.commonPassword.isCommon).toBe(true);
      }
    });

    it('does not flag near-matches or modified complex passwords as common', async () => {
      const nonCommons = ['password2026!X', '123456_Uniq!', 'admin_Super#9'];
      for (const pass of nonCommons) {
        const result = await analyzer.analyze(pass);
        expect(result.commonPassword.isCommon).toBe(false);
      }
    });
  });

  describe('5. Extreme Mixed Input', () => {
    it('evaluates complex mix of Unicode, Emoji, Symbols, Numbers, Whitespace, and Sequences', async () => {
      const extremePass = '🔒 Pass2026! Café#123 🔑 qwertyuiop_München987654321 ' + 'x'.repeat(100);
      const result = await analyzer.analyze(extremePass);

      expect(result).toBeDefined();
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(result.status).toBeDefined();
    });
  });
});
