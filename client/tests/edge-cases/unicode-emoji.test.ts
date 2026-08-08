import { describe, it, expect } from 'vitest';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Edge Case: Unicode & Emoji Support', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Unicode Scripts & Accents', () => {
    it('handles accented Latin characters ("Café123!", "MünchenPass2026!")', async () => {
      const res1 = await analyzer.analyze('Café123!');
      const res2 = await analyzer.analyze('MünchenPass2026!');
      expect(res1.score).toBeGreaterThan(0);
      expect(res2.score).toBeGreaterThan(50);
    });

    it('handles Cyrillic script ("Пароль123!")', async () => {
      const result = await analyzer.analyze('Пароль123!');
      expect(result.score).toBeGreaterThan(0);
      expect(result.status).toBeDefined();
    });

    it('handles Greek script ("Σύνθημα123!")', async () => {
      const result = await analyzer.analyze('Σύνθημα123!');
      expect(result.score).toBeGreaterThan(0);
    });

    it('handles CJK characters ("密码Pass123!", "パスワード123!")', async () => {
      const cjk1 = await analyzer.analyze('密码Pass123!');
      const cjk2 = await analyzer.analyze('パスワード123!');
      expect(cjk1.score).toBeGreaterThan(0);
      expect(cjk2.score).toBeGreaterThan(0);
    });

    it('handles combining diacritical marks ("P\\u0301a\\u0301ss123!")', async () => {
      const result = await analyzer.analyze('P\u0301a\u0301ss123!');
      expect(result.score).toBeGreaterThan(0);
    });
  });

  describe('2. Emoji Handling', () => {
    it('handles single emoji ("🔒Pass2026!")', async () => {
      const result = await analyzer.analyze('🔒Pass2026!');
      expect(result.score).toBeGreaterThan(50);
      expect(result.rules.find((r) => r.id === 'special-char')?.passed).toBe(true);
    });

    it('handles multiple emoji sequences ("🛡️🔒🗝️Pass!")', async () => {
      const result = await analyzer.analyze('🛡️🔒🗝️Pass!');
      expect(result.score).toBeGreaterThan(40);
    });

    it('handles emoji mixed with numbers and symbols ("🔑1234567890!")', async () => {
      const result = await analyzer.analyze('🔑1234567890!');
      expect(result.score).toBeGreaterThan(40);
    });

    it('calculates entropy without crashing on surrogate pair emoji', async () => {
      const result = await analyzer.analyze('😀😃😄😁😆😅🤣😂');
      expect(result.entropy).toBeGreaterThan(0);
      expect(result.crackTime).toBeDefined();
    });
  });
});
