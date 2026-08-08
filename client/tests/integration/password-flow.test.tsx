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
    expect(screen.getByText('Password Score')).toBeInTheDocument();

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
      expect(screen.getByText(/Strong|Excellent/i)).toBeInTheDocument();
    });

    // Step 5: Improve password to Excellent ("P@ssGu@rd2026!Xz#9")
    fireEvent.change(input, { target: { value: 'P@ssGu@rd2026!Xz#9' } });
    await waitFor(() => {
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });

    // Step 6: Verify continue button receives real analysis object payload
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    await user.click(continueBtn);

    expect(continueSpy).toHaveBeenCalledTimes(1);
    const result = continueSpy.mock.calls[0][0];
    expect(result.score).toBe(100);
    expect(result.status).toBe('Excellent');
  });

  it('2. Real-Time Typing Incremental Behavior', async () => {
    render(<ControlledPasswordSecurityCard />);
    const input = screen.getByPlaceholderText('Enter password...');

    const increments = ['a', 'ab', 'Ab', 'Ab1', 'Ab1!', 'Ab1!longerpass2026'];
    for (const val of increments) {
      fireEvent.change(input, { target: { value: val } });
      expect(input).toHaveValue(val);
      await waitFor(() => {
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    }
  });

  it('3. Rapid Input Changes (No Stale Results or Race Conditions)', async () => {
    render(<ControlledPasswordSecurityCard />);
    const input = screen.getByPlaceholderText('Enter password...');

    // Rapidly change input values
    fireEvent.change(input, { target: { value: 'short' } });
    fireEvent.change(input, { target: { value: 'medium123' } });
    fireEvent.change(input, { target: { value: 'SuperSecurePass2026!#' } });

    await waitFor(() => {
      expect(input).toHaveValue('SuperSecurePass2026!#');
      expect(screen.getByText(/Strong|Excellent/i)).toBeInTheDocument();
    });
  });

  it('4. Clearing Password Resets State Cleanly', async () => {
    render(<ControlledPasswordSecurityCard />);
    const input = screen.getByPlaceholderText('Enter password...');

    // Enter a strong password first
    fireEvent.change(input, { target: { value: 'ComplexPassword2026!#' } });
    await waitFor(() => {
      expect(screen.getByText(/Strong|Excellent/i)).toBeInTheDocument();
    });

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');

    await waitFor(() => {
      expect(screen.getByText('Password Score')).toBeInTheDocument();
    });
  });
});
