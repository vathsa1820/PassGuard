import { PasswordAnalysisOutput } from './types';
import { RuleEngine } from '../rules/RuleEngine';
import { ScoreEngine } from '../scoring/ScoreEngine';
import { EntropyEngine } from '../entropy/EntropyEngine';
import { PatternEngine } from '../patterns/PatternEngine';
import { CommonPasswordEngine } from '../common-passwords/CommonPasswordEngine';
import { ReuseEngine } from '../reuse/ReuseEngine';
import { SuggestionEngine } from '../suggestions/SuggestionEngine';

/**
 * PasswordAnalyzer Class
 * High-level orchestrator that executes all intelligence sub-engines in sequence.
 */
export class PasswordAnalyzer {
  private ruleEngine: RuleEngine;
  private scoreEngine: ScoreEngine;
  private entropyEngine: EntropyEngine;
  private patternEngine: PatternEngine;
  private commonEngine: CommonPasswordEngine;
  private reuseEngine: ReuseEngine;
  private suggestionEngine: SuggestionEngine;

  constructor() {
    this.ruleEngine = new RuleEngine();
    this.scoreEngine = new ScoreEngine();
    this.entropyEngine = new EntropyEngine();
    this.patternEngine = new PatternEngine();
    this.commonEngine = new CommonPasswordEngine();
    this.reuseEngine = new ReuseEngine();
    this.suggestionEngine = new SuggestionEngine();
  }

  /**
   * Orchestrates full password analysis across all 6 intelligence engines.
   */
  public async analyze(password: string): Promise<PasswordAnalysisOutput> {
    // Step 1: Rule Engine
    const rules = this.ruleEngine.evaluate(password);

    // Step 2: Score Engine
    const scoreResult = this.scoreEngine.calculate(rules);

    // Step 3: Entropy Engine
    const entropyResult = this.entropyEngine.evaluate(password);

    // Step 4: Pattern Engine
    const patterns = this.patternEngine.evaluate(password);

    // Step 5: Common Password Engine
    const commonPassword = this.commonEngine.evaluate(password);

    // Step 6: Reuse Engine
    const reuse = await this.reuseEngine.checkPassword(password);

    // Step 7: Suggestion Engine
    const suggestion = this.suggestionEngine.evaluate({
      ruleResults: rules,
      patternResults: patterns,
      entropyResult: entropyResult,
      reuseResult: reuse,
      currentScore: scoreResult.score,
    });

    return {
      score: scoreResult.score,
      status: scoreResult.status,
      color: scoreResult.color,
      percentage: scoreResult.percentage,
      entropy: entropyResult.entropy,
      complexity: entropyResult.complexity,
      crackTime: entropyResult.crackTime,
      rules,
      patterns,
      commonPassword,
      reuse,
      suggestion,
    };
  }
}

/**
 * Pure helper function for direct full password analysis.
 */
export async function analyzePassword(password: string): Promise<PasswordAnalysisOutput> {
  const analyzer = new PasswordAnalyzer();
  return analyzer.analyze(password);
}
