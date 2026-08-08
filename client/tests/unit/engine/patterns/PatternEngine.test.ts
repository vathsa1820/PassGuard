import { describe, it, expect } from 'vitest';
import { PatternEngine, detectPatterns } from '../../../../src/engine/patterns/PatternEngine';

describe('PatternEngine Unit Tests', () => {
  const engine = new PatternEngine();

  describe('Sequential Pattern Detection', () => {
    it('detects sequential numbers like 123456', () => {
      const results = engine.evaluate('123456');
      const seqNum = results.find((r) => r.type === 'sequential-numbers');
      expect(seqNum?.detected).toBe(true);
      expect(seqNum?.matchedPattern).toBeDefined();
    });

    it('detects sequential letters like abcdef', () => {
      const results = engine.evaluate('abcdef');
      const seqLet = results.find((r) => r.type === 'sequential-letters');
      expect(seqLet?.detected).toBe(true);
    });

    it('detects uppercase sequential letters like ABCDEF', () => {
      const results = engine.evaluate('ABCDEF');
      const seqLet = results.find((r) => r.type === 'sequential-letters');
      expect(seqLet?.detected).toBe(true);
    });
  });

  describe('Repeated Pattern Detection', () => {
    it('detects repeated characters like aaaaaa', () => {
      const results = engine.evaluate('aaaaaa');
      const repChar = results.find((r) => r.type === 'repeated-chars');
      expect(repChar?.detected).toBe(true);
    });

    it('detects repeated numbers like 111111', () => {
      const results = engine.evaluate('111111');
      const repChar = results.find((r) => r.type === 'repeated-chars');
      expect(repChar?.detected).toBe(true);
    });

    it('detects repeated word patterns like abababab', () => {
      const results = engine.evaluate('abababab');
      const repWord = results.find((r) => r.type === 'repeated-words');
      expect(repWord?.detected).toBe(true);
    });
  });

  describe('Keyboard Pattern Detection', () => {
    it('detects qwerty pattern', () => {
      const results = engine.evaluate('qwerty');
      const kb = results.find((r) => r.type === 'keyboard');
      expect(kb?.detected).toBe(true);
    });

    it('detects asdf pattern', () => {
      const results = engine.evaluate('asdf');
      const kb = results.find((r) => r.type === 'keyboard');
      expect(kb?.detected).toBe(true);
    });

    it('detects zxcv pattern', () => {
      const results = engine.evaluate('zxcv');
      const kb = results.find((r) => r.type === 'keyboard');
      expect(kb?.detected).toBe(true);
    });
  });

  describe('False Positive Prevention on Normal Passwords', () => {
    it('does not trigger pattern detections on complex random-looking passwords', () => {
      const results = engine.evaluate('k9#mP$92vL!x');
      const detected = results.filter((r) => r.detected);
      expect(detected.length).toBe(0);
    });
  });

  describe('Multiple Pattern Detection', () => {
    it('detects multiple pattern types in a single compound password string', () => {
      const results = engine.evaluate('qwerty1234aaaa');
      const detectedTypes = results.filter((r) => r.detected).map((r) => r.type);

      expect(detectedTypes).toContain('keyboard');
      expect(detectedTypes).toContain('sequential-numbers');
      expect(detectedTypes).toContain('repeated-chars');
    });
  });
});
