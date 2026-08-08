import { describe, it, expect } from 'vitest';
import { EntropyEngine, calculateEntropy } from '../../../../src/engine/entropy/EntropyEngine';
import { analyzeCharset } from '../../../../src/engine/entropy/charset';
import { calculateRawEntropy } from '../../../../src/engine/entropy/calculations';

describe('EntropyEngine Unit Tests', () => {
  const engine = new EntropyEngine();

  describe('Charset Pool Size Analysis', () => {
    it('detects zero pool for empty string', () => {
      const result = analyzeCharset('');
      expect(result.charsetSize).toBe(0);
      expect(result.hasLowercase).toBe(false);
      expect(result.hasUppercase).toBe(false);
      expect(result.hasNumbers).toBe(false);
      expect(result.hasSymbols).toBe(false);
    });

    it('detects pool size 26 for lowercase-only strings', () => {
      const result = analyzeCharset('lowercase');
      expect(result.charsetSize).toBe(26);
      expect(result.hasLowercase).toBe(true);
      expect(result.hasUppercase).toBe(false);
    });

    it('detects pool size 26 for uppercase-only strings', () => {
      const result = analyzeCharset('UPPERCASE');
      expect(result.charsetSize).toBe(26);
      expect(result.hasUppercase).toBe(true);
      expect(result.hasLowercase).toBe(false);
    });

    it('detects pool size 10 for number-only strings', () => {
      const result = analyzeCharset('1234567890');
      expect(result.charsetSize).toBe(10);
      expect(result.hasNumbers).toBe(true);
    });

    it('detects pool size 32 for symbol-only strings', () => {
      const result = analyzeCharset('!@#$%^&*');
      expect(result.charsetSize).toBe(32);
      expect(result.hasSymbols).toBe(true);
    });

    it('detects combined pool size 94 for full mixed character sets', () => {
      const result = analyzeCharset('aA1!');
      expect(result.charsetSize).toBe(94); // 26 + 26 + 10 + 32
      expect(result.hasLowercase).toBe(true);
      expect(result.hasUppercase).toBe(true);
      expect(result.hasNumbers).toBe(true);
      expect(result.hasSymbols).toBe(true);
    });
  });

  describe('Entropy Numerical Calculation Behavior', () => {
    it('returns zero entropy and instant crack time for empty string', () => {
      const result = engine.evaluate('');
      expect(result.entropy).toBe(0);
      expect(result.charsetSize).toBe(0);
      expect(result.length).toBe(0);
      expect(result.complexity).toBe('Very Low');
      expect(result.crackTime).toBe('Instant');
    });

    it('calculates log2(charsetSize^length) raw entropy correctly', () => {
      // 10 chars from pool 10: 10 * log2(10) ≈ 33.2 bits
      const raw = calculateRawEntropy(10, 10);
      expect(raw).toBeCloseTo(33.219, 2);
    });

    it('demonstrates higher entropy for longer passwords with identical character pool', () => {
      const short = engine.evaluate('abcdefgh');      // 8 chars
      const long = engine.evaluate('abcdefghijklmnop'); // 16 chars
      expect(long.entropy).toBeGreaterThan(short.entropy);
      expect(short.charsetSize).toBe(long.charsetSize);
    });

    it('demonstrates higher entropy for wider character set at same length', () => {
      const numOnly = engine.evaluate('123456789012'); // 12 chars, pool 10
      const mixed = engine.evaluate('aB1!cD2@eF3#');   // 12 chars, pool 94
      expect(mixed.entropy).toBeGreaterThan(numOnly.entropy);
    });
  });

  describe('Complexity Classification', () => {
    it('classifies low entropy as Very Low or Low', () => {
      const res = calculateEntropy('123');
      expect(['Very Low', 'Low']).toContain(res.complexity);
    });

    it('classifies high entropy mixed passwords as High or Very High', () => {
      const res = calculateEntropy('P@ssGu@rd2026!Xz#9');
      expect(['High', 'Very High']).toContain(res.complexity);
    });
  });
});
