export interface PasswordAnalysis {
  score: number;
  entropy: number;
  feedback: string[];
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isCommon: boolean;
}
