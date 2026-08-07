import { EvaluatedRuleInput, ScoreOutput, ScoreWeightsMap } from './types';
import { defaultScoreWeights } from './scoreWeights';
import { determineScoreStatus } from './scoreRules';

/**
 * ScoreEngine Class
 * Pure score calculation engine based on rule evaluation inputs.
 */
export class ScoreEngine {
  private weights: ScoreWeightsMap;

  constructor(weights: ScoreWeightsMap = defaultScoreWeights) {
    this.weights = weights;
  }

  /**
   * Calculates overall password health score from rule evaluation results.
   */
  public calculate(ruleResults: EvaluatedRuleInput[]): ScoreOutput {
    let rawScore = 0;

    for (const rule of ruleResults) {
      if (rule.passed) {
        const weight = this.weights[rule.id] || 0;
        rawScore += weight;
      }
    }

    const score = Math.min(Math.max(rawScore, 0), 100);
    const { status, color } = determineScoreStatus(score);

    return {
      score,
      status,
      color,
      percentage: score,
    };
  }
}

/**
 * Pure helper function for immediate score calculation.
 */
export function calculateScore(
  ruleResults: EvaluatedRuleInput[],
  weights: ScoreWeightsMap = defaultScoreWeights
): ScoreOutput {
  const engine = new ScoreEngine(weights);
  return engine.calculate(ruleResults);
}
