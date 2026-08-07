import { SuggestionInput, SuggestionOutput } from './types';
import { generateRankedCandidates } from './priority';

/**
 * SuggestionEngine Class
 * Analyzes security evaluation metrics and returns exactly ONE highest impact recommendation.
 */
export class SuggestionEngine {
  public evaluate(input: SuggestionInput): SuggestionOutput {
    const candidates = generateRankedCandidates(input);
    const best = candidates[0];

    return {
      title: best.title,
      message: best.message,
      expectedScore: best.expectedScore,
    };
  }
}

/**
 * Pure helper function for immediate suggestion generation.
 */
export function generateBestSuggestion(input: SuggestionInput): SuggestionOutput {
  const engine = new SuggestionEngine();
  return engine.evaluate(input);
}
