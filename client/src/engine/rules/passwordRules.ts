import { RuleDefinition } from './types';

/**
 * Pure validation helper functions
 */

export function hasMinLength(password: string, min = 12): boolean {
  return password.length >= min;
}

export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasLowercase(password: string): boolean {
  return /[a-z]/.test(password);
}

export function hasNumber(password: string): boolean {
  return /[0-9]/.test(password);
}

export function hasSpecialChar(password: string): boolean {
  return /[^a-zA-Z0-9]/.test(password);
}

export function hasNoLeadingTrailingWhitespace(password: string): boolean {
  return password === password.trim();
}

export function hasNoRepeatedChars(password: string, maxRepeat = 3): boolean {
  if (!password) return true;
  // Fails if 4 or more identical consecutive characters are found (e.g. "aaaa")
  const regex = new RegExp(`(.)\\1{${maxRepeat},}`, 'i');
  return !regex.test(password);
}

export function hasNoSequentialNumbers(password: string, seqLen = 3): boolean {
  if (!password) return true;
  const digits = password.replace(/\D/g, '');
  if (digits.length < seqLen) return true;

  for (let i = 0; i <= digits.length - seqLen; i++) {
    let isAsc = true;
    let isDesc = true;
    for (let j = 0; j < seqLen - 1; j++) {
      const curr = parseInt(digits[i + j], 10);
      const next = parseInt(digits[i + j + 1], 10);
      if (next !== curr + 1) isAsc = false;
      if (next !== curr - 1) isDesc = false;
    }
    if (isAsc || isDesc) return false;
  }
  return true;
}

export function hasNoSequentialLetters(password: string, seqLen = 3): boolean {
  if (!password) return true;
  const lower = password.toLowerCase();

  for (let i = 0; i <= lower.length - seqLen; i++) {
    let isAsc = true;
    let isDesc = true;
    for (let j = 0; j < seqLen - 1; j++) {
      const codeCurr = lower.charCodeAt(i + j);
      const codeNext = lower.charCodeAt(i + j + 1);

      // Only check if both characters are a-z
      if (codeCurr >= 97 && codeCurr <= 122 && codeNext >= 97 && codeNext <= 122) {
        if (codeNext !== codeCurr + 1) isAsc = false;
        if (codeNext !== codeCurr - 1) isDesc = false;
      } else {
        isAsc = false;
        isDesc = false;
        break;
      }
    }
    if (isAsc || isDesc) return false;
  }
  return true;
}

export function hasNoKeyboardPatterns(password: string): boolean {
  if (!password) return true;
  const patterns = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    '1234567890',
  ];
  const lower = password.toLowerCase();

  for (const pattern of patterns) {
    const revPattern = pattern.split('').reverse().join('');
    for (let i = 0; i <= pattern.length - 4; i++) {
      const sub = pattern.substring(i, i + 4);
      const revSub = revPattern.substring(i, i + 4);
      if (lower.includes(sub) || lower.includes(revSub)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Standard default password rule set
 */
export const defaultPasswordRules: RuleDefinition[] = [
  {
    id: 'min-length',
    label: 'At least 12 characters',
    validator: (p) => hasMinLength(p, 12),
    failureMessage: 'Password must be at least 12 characters long.',
    successMessage: 'Password meets length requirement.',
  },
  {
    id: 'uppercase',
    label: 'Uppercase letter',
    validator: hasUppercase,
    failureMessage: 'Include at least one uppercase letter (A-Z).',
    successMessage: 'Contains uppercase character.',
  },
  {
    id: 'lowercase',
    label: 'Lowercase letter',
    validator: hasLowercase,
    failureMessage: 'Include at least one lowercase letter (a-z).',
    successMessage: 'Contains lowercase character.',
  },
  {
    id: 'number',
    label: 'Number',
    validator: hasNumber,
    failureMessage: 'Include at least one number (0-9).',
    successMessage: 'Contains numeric character.',
  },
  {
    id: 'special-char',
    label: 'Special character',
    validator: hasSpecialChar,
    failureMessage: 'Include at least one special character (!@#$%^&*).',
    successMessage: 'Contains special symbol.',
  },
  {
    id: 'no-whitespace',
    label: 'No leading/trailing spaces',
    validator: hasNoLeadingTrailingWhitespace,
    failureMessage: 'Password must not start or end with spaces.',
    successMessage: 'No leading or trailing spaces.',
  },
  {
    id: 'no-repeated-chars',
    label: 'No repeated characters',
    validator: (p) => hasNoRepeatedChars(p, 3),
    failureMessage: 'Avoid repeating characters 4+ times consecutively (e.g. "aaaa").',
    successMessage: 'No excessive character repetition.',
  },
  {
    id: 'no-sequential-numbers',
    label: 'No sequential numbers',
    validator: (p) => hasNoSequentialNumbers(p, 3),
    failureMessage: 'Avoid sequential numbers like "123" or "987".',
    successMessage: 'No sequential number patterns.',
  },
  {
    id: 'no-sequential-letters',
    label: 'No sequential letters',
    validator: (p) => hasNoSequentialLetters(p, 3),
    failureMessage: 'Avoid sequential letters like "abc" or "zyx".',
    successMessage: 'No sequential letter patterns.',
  },
  {
    id: 'no-keyboard-patterns',
    label: 'No common keyboard patterns',
    validator: hasNoKeyboardPatterns,
    failureMessage: 'Avoid keyboard sequence patterns like "qwerty" or "asdf".',
    successMessage: 'No common keyboard row patterns.',
  },
];
