export const SUGGESTION_TEMPLATES = {
  REUSE_DETECTED: {
    title: 'Avoid Password Reuse',
    message: 'This password has been used before. Choose a unique password to protect against breach risk.',
  },
  MIN_LENGTH: {
    title: 'Increase Password Length',
    message: 'Make your password at least 12 characters long to resist brute-force attacks.',
  },
  KEYBOARD_PATTERN: {
    title: 'Remove Keyboard Sequences',
    message: 'Avoid sequential keyboard keys like "qwerty" or "asdfgh".',
  },
  DICTIONARY_WORD: {
    title: 'Avoid Common Words',
    message: 'Avoid predictable dictionary words like "password" or "welcome".',
  },
  SPECIAL_CHAR: {
    title: 'Add Special Character',
    message: 'Add at least one special character (!@#$%) to improve password strength.',
  },
  NUMBER_MISSING: {
    title: 'Add Numeric Character',
    message: 'Add at least one number (0-9) to increase complexity.',
  },
  CASING_MISSING: {
    title: 'Mix Letter Cases',
    message: 'Combine both uppercase and lowercase letters.',
  },
  LOW_ENTROPY: {
    title: 'Increase Complexity',
    message: 'Mix unrelated words and symbols to increase overall entropy.',
  },
  PERFECT: {
    title: 'Optimal Security',
    message: 'Your password meets all enterprise security standards.',
  },
};
