export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export interface ScoreDetails {
  score: StrengthScore;
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
}
