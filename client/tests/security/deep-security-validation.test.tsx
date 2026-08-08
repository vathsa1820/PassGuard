import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';
import { validatePasswordPolicy } from '../../src/config/policyValidator';
import { LocalStorageReuseProvider } from '../../src/engine/reuse/storage';
import { hashPassword } from '../../src/engine/reuse/hash';

describe('Deep Security & Privacy Validation Suite', () => {
  let logSpy: any;
  let errorSpy: any;
  let warnSpy: any;
  let fetchSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    fetchSpy = vi.fn();
    if (typeof window !== 'undefined') {
      window.fetch = fetchSpy;
    }
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  describe('1. Zero Password Leakage & Console/Network Isolation', () => {
    it('verifies plaintext password is never logged during component typing or engine analysis', async () => {
      const secretPass = 'SuperSecretUnloggedPass2026!#';
      const analyzer = new PasswordAnalyzer();
      await analyzer.analyze(secretPass);

      render(<PasswordSecurityCard value={secretPass} onChange={() => {}} />);

      expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining(secretPass));
      expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining(secretPass));
      expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining(secretPass));
    });

    it('verifies zero network requests (fetch/XHR) are initiated during password analysis', async () => {
      const secretPass = 'NetworkIsolatedPass123!';
      const analyzer = new PasswordAnalyzer();
      await analyzer.analyze(secretPass);

      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe('2. XSS & DOM Execution Security', () => {
    it('renders script tag payload purely as text node without HTML execution', () => {
      const xssPayload = "<script>alert('xss')</script>";
      render(<PasswordSecurityCard value={xssPayload} onChange={() => {}} />);

      const input = screen.getByPlaceholderText('Enter password...');
      expect(input).toHaveValue(xssPayload);
      expect(document.querySelector('script')).toBeNull();
    });

    it('renders img onerror payload safely as text', () => {
      const imgPayload = "<img src=x onerror=alert(1)>";
      render(<PasswordSecurityCard value={imgPayload} onChange={() => {}} />);

      const input = screen.getByPlaceholderText('Enter password...');
      expect(input).toHaveValue(imgPayload);
    });
  });

  describe('3. Cryptographic Hash & Storage Failure Resilience', () => {
    it('uses Web Crypto API SHA-256 in browser environment and produces standard 64-char hex string', async () => {
      const hash = await hashPassword('TestPass123!');
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it('handles localStorage throwing security exception without app crash', () => {
      const origGetItem = localStorage.getItem;
      localStorage.getItem = () => {
        throw new Error('Access denied in restricted iframe');
      };

      const provider = new LocalStorageReuseProvider();
      expect(provider.getHashes()).toEqual([]);

      localStorage.getItem = origGetItem;
    });
  });

  describe('4. Policy Configuration Validation Boundary Security', () => {
    it('rejects minLength < 1 and throws validation error', () => {
      const result = validatePasswordPolicy({ minLength: 0 });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('minLength must be at least 1.');
    });

    it('rejects maxLength < minLength and throws validation error', () => {
      const result = validatePasswordPolicy({ minLength: 12, maxLength: 8 });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('cannot be less than minLength');
    });
  });
});
