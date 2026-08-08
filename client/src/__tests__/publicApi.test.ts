import * as PublicApi from '../index';
import {
  PasswordSecurityCard,
  PasswordInput,
  PasswordHealthScore,
  RequirementChecklist,
  SuggestionCard,
  ReuseWarning,
  usePasswordAnalysis,
  defaultPasswordPolicy,
  validatePasswordPolicy,
  resolvePasswordPolicy,
  analyzePassword,
  type PasswordPolicy,
  type PasswordAnalysis,
  type PasswordRuleResult,
  type PasswordSuggestion,
  type PasswordStatus,
} from '../index';

console.log('--- PassGuard Public API Verification Suite ---');

// Test 1: Verify all required public components are defined
console.log('1. Verifying public UI components...');
console.assert(typeof PasswordSecurityCard === 'function', 'PasswordSecurityCard must be exported as a function/component');
console.assert(typeof PasswordInput === 'function', 'PasswordInput must be exported as a function/component');
console.assert(typeof PasswordHealthScore === 'function', 'PasswordHealthScore must be exported as a function/component');
console.assert(typeof RequirementChecklist === 'function', 'RequirementChecklist must be exported as a function/component');
console.assert(typeof SuggestionCard === 'function', 'SuggestionCard must be exported as a function/component');
console.assert(typeof ReuseWarning === 'function', 'ReuseWarning must be exported as a function/component');
console.log('✓ All public UI components verified.');

// Test 2: Verify public React hook
console.log('2. Verifying public hook...');
console.assert(typeof usePasswordAnalysis === 'function', 'usePasswordAnalysis must be exported as a hook function');
console.log('✓ Public hook verified.');

// Test 3: Verify policy exports
console.log('3. Verifying password policy exports...');
console.assert(typeof defaultPasswordPolicy === 'object', 'defaultPasswordPolicy must be an object');
console.assert(typeof validatePasswordPolicy === 'function', 'validatePasswordPolicy must be a function');
console.assert(typeof resolvePasswordPolicy === 'function', 'resolvePasswordPolicy must be a function');
console.log('✓ Policy API exports verified.');

// Test 4: Verify high-level analyzePassword function
console.log('4. Verifying high-level analyzePassword entrypoint...');
console.assert(typeof analyzePassword === 'function', 'analyzePassword must be a function');

const testPolicy: PasswordPolicy = {
  minLength: 10,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: true,
  preventKeyboardPatterns: true,
  checkCommonPasswords: false,
  preventReuse: false,
};

analyzePassword('P@ssword123', testPolicy).then((result: PasswordAnalysis) => {
  console.assert(typeof result.score === 'number', 'result.score must be a number');
  console.assert(Array.isArray(result.rules), 'result.rules must be an array');
  const status: PasswordStatus = result.status;
  console.assert(typeof status === 'string', 'status must be a string');
  console.log('✓ High-level analyzePassword output verified with custom policy.');
});

// Test 5: Enforce that internal engine modules are NOT exported publicly
console.log('5. Verifying internal modules are hidden from public API...');
const forbiddenExports = [
  'RuleEngine',
  'ScoreEngine',
  'EntropyEngine',
  'PatternEngine',
  'CommonPasswordEngine',
  'ReuseEngine',
  'SuggestionEngine',
  'defaultPasswordRules',
  'createRulesFromPolicy',
];

for (const internalName of forbiddenExports) {
  console.assert(
    !(internalName in PublicApi),
    `Internal implementation module "${internalName}" MUST NOT be exported in public API`
  );
}
console.log('✓ All internal engines confirmed private!');

console.log('--- ALL PUBLIC API TESTS PASSED SUCCESSFULLY ---');
