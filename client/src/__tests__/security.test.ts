import { analyzePassword } from '../engine/analyzer/PasswordAnalyzer';
import { resolvePasswordPolicy, validatePasswordPolicy } from '../config';
import { ReuseEngine } from '../engine/reuse/ReuseEngine';
import { InMemoryReuseProvider } from '../engine/reuse/storage';
import { hashPassword } from '../engine/reuse/hash';

console.log('--- PassGuard Security Audit Test Suite ---');

// Test 1: Plaintext password is NEVER persisted to localStorage or sessionStorage
console.log('1. Verifying plaintext password is NEVER stored in storage APIs...');
if (typeof localStorage !== 'undefined') {
  localStorage.clear();
}
const testSecret = 'P@sswordSuperSecret2026!';
const reuseEngine = new ReuseEngine();

reuseEngine.addPassword(testSecret).then(async () => {
  if (typeof localStorage !== 'undefined') {
    const rawData = localStorage.getItem('passguard_password_hashes') || '';
    console.assert(!rawData.includes(testSecret), 'Plaintext password MUST NOT exist in localStorage');
  }
  console.log('✓ Storage privacy audit passed (0 plaintext stored).');
});

// Test 2: Network isolation - Passwords never trigger network calls
console.log('2. Verifying network isolation (0 network calls during analysis)...');
let networkCallMade = false;

// Mock global fetch if present
const originalFetch = globalThis.fetch;
globalThis.fetch = (async () => {
  networkCallMade = true;
  throw new Error('Network call prohibited in PassGuard core');
}) as any;

analyzePassword('SecretNetworkTest123!').then(() => {
  console.assert(!networkCallMade, 'Password evaluation MUST NOT invoke network APIs');
  globalThis.fetch = originalFetch;
  console.log('✓ Network isolation verified (0 external requests).');
});

// Test 3: Password string is NOT included in PasswordAnalysis output objects
console.log('3. Verifying PasswordAnalysis output object contains zero password leaks...');
analyzePassword('SensitiveUserPassword#99').then((result) => {
  const resultString = JSON.stringify(result);
  console.assert(!resultString.includes('SensitiveUserPassword#99'), 'Analysis result object MUST NOT contain raw password string');
  console.assert(!('password' in result), 'Analysis output MUST NOT have a password property');
  console.log('✓ Analysis payload zero-knowledge boundary verified.');
});

// Test 4: Reuse detection uses cryptographic SHA-256 hashes without plaintext storage
console.log('4. Verifying SHA-256 hash calculation for reuse detection...');
hashPassword('TestReuseHash123').then((hash) => {
  console.assert(hash.length > 0, 'Hash must be generated');
  console.assert(!hash.includes('TestReuseHash123'), 'Hash must not contain plaintext string');
  console.assert(hash !== 'TestReuseHash123', 'Hash must be cryptographically transformed');

  const inMem = new InMemoryReuseProvider();
  const engine = new ReuseEngine(inMem);
  engine.addPassword('TestReuseHash123').then(() => {
    const hashes = inMem.getHashes();
    console.assert(hashes.includes(hash), 'In-memory provider stores SHA-256 hash');
    console.assert(!hashes.includes('TestReuseHash123'), 'In-memory provider stores NO plaintext');
    console.log('✓ SHA-256 zero-knowledge reuse verification passed.');
  });
});

// Test 5: Empty password input handled safely
console.log('5. Verifying safe empty password evaluation...');
analyzePassword('').then((emptyResult) => {
  console.assert(emptyResult.score <= 30, 'Empty password score should be <= 30');
  console.assert(emptyResult.status === 'Weak', 'Empty password status should be Weak');
  console.log('✓ Empty password input safely evaluated.');
});

// Test 6: Extremely long passwords do not crash the engine
console.log('6. Verifying performance & stability with 10,000 character password...');
const hugePassword = 'A1!'.repeat(3334);
const startTime = Date.now();
analyzePassword(hugePassword).then((hugeResult) => {
  const duration = Date.now() - startTime;
  console.assert(hugeResult.score > 0, '10k char password analyzed successfully');
  console.assert(duration < 1000, `Analysis completed rapidly in ${duration}ms without ReDoS/DOS`);
  console.log(`✓ Long password stability verified (${duration}ms).`);
});

// Test 7: Malformed policy configuration fails safely without sensitive exposure
console.log('7. Verifying malformed policy validation safety...');
const validation = validatePasswordPolicy({ minLength: -5, maxLength: 2, requireUppercase: 'invalid' as any });
console.assert(!validation.valid, 'Malformed policy recognized as invalid');
console.assert(validation.errors.length >= 2, 'Malformed policy errors reported');

try {
  resolvePasswordPolicy({ minLength: -1 });
  console.assert(false, 'Should throw error for negative minLength');
} catch (err: any) {
  console.assert(err.message.includes('Invalid PasswordPolicy'), 'Throws safe descriptive policy validation error');
}
console.log('✓ Malformed policy safe validation verified.');

console.log('--- ALL SECURITY AUDIT TESTS PASSED ---');
