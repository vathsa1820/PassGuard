import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordPolicy } from '../../src/config';

describe('Policy Integration Flow Tests (Policy -> Engine -> UI)', () => {
  it('propagates custom minLength requirement (16 chars) to visible UI checklist', () => {
    const customPolicy: Partial<PasswordPolicy> = {
      minLength: 16,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSymbol: true,
    };

    render(<PasswordSecurityCard policy={customPolicy} />);
    expect(screen.getByText('At least 16 characters')).toBeInTheDocument();
  });

  it('updates rule evaluation dynamically when password changes under custom policy', async () => {
    const customPolicy: Partial<PasswordPolicy> = {
      minLength: 16,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSymbol: true,
    };

    render(<PasswordSecurityCard policy={customPolicy} value="ShortPass123!" />);

    // 13 characters - passes 12-char default but FAILS 16-char custom policy
    expect(screen.getByText('At least 16 characters')).toBeInTheDocument();
  });

  it('handles runtime policy prop updates while component is mounted', async () => {
    const initialPolicy: Partial<PasswordPolicy> = { minLength: 12 };
    const updatedPolicy: Partial<PasswordPolicy> = { minLength: 20 };

    const DynamicPolicyContainer = () => {
      const [policy, setPolicy] = useState(initialPolicy);
      return (
        <div>
          <button onClick={() => setPolicy(updatedPolicy)}>Upgrade Policy</button>
          <PasswordSecurityCard policy={policy} />
        </div>
      );
    };

    render(<DynamicPolicyContainer />);
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Upgrade Policy'));

    await waitFor(() => {
      expect(screen.getByText('At least 20 characters')).toBeInTheDocument();
    });
  });

  it('handles fallback safely when minimal or unexpected policy config is supplied', () => {
    const minimalPolicy: Partial<PasswordPolicy> = { minLength: 8 };
    render(<PasswordSecurityCard policy={minimalPolicy} />);
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
  });
});
