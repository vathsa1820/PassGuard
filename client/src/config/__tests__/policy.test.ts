import { validatePasswordPolicy, resolvePasswordPolicy, defaultPasswordPolicy } from '../index';
import { RuleEngine, analyzeRules } from '../../engine/rules/RuleEngine';
import { PasswordAnalyzer } from '../../engine/analyzer/PasswordAnalyzer';

console.log('--- PassGuard Policy Validation Test Suite ---');

// Test 1: Secure default policy
console.log('1. Testing default policy resolution...');
const defaultPolicy = resolvePasswordPolicy();
console.assert(defaultPolicy.minLength === 12, 'Default minLength should be 12');
console.assert(defaultPolicy.maxLength === 128, 'Default maxLength should be 128');
console.assert(defaultPolicy.requireSymbol === true, 'Default requireSymbol should be true');
console.log('✓ Default policy validated.');

// Test 2: Valid custom policy override
console.log('2. Testing custom policy override...');
const customPolicy = resolvePasswordPolicy({
  minLength: 8,
  requireSymbol: false,
});
console.assert(customPolicy.minLength === 8, 'Custom minLength should be 8');
console.assert(customPolicy.requireSymbol === false, 'Custom requireSymbol should be false');
console.assert(customPolicy.requireUppercase === true, 'Unspecified fields should retain default values');
console.log('✓ Custom policy override validated.');

// Test 3: Invalid minLength < 1
console.log('3. Testing invalid minLength < 1...');
const minLengthCheck = validatePasswordPolicy({ minLength: 0 });
console.assert(!minLengthCheck.valid, 'minLength: 0 should be invalid');
console.assert(minLengthCheck.errors.some(e => e.includes('at least 1')), 'Error message should mention at least 1');
console.log('✓ Invalid minLength error caught.');

// Test 4: Invalid maxLength < minLength
console.log('4. Testing invalid maxLength < minLength...');
const maxLengthCheck = validatePasswordPolicy({ minLength: 16, maxLength: 8 });
console.assert(!maxLengthCheck.valid, 'maxLength < minLength should be invalid');
console.assert(maxLengthCheck.errors.some(e => e.includes('cannot be less than minLength')), 'Error should mention comparison');
console.log('✓ Invalid maxLength error caught.');

// Test 5: Invalid non-boolean flag
console.log('5. Testing invalid non-boolean flag...');
const booleanCheck = validatePasswordPolicy({ requireUppercase: 'yes' as any });
console.assert(!booleanCheck.valid, 'Non-boolean flag should be invalid');
console.assert(booleanCheck.errors.some(e => e.includes('must be a boolean')), 'Error should mention boolean requirement');
console.log('✓ Invalid non-boolean flag caught.');

// Test 6: Rule Engine with custom minLength: 8
console.log('6. Testing Rule Engine with minLength: 8...');
const rules8 = analyzeRules('Pass1234', { minLength: 8 });
const minLengthRule = rules8.find(r => r.id === 'min-length');
console.assert(minLengthRule !== undefined, 'min-length rule should be present');
console.assert(minLengthRule?.passed === true, '8-char password should pass minLength: 8 requirement');
console.log('✓ Rule Engine custom minLength verified.');

// Test 7: PasswordAnalyzer with custom policy
console.log('7. Testing PasswordAnalyzer with custom policy...');
const analyzer = new PasswordAnalyzer({ minLength: 6, requireSymbol: false });
analyzer.analyze('Secret1').then((res) => {
  console.assert(res.rules.some(r => r.id === 'min-length' && r.passed), 'Secret1 passes 6-character minLength');
  console.assert(!res.rules.some(r => r.id === 'special-char'), 'special-char rule omitted when requireSymbol is false');
  console.log('✓ PasswordAnalyzer custom policy verified.');
  console.log('--- ALL POLICY TESTS PASSED SUCCESSFULLY ---');
});
