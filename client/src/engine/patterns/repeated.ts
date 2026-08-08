import { PatternDetectionResult } from './types';

/**
 * Detects repeated consecutive characters (e.g. "aaaa", "1111").
 */
export function detectRepeatedChars(password: string, maxConsecutive = 3): PatternDetectionResult {
  if (!password) {
    return { type: 'repeated-chars', detected: false, message: 'No repeated characters detected.' };
  }

  const regex = new RegExp(`(.)\\1{${maxConsecutive - 1},}`, 'i');
  const match = password.match(regex);

  if (match) {
    return {
      type: 'repeated-chars',
      detected: true,
      message: `Repeated character pattern detected: "${match[0]}".`,
      matchedPattern: match[0],
    };
  }

  return { type: 'repeated-chars', detected: false, message: 'No repeated characters detected.' };
}

/**
 * Detects repeated words or substrings (e.g. "passpass", "adminadmin").
 */
export function detectRepeatedWords(password: string, maxWordLen = 32): PatternDetectionResult {
  if (!password || password.length < 4) {
    return { type: 'repeated-words', detected: false, message: 'No repeated words detected.' };
  }

  const lower = password.toLowerCase();
  const maxLen = Math.min(maxWordLen, Math.floor(lower.length / 2));
  for (let len = 2; len <= maxLen; len++) {
    for (let i = 0; i <= lower.length - len * 2; i++) {
      const sub1 = lower.substring(i, i + len);
      const sub2 = lower.substring(i + len, i + len * 2);
      if (sub1 === sub2) {
        return {
          type: 'repeated-words',
          detected: true,
          message: `Repeated substring pattern detected: "${sub1}${sub2}".`,
          matchedPattern: sub1,
        };
      }
    }
  }

  return { type: 'repeated-words', detected: false, message: 'No repeated words detected.' };
}
