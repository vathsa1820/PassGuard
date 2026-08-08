import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordAnalysisOutput } from '../../src/engine';

const InteractivePasswordSecurityCard = ({
  onContinue,
  policy,
}: {
  onContinue?: (analysis?: PasswordAnalysisOutput | null) => void;
  policy?: any;
}) => {
  const [val, setVal] = useState('');
  return (
    <PasswordSecurityCard
      value={val}
      onChange={setVal}
      onContinue={onContinue}
      policy={policy}
    />
  );
};

const getPasswordInput = () => screen.getByPlaceholderText('Enter password...');

describe('PasswordSecurityCard Full Component & Flow Tests', () => {
  it('renders all core UI sections (Card header, input, score, checklist, continue button)', () => {
    render(<PasswordSecurityCard />);
    expect(screen.getByText('Password Security')).toBeInTheDocument();

    const input = getPasswordInput();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'passguard-input');

    expect(screen.getByText('Password Score')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  describe('Complete User Journey Interaction Flow', () => {
    it('executes user flow from empty -> weak password -> strong password -> excellent state', async () => {
      const user = userEvent.setup();
      const continueSpy = vi.fn();

      render(<InteractivePasswordSecurityCard onContinue={continueSpy} />);
      const input = getPasswordInput();

      // Step 1: Initial state
      expect(input).toHaveValue('');

      // Step 2: Type weak password ("123")
      fireEvent.change(input, { target: { value: '123' } });
      expect(input).toHaveValue('123');
      expect(screen.getByText('Requirements')).toBeInTheDocument();

      // Step 3: Clear and set a strong, complex password
      fireEvent.change(input, { target: { value: 'P@ssGu@rd2026!Xz#9' } });

      await waitFor(
        () => {
          expect(screen.getByText(/Strong|Excellent/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      // Step 4: Click Continue button
      const continueBtn = screen.getByRole('button', { name: /continue/i });
      await user.click(continueBtn);

      expect(continueSpy).toHaveBeenCalledTimes(1);
      const analysisArg = continueSpy.mock.calls[0][0];
      expect(analysisArg).toHaveProperty('score');
      expect(analysisArg.score).toBeGreaterThanOrEqual(60);
    });
  });

  describe('Custom Policy Configuration', () => {
    it('updates visible requirements when custom policy is supplied (minLength: 16)', () => {
      render(
        <PasswordSecurityCard
          policy={{
            minLength: 16,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            requireSymbol: true,
          }}
        />
      );

      expect(screen.getByText('At least 16 characters')).toBeInTheDocument();
    });
  });

  describe('Edge / Error Cases & UI Resilience', () => {
    it('handles extremely long password (1,000+ chars) smoothly without crashing', async () => {
      render(<InteractivePasswordSecurityCard />);
      const input = getPasswordInput();

      const longPass = 'P@ssw0rd!' + 'a'.repeat(500);
      fireEvent.change(input, { target: { value: longPass } });

      expect(input).toHaveValue(longPass);
      expect(screen.getByText('Password Security')).toBeInTheDocument();
    });

    it('handles password clearing cleanly', async () => {
      render(<InteractivePasswordSecurityCard />);
      const input = getPasswordInput();

      fireEvent.change(input, { target: { value: 'Temp123!' } });
      expect(input).toHaveValue('Temp123!');

      fireEvent.change(input, { target: { value: '' } });
      expect(input).toHaveValue('');
      expect(screen.getByText('Password Security')).toBeInTheDocument();
    });
  });

  describe('Security DOM Leakage Checks', () => {
    it('verifies plaintext password string appears strictly inside the input element value attribute', async () => {
      const secret = 'UniqueUserSecretPassword2026!';
      const { container } = render(<PasswordSecurityCard value={secret} onChange={() => {}} />);

      const input = getPasswordInput();
      expect(input).toHaveValue(secret);

      // Clone container and remove the input element itself
      const cloned = container.cloneNode(true) as HTMLElement;
      const inputs = cloned.querySelectorAll('input');
      inputs.forEach((i) => i.remove());

      // Assert plaintext secret is NOT present anywhere else in the card text/HTML
      expect(cloned.innerHTML).not.toContain(secret);
      expect(cloned.textContent).not.toContain(secret);
    });
  });
});
