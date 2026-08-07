import { PatternDetectionResult } from './types';

/**
 * Detects sequential number sequences (e.g. "1234", "9876").
 */
export function detectSequentialNumbers(password: string, minSeqLen = 3): PatternDetectionResult {
  if (!password) {
    return { type: 'sequential-numbers', detected: false, message: 'No sequential numbers detected.' };
  }

  const digits = password.replace(/\D/g, '');
  if (digits.length >= minSeqLen) {
    for (let i = 0; i <= digits.length - minSeqLen; i++) {
      let isAsc = true;
      let isDesc = true;
      for (let j = 0; j < minSeqLen - 1; j++) {
        const curr = parseInt(digits[i + j], 10);
        const next = parseInt(digits[i + j + 1], 10);
        if (next !== curr + 1) isAsc = false;
        if (next !== curr - 1) isDesc = false;
      }
      if (isAsc || isDesc) {
        const match = digits.substring(i, i + minSeqLen);
        return {
          type: 'sequential-numbers',
          detected: true,
          message: `Sequential number pattern detected: "${match}".`,
          matchedPattern: match,
        };
      }
    }
  }

  return { type: 'sequential-numbers', detected: false, message: 'No sequential numbers detected.' };
}

/**
 * Detects sequential letter sequences (e.g. "abcd", "zyxw").
 */
export function detectSequentialLetters(password: string, minSeqLen = 3): PatternDetectionResult {
  if (!password) {
    return { type: 'sequential-letters', detected: false, message: 'No sequential letters detected.' };
  }

  const lower = password.toLowerCase();
  for (let i = 0; i <= lower.length - minSeqLen; i++) {
    let isAsc = true;
    let isDesc = true;
    for (let j = 0; j < minSeqLen - 1; j++) {
      const codeCurr = lower.charCodeAt(i + j);
      const codeNext = lower.charCodeAt(i + j + 1);

      if (codeCurr >= 97 && codeCurr <= 122 && codeNext >= 97 && codeNext <= 122) {
        if (codeNext !== codeCurr + 1) isAsc = false;
        if (codeNext !== codeCurr - 1) isDesc = false;
      } else {
        isAsc = false;
        isDesc = false;
        break;
      }
    }
    if (isAsc || isDesc) {
      const match = lower.substring(i, i + minSeqLen);
      return {
        type: 'sequential-letters',
        detected: true,
        message: `Sequential letter pattern detected: "${match}".`,
        matchedPattern: match,
      };
    }
  }

  return { type: 'sequential-letters', detected: false, message: 'No sequential letters detected.' };
}
