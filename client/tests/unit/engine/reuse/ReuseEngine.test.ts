import { describe, it, expect, beforeEach } from 'vitest';
import { ReuseEngine } from '../../../../src/engine/reuse/ReuseEngine';
import { InMemoryReuseProvider } from '../../../../src/engine/reuse/storage';

describe('ReuseEngine Unit Tests', () => {
  let provider: InMemoryReuseProvider;
  let engine: ReuseEngine;

  beforeEach(() => {
    provider = new InMemoryReuseProvider();
    engine = new ReuseEngine(provider);
  });

  it('returns reused: false for password not previously seen', async () => {
    const res = await engine.checkPassword('MySecretPass123!');
    expect(res.reused).toBe(false);
  });

  it('returns reused: true when same password is saved and checked', async () => {
    const secret = 'MySecretPass123!';
    await engine.addPassword(secret);

    const res = await engine.checkPassword(secret);
    expect(res.reused).toBe(true);
    expect(res.message).toMatch(/already been used/i);
  });

  it('returns reused: false for a different password', async () => {
    await engine.addPassword('FirstPassword123!');
    const res = await engine.checkPassword('SecondPassword456!');
    expect(res.reused).toBe(false);
  });

  it('returns reused: false for empty password input', async () => {
    const res = await engine.checkPassword('');
    expect(res.reused).toBe(false);
  });

  it('clears stored hashes upon clearStorage call', async () => {
    const secret = 'MySecretPass123!';
    await engine.addPassword(secret);
    engine.clearStorage();

    const res = await engine.checkPassword(secret);
    expect(res.reused).toBe(false);
    expect(provider.getHashes().length).toBe(0);
  });

  describe('Zero-Knowledge Plaintext Verification', () => {
    it('verifies that storage contains SHA-256 hex hashes and zero plaintext passwords', async () => {
      const plaintextPassword = 'SuperSensitivePassword2026!';
      await engine.addPassword(plaintextPassword);

      const storedHashes = provider.getHashes();
      expect(storedHashes.length).toBe(1);

      const storedItem = storedHashes[0];
      // Assert format is a 64-character hexadecimal SHA-256 string
      expect(storedItem).toMatch(/^[a-f0-9]{64}$/i);

      // Assert plaintext string is NOT present
      expect(storedItem).not.toContain(plaintextPassword);
      expect(JSON.stringify(storedHashes)).not.toContain(plaintextPassword);
    });
  });
});
