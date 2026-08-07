import { PatternDetectionResult } from './types';
import { detectSequentialNumbers, detectSequentialLetters } from './sequential';
import { detectRepeatedChars, detectRepeatedWords } from './repeated';
import { detectKeyboardPatterns } from './keyboard';
import { detectDictionaryWords } from './dictionary';

/**
 * PatternEngine Class
 * Pure pattern recognition engine.
 */
export class PatternEngine {
  public evaluate(password: string): PatternDetectionResult[] {
    return [
      detectSequentialNumbers(password),
      detectSequentialLetters(password),
      detectRepeatedChars(password),
      detectRepeatedWords(password),
      detectKeyboardPatterns(password),
      detectDictionaryWords(password),
    ];
  }
}

/**
 * Pure helper function for immediate pattern detection.
 */
export function detectPatterns(password: string): PatternDetectionResult[] {
  const engine = new PatternEngine();
  return engine.evaluate(password);
}
