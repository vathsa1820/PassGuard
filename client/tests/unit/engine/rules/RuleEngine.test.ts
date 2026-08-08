import { describe, it, expect } from 'vitest';
import { RuleEngine, analyzeRules } from '../../../../src/engine/rules/RuleEngine';
import { defaultPasswordRules } from '../../../../src/engine/rules/passwordRules';
import { defaultPasswordPolicy } from '../../../../src/config';

describe('RuleEngine Unit Tests', () => {
  const engine = new RuleEngine();

  describe('Contract and Structure Assertions', () => {
    it('returns an array of rule results with required fields', () => {
      const results = engine.evaluate('Password123!');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      results.forEach((rule) => {
        expect(rule).toHaveProperty('id');
        expect(typeof rule.id).toBe('string');
        expect(rule.id.length).toBeGreaterThan(0);

        expect(rule).toHaveProperty('label');
        expect(typeof rule.label).toBe('string');

        expect(rule).toHaveProperty('passed');
        expect(typeof rule.passed).toBe('boolean');

        expect(rule).toHaveProperty('message');
        expect(typeof rule.message).toBe('string');
        expect(rule.message.length).toBeGreaterThan(0);
      });
    });

    it('ensures rule IDs are unique within the evaluated ruleset', () => {
      const results = engine.evaluate('AnyString123!');
      const ids = results.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Minimum Length Rule (min-length)', () => {
    it('fails for empty password', () => {
      const results = engine.evaluate('');
      const minLengthRule = results.find((r) => r.id === 'min-length');
      expect(minLengthRule?.passed).toBe(false);
    });

    it('fails for 11 characters (below 12 default)', () => {
      const results = engine.evaluate('12345678901'); // 11 chars
      const minLengthRule = results.find((r) => r.id === 'min-length');
      expect(minLengthRule?.passed).toBe(false);
    });

    it('passes for exactly 12 characters', () => {
      const results = engine.evaluate('123456789012'); // 12 chars
      const minLengthRule = results.find((r) => r.id === 'min-length');
      expect(minLengthRule?.passed).toBe(true);
    });

    it('passes for longer than 12 characters', () => {
      const results = engine.evaluate('123456789012345'); // 15 chars
      const minLengthRule = results.find((r) => r.id === 'min-length');
      expect(minLengthRule?.passed).toBe(true);
    });

    it('respects custom minLength policy configuration', () => {
      const customRules = analyzeRules('Short1!', { ...defaultPasswordPolicy, minLength: 6 });
      const minLengthRule = customRules.find((r) => r.id === 'min-length');
      expect(minLengthRule?.passed).toBe(true);
    });
  });

  describe('Uppercase Requirement (uppercase)', () => {
    it('fails when no uppercase letter is present', () => {
      const results = engine.evaluate('lowercase123!');
      const rule = results.find((r) => r.id === 'uppercase');
      expect(rule?.passed).toBe(false);
    });

    it('passes with one uppercase letter', () => {
      const results = engine.evaluate('lowercaseP123!');
      const rule = results.find((r) => r.id === 'uppercase');
      expect(rule?.passed).toBe(true);
    });

    it('passes with multiple uppercase letters', () => {
      const results = engine.evaluate('LOWERCASE123!');
      const rule = results.find((r) => r.id === 'uppercase');
      expect(rule?.passed).toBe(true);
    });
  });

  describe('Lowercase Requirement (lowercase)', () => {
    it('fails when no lowercase letter is present', () => {
      const results = engine.evaluate('UPPERCASE123!');
      const rule = results.find((r) => r.id === 'lowercase');
      expect(rule?.passed).toBe(false);
    });

    it('passes with one lowercase letter', () => {
      const results = engine.evaluate('UPPERCASEa123!');
      const rule = results.find((r) => r.id === 'lowercase');
      expect(rule?.passed).toBe(true);
    });

    it('passes with multiple lowercase letters', () => {
      const results = engine.evaluate('UPPERCASEabc123!');
      const rule = results.find((r) => r.id === 'lowercase');
      expect(rule?.passed).toBe(true);
    });
  });

  describe('Number Requirement (number)', () => {
    it('fails when no number is present', () => {
      const results = engine.evaluate('NoNumbersHere!');
      const rule = results.find((r) => r.id === 'number');
      expect(rule?.passed).toBe(false);
    });

    it('passes with one number', () => {
      const results = engine.evaluate('OneNumber1Here!');
      const rule = results.find((r) => r.id === 'number');
      expect(rule?.passed).toBe(true);
    });

    it('passes with multiple numbers', () => {
      const results = engine.evaluate('Numbers12345!');
      const rule = results.find((r) => r.id === 'number');
      expect(rule?.passed).toBe(true);
    });
  });

  describe('Special Character Requirement (special-char)', () => {
    it('fails when no symbol is present', () => {
      const results = engine.evaluate('NoSymbols12345');
      const rule = results.find((r) => r.id === 'special-char');
      expect(rule?.passed).toBe(false);
    });

    it('passes with one symbol', () => {
      const results = engine.evaluate('OneSymbol12345!');
      const rule = results.find((r) => r.id === 'special-char');
      expect(rule?.passed).toBe(true);
    });

    it('passes with multiple symbols', () => {
      const results = engine.evaluate('Symbols!@#$%^&*');
      const rule = results.find((r) => r.id === 'special-char');
      expect(rule?.passed).toBe(true);
    });
  });

  describe('Repeated Characters Rule (no-repeated-chars)', () => {
    it('passes for normal passwords without 4+ identical consecutive characters', () => {
      const results = engine.evaluate('PasssWord123!'); // 3 's' is allowed
      const rule = results.find((r) => r.id === 'no-repeated-chars');
      expect(rule?.passed).toBe(true);
    });

    it('fails when 4 or more identical consecutive characters exist', () => {
      const results = engine.evaluate('PassssWord123!'); // 4 's'
      const rule = results.find((r) => r.id === 'no-repeated-chars');
      expect(rule?.passed).toBe(false);
    });

    it('fails when entire password consists of a single repeated character', () => {
      const results = engine.evaluate('aaaaaaaaaaaa');
      const rule = results.find((r) => r.id === 'no-repeated-chars');
      expect(rule?.passed).toBe(false);
    });
  });

  describe('Sequential Patterns Rule (no-sequential-numbers & no-sequential-letters)', () => {
    it('fails for ascending numbers like 1234', () => {
      const results = engine.evaluate('Pass1234Word!');
      const rule = results.find((r) => r.id === 'no-sequential-numbers');
      expect(rule?.passed).toBe(false);
    });

    it('fails for descending numbers like 4567 or 9876', () => {
      const results = engine.evaluate('Pass9876Word!');
      const rule = results.find((r) => r.id === 'no-sequential-numbers');
      expect(rule?.passed).toBe(false);
    });

    it('fails for ascending letters like abcd', () => {
      const results = engine.evaluate('PassabcdWord12!');
      const rule = results.find((r) => r.id === 'no-sequential-letters');
      expect(rule?.passed).toBe(false);
    });

    it('fails for uppercase sequential letters like ABCD', () => {
      const results = engine.evaluate('PassABCDWord12!');
      const rule = results.find((r) => r.id === 'no-sequential-letters');
      expect(rule?.passed).toBe(false);
    });

    it('passes for non-sequential numbers and letters', () => {
      const results = engine.evaluate('P9k#mP$92vL!x');
      const seqNum = results.find((r) => r.id === 'no-sequential-numbers');
      const seqLet = results.find((r) => r.id === 'no-sequential-letters');
      expect(seqNum?.passed).toBe(true);
      expect(seqLet?.passed).toBe(true);
    });
  });

  describe('Keyboard Patterns Rule (no-keyboard-patterns)', () => {
    it('fails for qwerty pattern', () => {
      const results = engine.evaluate('qwerty123456');
      const rule = results.find((r) => r.id === 'no-keyboard-patterns');
      expect(rule?.passed).toBe(false);
    });

    it('fails for asdf pattern', () => {
      const results = engine.evaluate('asdf12345678');
      const rule = results.find((r) => r.id === 'no-keyboard-patterns');
      expect(rule?.passed).toBe(false);
    });

    it('fails for zxcv pattern', () => {
      const results = engine.evaluate('zxcv12345678');
      const rule = results.find((r) => r.id === 'no-keyboard-patterns');
      expect(rule?.passed).toBe(false);
    });

    it('passes for non-keyboard patterns', () => {
      const results = engine.evaluate('P@ssGu@rd2026!');
      const rule = results.find((r) => r.id === 'no-keyboard-patterns');
      expect(rule?.passed).toBe(true);
    });
  });

  describe('Whitespace Rule (no-whitespace)', () => {
    it('fails for leading space', () => {
      const results = engine.evaluate(' Password123!');
      const rule = results.find((r) => r.id === 'no-whitespace');
      expect(rule?.passed).toBe(false);
    });

    it('fails for trailing space', () => {
      const results = engine.evaluate('Password123! ');
      const rule = results.find((r) => r.id === 'no-whitespace');
      expect(rule?.passed).toBe(false);
    });

    it('passes for internal space without leading/trailing space', () => {
      const results = engine.evaluate('Pass word 123!');
      const rule = results.find((r) => r.id === 'no-whitespace');
      expect(rule?.passed).toBe(true);
    });

    it('fails for string containing only spaces', () => {
      const results = engine.evaluate('   ');
      const rule = results.find((r) => r.id === 'no-whitespace');
      expect(rule?.passed).toBe(false);
    });
  });
});
