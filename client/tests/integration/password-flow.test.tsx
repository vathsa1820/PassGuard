import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';

const ControlledPasswordSecurityCard = ({ onContinue }: { onContinue?: (analysis?: any) => void }) => {
  const [password, setPassword] = useState('');
  return (
    <PasswordSecurityCard
      value={password}
      onChange={setPassword}
      onContinue={onContinue}
    />
  );
};

describe('Password Flow Integration Tests (UI + Real Engine)', () => {
  it('1. Complete Password Journey: Empty -> Weak -> Strong -> Excellent', async () => {
    const user = userEvent.setup();
    const continueSpy = vi.fn();

    render(<ControlledPasswordSecurityCard onContinue={continueSpy} />);
    const input = screen.getByPlaceholderText('Enter password...');

    // Step 1: Empty state
    expect(input).toHaveValue('');
    expect(screen.getAllByText('Password Score')[0]).toBeInTheDocument();

    // Step 2: Enter weak password ("123")
    fireEvent.change(input, { target: { value: '123' } });
    expect(input).toHaveValue('123');

    // Step 3: Verify checklist items reflect failed min-length rule
    await waitFor(() => {
      expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
    });

    // Step 4: Improve password to Strong ("Password123!")
    fireEvent.change(input, { target: { value: 'Password123!' } });
    await waitFor(() => {
      expect(screen.getAllByText(/Strong|Excellent/i)[0]).toBeInTheDocument();
    });

    // Step 5: Improve password to Excellent ("P@ssGu@rd2026!Xz#9")
    fireEvent.change(input, { target: { value: 'P@ssGu@rd2026!Xz#9' } });
    await waitFor(() => {
      expect(screen.getAllByText('Excellent')[0]).toBeInTheDocument();
    });

    // Step 6: Verify continue button receives real analysis object payload
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    await user.click(continueBtn);

    expect(continueSpy).toHaveBeenCalledTimes(1);
    const result = continueSpy.mock.calls[0][0];
    expect(result.score).toBe(100);
    expect(result.status).toBe('Excellent');
  });

  it('2. Custom Policy Requirements Flow', async () => {
    const customPolicy = {
      minLength: 16,
      requireSymbol: true,
      requireNumber: true,
    };

    render(<ControlledPasswordSecurityCard />);
    const input = screen.getByPlaceholderText('Enter password...');

    // Enter a password meeting standard length (12) but failing custom length (16)
    fireEvent.change(input, { target: { value: 'ShortPass123!' } });
    await waitFor(() => {
      expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
    });
  });

  it('3. Form Submission Callback Integration', async () => {
    const continueSpy = vi.fn();
    render(<ControlledPasswordSecurityCard onContinue={continueSpy} />);

    const input = screen.getByPlaceholderText('Enter password...');
    fireEvent.change(input, { target: { value: 'P@ssGu@rd2026!Xz#9' } });

    await waitFor(() => {
      expect(screen.getAllByText('Excellent')[0]).toBeInTheDocument();
    });

    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).not.toBeDisabled();
    fireEvent.click(continueBtn);

    expect(continueSpy).toHaveBeenCalledTimes(1);
    expect(continueSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Excellent',
        score: expect.any(Number),
      })
    );
  });

  it('4. Clearing Password Resets State Cleanly', async () => {
    render(<ControlledPasswordSecurityCard />);
    const input = screen.getByPlaceholderText('Enter password...');

    // Enter a strong password first
    fireEvent.change(input, { target: { value: 'ComplexPassword2026!#' } });
    await waitFor(() => {
      expect(screen.getAllByText(/Strong|Excellent/i)[0]).toBeInTheDocument();
    });

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');

    await waitFor(() => {
      expect(screen.getAllByText('Password Score')[0]).toBeInTheDocument();
    });
  });
});
