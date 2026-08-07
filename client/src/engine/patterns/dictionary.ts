import { PatternDetectionResult } from './types';

/**
 * Curated offline common password wordlist.
 */
export const COMMON_DICTIONARY_WORDS = [
  'password',
  'admin',
  'welcome',
  'pass',
  'letmein',
  'master',
  'dragon',
  'shadow',
  'football',
  'monkey',
  'sunshine',
  'princess',
  'iloveyou',
  'computer',
  'security',
  'passguard',
  'login',
];

/**
 * Detects dictionary words embedded inside the password string.
 */
export function detectDictionaryWords(password: string): PatternDetectionResult {
  if (!password) {
    return { type: 'dictionary', detected: false, message: 'No dictionary words detected.' };
  }

  const lower = password.toLowerCase().replace(/[^a-z]/g, '');

  for (const word of COMMON_DICTIONARY_WORDS) {
    if (word.length >= 4 && lower.includes(word)) {
      return {
        type: 'dictionary',
        detected: true,
        message: `Common dictionary word detected: "${word}".`,
        matchedPattern: word,
      };
    }
  }

  return { type: 'dictionary', detected: false, message: 'No dictionary words detected.' };
}
