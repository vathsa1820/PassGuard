import { describe, it, expect } from 'vitest';
import { CommonPasswordEngine, checkCommonPassword } from '../../../../src/engine/common-passwords/CommonPasswordEngine';

describe('CommonPasswordEngine Unit Tests', () => {
  const engine = new CommonPasswordEngine();

  describe('Known Breach Dataset Checking', () => {
    it('flags known common passwords like "password"', () => {
      const result = engine.evaluate('password');
      expect(result.isCommon).toBe(true);
      expect(result.risk).toBe('High');
    });

    it('flags known common passwords like "123456"', () => {
      const result = engine.evaluate('123456');
      expect(result.isCommon).toBe(true);
      expect(result.risk).toBe('High');
    });

    it('flags known common passwords like "admin"', () => {
      const result = engine.evaluate('admin');
      expect(result.isCommon).toBe(true);
      expect(result.risk).toBe('High');
    });

    it('flags known common passwords like "qwerty"', () => {
      const result = engine.evaluate('qwerty');
      expect(result.isCommon).toBe(true);
      expect(result.risk).toBe('High');
    });
  });

  describe('Case-Insensitive Checking', () => {
    it('flags uppercase variants like "PASSWORD"', () => {
      const result = engine.evaluate('PASSWORD');
      expect(result.isCommon).toBe(true);
    });

    it('flags titlecase variants like "Admin"', () => {
      const result = engine.evaluate('Admin');
      expect(result.isCommon).toBe(true);
    });

    it('flags mixed case variants like "QwErTy"', () => {
      const result = engine.evaluate('QwErTy');
      expect(result.isCommon).toBe(true);
    });
  });

  describe('Unknown & Empty Passwords', () => {
    it('returns false for unknown complex passwords', () => {
      const result = engine.evaluate('P@ssGu@rd2026!Xz#9');
      expect(result.isCommon).toBe(false);
      expect(result.risk).toBe('None');
    });

    it('returns false for empty password', () => {
      const result = engine.evaluate('');
      expect(result.isCommon).toBe(false);
      expect(result.risk).toBe('None');
    });
  });
});
