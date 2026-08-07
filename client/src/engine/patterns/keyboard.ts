import { PatternDetectionResult } from './types';

/**
 * Common QWERTY keyboard row patterns.
 */
export const KEYBOARD_ROWS = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
  '1234567890',
];

/**
 * Detects common keyboard spatial patterns (e.g. "qwerty", "asdfgh").
 */
export function detectKeyboardPatterns(password: string, minPatternLen = 4): PatternDetectionResult {
  if (!password || password.length < minPatternLen) {
    return { type: 'keyboard', detected: false, message: 'No keyboard pattern detected.' };
  }

  const lower = password.toLowerCase();

  for (const row of KEYBOARD_ROWS) {
    const revRow = row.split('').reverse().join('');
    for (let i = 0; i <= row.length - minPatternLen; i++) {
      const sub = row.substring(i, i + minPatternLen);
      const revSub = revRow.substring(i, i + minPatternLen);

      if (lower.includes(sub)) {
        return {
          type: 'keyboard',
          detected: true,
          message: `Keyboard pattern detected: "${sub}".`,
          matchedPattern: sub,
        };
      }
      if (lower.includes(revSub)) {
        return {
          type: 'keyboard',
          detected: true,
          message: `Reverse keyboard pattern detected: "${revSub}".`,
          matchedPattern: revSub,
        };
      }
    }
  }

  return { type: 'keyboard', detected: false, message: 'No keyboard pattern detected.' };
}
