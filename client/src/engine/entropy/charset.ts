import { CharsetAnalysis } from './types';

export const CHARSET_SIZES = {
  lowercase: 26,
  uppercase: 26,
  numbers: 10,
  symbols: 32,
};

/**
 * Evaluates active character pools in the password.
 */
export function analyzeCharset(password: string): CharsetAnalysis {
  if (!password) {
    return {
      hasLowercase: false,
      hasUppercase: false,
      hasNumbers: false,
      hasSymbols: false,
      charsetSize: 0,
    };
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let charsetSize = 0;
  if (hasLowercase) charsetSize += CHARSET_SIZES.lowercase;
  if (hasUppercase) charsetSize += CHARSET_SIZES.uppercase;
  if (hasNumbers) charsetSize += CHARSET_SIZES.numbers;
  if (hasSymbols) charsetSize += CHARSET_SIZES.symbols;

  return {
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    charsetSize: Math.max(charsetSize, 1),
  };
}
