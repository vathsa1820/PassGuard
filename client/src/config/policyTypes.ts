/**
 * PassGuard Password Security Policy Interface.
 * Defines developer-configurable requirements and security checks.
 */
export interface PasswordPolicy {
  /** Minimum required password length (must be >= 1) */
  minLength: number;
  /** Maximum allowed password length (must be >= minLength) */
  maxLength: number;
  /** Whether to require at least one uppercase letter (A-Z) */
  requireUppercase: boolean;
  /** Whether to require at least one lowercase letter (a-z) */
  requireLowercase: boolean;
  /** Whether to require at least one numeric digit (0-9) */
  requireNumber: boolean;
  /** Whether to require at least one special symbol (!@#$%^&*) */
  requireSymbol: boolean;
  /** Whether to prevent excessive repeated characters (e.g., "aaaa") */
  preventRepeatedCharacters: boolean;
  /** Whether to prevent sequential numbers or letters (e.g., "123", "abc") */
  preventSequentialPatterns: boolean;
  /** Whether to prevent keyboard sequence patterns (e.g., "qwerty", "asdf") */
  preventKeyboardPatterns: boolean;
  /** Whether to check passwords against common breach databases */
  checkCommonPasswords: boolean;
  /** Whether to detect and prevent password reuse across sessions */
  preventReuse: boolean;
}
