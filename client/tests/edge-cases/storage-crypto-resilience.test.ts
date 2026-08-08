import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocalStorageReuseProvider, InMemoryReuseProvider } from '../../src/engine/reuse/storage';
import { hashPassword } from '../../src/engine/reuse/hash';

describe('Edge Case: Storage & Crypto Resilience', () => {
  describe('1. Storage Failures Resilience', () => {
    it('handles localStorage throwing security exception safely', () => {
      const provider = new LocalStorageReuseProvider();

      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('SecurityError: The operation is insecure.');
      });

      expect(() => provider.getHashes()).not.toThrow();
      expect(provider.getHashes()).toEqual([]);

      getItemSpy.mockRestore();
    });

    it('handles malformed JSON data in localStorage safely', () => {
      const provider = new LocalStorageReuseProvider();

      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{ invalid json format');

      expect(() => provider.getHashes()).not.toThrow();
      expect(provider.getHashes()).toEqual([]);

      getItemSpy.mockRestore();
    });

    it('handles setItem throwing (QuotaExceededError) safely', () => {
      const provider = new LocalStorageReuseProvider();

      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
      });

      expect(() => provider.addHash('a'.repeat(64))).not.toThrow();

      setItemSpy.mockRestore();
    });
  });

  describe('2. Cryptographic API Resilience', () => {
    it('generates non-plaintext hash fallback when WebCrypto is unavailable', async () => {
      const originalCrypto = globalThis.crypto;
      // @ts-ignore
      delete globalThis.crypto;

      const secret = 'UncachedSecret123!';
      const hash = await hashPassword(secret);

      expect(hash).toBeDefined();
      expect(hash).not.toEqual(secret);
      expect(hash).not.toContain(secret);

      // @ts-ignore
      globalThis.crypto = originalCrypto;
    });

    it('returns empty string hash for empty password input', async () => {
      const hash = await hashPassword('');
      expect(hash).toBe('');
    });
  });
});
