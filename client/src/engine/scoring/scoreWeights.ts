import { ScoreWeightsMap } from './types';

/**
 * Standard default rule score weights (Sum = 100)
 */
export const defaultScoreWeights: ScoreWeightsMap = {
  'min-length': 25,
  'uppercase': 10,
  'lowercase': 10,
  'number': 10,
  'special-char': 15,
  'no-repeated-chars': 10,
  'no-sequential-numbers': 5,
  'no-sequential-letters': 5,
  'no-keyboard-patterns': 5,
  'no-whitespace': 5,
};
