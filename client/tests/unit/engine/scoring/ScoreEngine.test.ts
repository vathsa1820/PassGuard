import { describe, it, expect } from 'vitest';
import { ScoreEngine, calculateScore } from '../../../../src/engine/scoring/ScoreEngine';
import { defaultScoreWeights } from '../../../../src/engine/scoring/scoreWeights';
import { determineScoreStatus } from '../../../../src/engine/scoring/scoreRules';

describe('ScoreEngine Unit Tests', () => {
  const engine = new ScoreEngine();

  describe('Score Weight Totals', () => {
    it('verifies that configured default weights sum up to exactly 100', () => {
      const totalWeight = Object.values(defaultScoreWeights).reduce((sum, w) => sum + w, 0);
      expect(totalWeight).toBe(100);
    });
  });

  describe('Rule Result Evaluation & Scoring', () => {
    it('returns score 0 and status Weak for empty rule results', () => {
      const result = engine.calculate([]);
      expect(result.score).toBe(0);
      expect(result.status).toBe('Weak');
      expect(result.color).toBe('red');
    });

    it('returns score 0 and status Weak when all rules fail', () => {
      const failedRules = [
        { id: 'min-length', passed: false },
        { id: 'uppercase', passed: false },
        { id: 'lowercase', passed: false },
        { id: 'number', passed: false },
        { id: 'special-char', passed: false },
      ];
      const result = engine.calculate(failedRules);
      expect(result.score).toBe(0);
      expect(result.status).toBe('Weak');
    });

    it('adds weight correctly for individual rule success', () => {
      const singleRule = [{ id: 'min-length', passed: true }]; // weight = 25
      const result = engine.calculate(singleRule);
      expect(result.score).toBe(25);
      expect(result.status).toBe('Weak');
    });

    it('sums weights correctly for multiple passed rules', () => {
      const rules = [
        { id: 'min-length', passed: true },  // 25
        { id: 'uppercase', passed: true },   // 10
        { id: 'lowercase', passed: true },   // 10
      ];
      const result = engine.calculate(rules);
      expect(result.score).toBe(45);
      expect(result.status).toBe('Fair');
    });

    it('returns score 100 and status Excellent when all default rules pass', () => {
      const allPassed = Object.keys(defaultScoreWeights).map((id) => ({
        id,
        passed: true,
      }));
      const result = engine.calculate(allPassed);
      expect(result.score).toBe(100);
      expect(result.status).toBe('Excellent');
      expect(result.color).toBe('green');
    });
  });

  describe('Score Boundaries (0 to 100)', () => {
    it('clamps negative weight sums to 0', () => {
      const customEngine = new ScoreEngine({ 'min-length': -50 });
      const result = customEngine.calculate([{ id: 'min-length', passed: true }]);
      expect(result.score).toBe(0);
    });

    it('clamps excessive weight sums to 100', () => {
      const customEngine = new ScoreEngine({ rule1: 80, rule2: 70 });
      const result = customEngine.calculate([
        { id: 'rule1', passed: true },
        { id: 'rule2', passed: true },
      ]);
      expect(result.score).toBe(100);
    });
  });

  describe('Status Boundaries (30, 31, 60, 61, 80, 81, 100)', () => {
    it('maps 0 to Weak (red)', () => {
      const res = determineScoreStatus(0);
      expect(res.status).toBe('Weak');
      expect(res.color).toBe('red');
    });

    it('maps exactly 30 to Weak (red)', () => {
      const res = determineScoreStatus(30);
      expect(res.status).toBe('Weak');
      expect(res.color).toBe('red');
    });

    it('maps boundary 31 to Fair (orange)', () => {
      const res = determineScoreStatus(31);
      expect(res.status).toBe('Fair');
      expect(res.color).toBe('orange');
    });

    it('maps boundary 60 to Fair (orange)', () => {
      const res = determineScoreStatus(60);
      expect(res.status).toBe('Fair');
      expect(res.color).toBe('orange');
    });

    it('maps boundary 61 to Strong (blue)', () => {
      const res = determineScoreStatus(61);
      expect(res.status).toBe('Strong');
      expect(res.color).toBe('blue');
    });

    it('maps boundary 80 to Strong (blue)', () => {
      const res = determineScoreStatus(80);
      expect(res.status).toBe('Strong');
      expect(res.color).toBe('blue');
    });

    it('maps boundary 81 to Excellent (green)', () => {
      const res = determineScoreStatus(81);
      expect(res.status).toBe('Excellent');
      expect(res.color).toBe('green');
    });

    it('maps boundary 100 to Excellent (green)', () => {
      const res = determineScoreStatus(100);
      expect(res.status).toBe('Excellent');
      expect(res.color).toBe('green');
    });
  });
});
