import { ScoreStatus, ScoreColor } from './types';

/**
 * Maps numeric score (0-100) to human-readable status and theme color.
 */
export function determineScoreStatus(score: number): { status: ScoreStatus; color: ScoreColor } {
  if (score <= 30) {
    return { status: 'Weak', color: 'red' };
  }
  if (score <= 60) {
    return { status: 'Fair', color: 'orange' };
  }
  if (score <= 80) {
    return { status: 'Strong', color: 'blue' };
  }
  return { status: 'Excellent', color: 'green' };
}
