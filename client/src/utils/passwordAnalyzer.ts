import { analyzePassword as engineAnalyzePassword, PasswordAnalysisOutput } from '../engine';

export async function analyzePassword(password: string): Promise<PasswordAnalysisOutput> {
  return engineAnalyzePassword(password);
}

