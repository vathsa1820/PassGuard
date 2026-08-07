/**
 * PassGuard Common Password Detection Engine Types
 * Pure TypeScript definitions for breach list verification.
 */

export type CommonPasswordRisk = 'None' | 'Medium' | 'High' | 'Critical';

export interface CommonPasswordResult {
  isCommon: boolean;
  risk: CommonPasswordRisk;
  message: string;
}
