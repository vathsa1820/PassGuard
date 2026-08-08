import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { ReuseEngine } from '../../src/engine/reuse/ReuseEngine';
import { InMemoryReuseProvider } from '../../src/engine/reuse/storage';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Reuse Integration Flow Tests (Storage -> Hashes -> ReuseWarning)', () => {
  let provider: InMemoryReuseProvider;
  let reuseEngine: ReuseEngine;

  beforeEach(() => {
    provider = new InMemoryReuseProvider();
    reuseEngine = new ReuseEngine(provider);
  });

  it('triggers reuse warning in reuse engine when same password is checked twice', async () => {
    const secret = 'SecretReusedPass2026!';

    // First check - not reused
    const run1 = await reuseEngine.checkPassword(secret);
    expect(run1.reused).toBe(false);

    // Save to reuse storage
    await reuseEngine.addPassword(secret);

    // Second check - reused
    const run2 = await reuseEngine.checkPassword(secret);
    expect(run2.reused).toBe(true);
    expect(run2.message).toMatch(/already been used/i);
  });

  it('renders Reuse Warning alert component when reuse warning state is passed to card', () => {
    const reusedState = {
      password: 'ReusedPassword123!',
      reuseWarning: {
        isVisible: true,
        message: 'This password has been reused across your account history.',
      },
    };

    render(<PasswordSecurityCard stateProps={reusedState} />);

    expect(screen.getByText('Reuse Warning')).toBeInTheDocument();
    expect(
      screen.getByText('This password has been reused across your account history.')
    ).toBeInTheDocument();
  });

  it('verifies stored password representations are SHA-256 hashes and non-plaintext', async () => {
    const plaintext = 'TopSecretPassword2026!';
    await reuseEngine.addPassword(plaintext);

    const storedHashes = provider.getHashes();

    expect(storedHashes.length).toBe(1);
    expect(storedHashes[0]).toMatch(/^[a-f0-9]{64}$/i);
    expect(storedHashes[0]).not.toContain(plaintext);
  });

  it('does not trigger reuse warning for a completely unique password', async () => {
    await reuseEngine.addPassword('FirstPass123!');
    const result = await reuseEngine.checkPassword('CompletelyDifferentPass456!');
    expect(result.reused).toBe(false);
  });

  it('resets reuse warnings after clearing storage provider', async () => {
    const secret = 'PassToClear123!';
    await reuseEngine.addPassword(secret);
    reuseEngine.clearStorage();

    const result = await reuseEngine.checkPassword(secret);
    expect(result.reused).toBe(false);
  });
});
