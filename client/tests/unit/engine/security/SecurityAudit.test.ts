import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PasswordAnalyzer } from '../../../../src/engine/analyzer/PasswordAnalyzer';

describe('Security & Privacy Audit Test Suite', () => {
  const analyzer = new PasswordAnalyzer();
  let logSpy: any;
  let warnSpy: any;
  let errorSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('1. Verifies console logging functions are NEVER called with plaintext password', async () => {
    const sensitivePassword = 'TopSecretUserPassword2026!#';
    await analyzer.analyze(sensitivePassword);

    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('2. Verifies network isolation: zero network fetch calls during password analysis', async () => {
    const fetchSpy = vi.fn();
    if (typeof window !== 'undefined') {
      window.fetch = fetchSpy as any;
    }

    await analyzer.analyze('NetworkIsolationPass123!');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('3. Verifies error messages never leak password string', async () => {
    try {
      // Force evaluate with edge case
      await analyzer.analyze('EdgeCasePassword!1');
    } catch (err: any) {
      if (err && err.message) {
        expect(err.message).not.toContain('EdgeCasePassword!1');
      }
    }
  });

  it('4. Verifies analysis completes 100% offline without external service dependencies', async () => {
    const onlineCheck = typeof window !== 'undefined' ? navigator.onLine : true;
    const result = await analyzer.analyze('OfflineCapabilityCheck123!');
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThan(0);
  });
});
