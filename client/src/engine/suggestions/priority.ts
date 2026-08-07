import { SuggestionInput, CandidateSuggestion } from './types';
import { SUGGESTION_TEMPLATES } from './messages';

/**
 * Ranks all candidate security recommendations and returns the single highest priority recommendation.
 */
export function generateRankedCandidates(input: SuggestionInput): CandidateSuggestion[] {
  const candidates: CandidateSuggestion[] = [];
  const score = input.currentScore ?? 0;

  // 1. Critical: Password Reuse
  if (input.reuseResult?.reused) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.REUSE_DETECTED,
      expectedScore: Math.min(score + 15, 100),
      priority: 1,
    });
  }

  // 2. High: Length Rule Failure
  const lengthRule = input.ruleResults?.find((r) => r.id === 'min-length');
  if (lengthRule && !lengthRule.passed) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.MIN_LENGTH,
      expectedScore: Math.min(score + 25, 100),
      priority: 2,
    });
  }

  // 3. High: Dictionary / Keyboard Pattern Detection
  const keyboardPattern = input.patternResults?.find((p) => p.type === 'keyboard' && p.detected);
  if (keyboardPattern) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.KEYBOARD_PATTERN,
      expectedScore: Math.min(score + 15, 100),
      priority: 3,
    });
  }

  const dictPattern = input.patternResults?.find((p) => p.type === 'dictionary' && p.detected);
  if (dictPattern) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.DICTIONARY_WORD,
      expectedScore: Math.min(score + 15, 100),
      priority: 4,
    });
  }

  // 4. Medium: Missing Special Character
  const specialRule = input.ruleResults?.find((r) => r.id === 'special-char');
  if (specialRule && !specialRule.passed) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.SPECIAL_CHAR,
      expectedScore: Math.min(score + 15, 100),
      priority: 5,
    });
  }

  // 5. Medium: Missing Number
  const numberRule = input.ruleResults?.find((r) => r.id === 'number');
  if (numberRule && !numberRule.passed) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.NUMBER_MISSING,
      expectedScore: Math.min(score + 10, 100),
      priority: 6,
    });
  }

  // 6. Medium: Missing Uppercase/Lowercase
  const upperRule = input.ruleResults?.find((r) => r.id === 'uppercase');
  const lowerRule = input.ruleResults?.find((r) => r.id === 'lowercase');
  if ((upperRule && !upperRule.passed) || (lowerRule && !lowerRule.passed)) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.CASING_MISSING,
      expectedScore: Math.min(score + 10, 100),
      priority: 7,
    });
  }

  // 7. Low: Entropy Recommendation
  if (input.entropyResult && input.entropyResult.entropy < 60) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.LOW_ENTROPY,
      expectedScore: Math.min(score + 15, 100),
      priority: 8,
    });
  }

  // Fallback / Perfect State
  if (candidates.length === 0) {
    candidates.push({
      ...SUGGESTION_TEMPLATES.PERFECT,
      expectedScore: 100,
      priority: 99,
    });
  }

  // Sort by priority (ascending)
  return candidates.sort((a, b) => a.priority - b.priority);
}
