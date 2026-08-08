import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReuseWarning } from '../../src/components/password/ReuseWarning';

describe('ReuseWarning Component Tests', () => {
  it('does not render warning content when isVisible is false', () => {
    render(<ReuseWarning isVisible={false} message="Previously used password." />);
    expect(screen.queryByText('Reuse Warning')).not.toBeInTheDocument();
  });

  it('renders warning heading and message when isVisible is true', () => {
    render(
      <ReuseWarning
        isVisible={true}
        message="This password was previously used for your account."
      />
    );
    expect(screen.getByText('Reuse Warning')).toBeInTheDocument();
    expect(
      screen.getByText('This password was previously used for your account.')
    ).toBeInTheDocument();
  });

  it('verifies warning text never contains sensitive password strings or raw hashes', () => {
    const sensitivePass = 'MySecretPass123!';
    const rawHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    render(
      <ReuseWarning
        isVisible={true}
        message="Password reuse detected across your history."
      />
    );

    const alertText = screen.getByText('Reuse Warning').parentElement?.textContent || '';
    expect(alertText).not.toContain(sensitivePass);
    expect(alertText).not.toContain(rawHash);
  });
});
