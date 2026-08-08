import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from '../../src/components/password/PasswordInput';

const ControlledPasswordInput = ({ initialValue = '' }: { initialValue?: string }) => {
  const [val, setVal] = useState(initialValue);
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor="test-pass-input">Account Password</label>
      <PasswordInput
        id="test-pass-input"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        showPassword={show}
        toggleVisibility={() => setShow(!show)}
        placeholder="Enter your password..."
      />
    </div>
  );
};

describe('PasswordInput Component Tests', () => {
  it('renders password input correctly', () => {
    render(<PasswordInput value="" onChange={() => {}} placeholder="Enter password..." />);
    const input = screen.getByPlaceholderText('Enter password...');
    expect(input).toBeInTheDocument();
  });

  it('associates label with input element via id', () => {
    render(<ControlledPasswordInput />);
    const input = screen.getByLabelText('Account Password');
    expect(input).toBeInTheDocument();
  });

  it('displays placeholder text when configured', () => {
    render(<PasswordInput value="" onChange={() => {}} placeholder="Custom Placeholder" />);
    expect(screen.getByPlaceholderText('Custom Placeholder')).toBeInTheDocument();
  });

  it('allows user to type a password', async () => {
    const user = userEvent.setup();
    render(<ControlledPasswordInput />);
    const input = screen.getByLabelText('Account Password');

    await user.type(input, 'Secret123!');
    expect(input).toHaveValue('Secret123!');
  });

  it('allows user to clear/delete the password', async () => {
    const user = userEvent.setup();
    render(<ControlledPasswordInput initialValue="Secret123!" />);
    const input = screen.getByLabelText('Account Password');

    await user.clear(input);
    expect(input).toHaveValue('');
  });

  it('masks password input by default (type="password")', () => {
    render(<ControlledPasswordInput initialValue="Secret123!" />);
    const input = screen.getByLabelText('Account Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders a show/hide password toggle button', () => {
    render(<ControlledPasswordInput />);
    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it('toggles password visibility when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<ControlledPasswordInput initialValue="Secret123!" />);

    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    const input = screen.getByLabelText('Account Password');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /hide password/i }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('supports keyboard focus and interaction on input and toggle button', async () => {
    const user = userEvent.setup();
    render(<ControlledPasswordInput />);
    const input = screen.getByLabelText('Account Password');
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    await user.tab();
    expect(input).toHaveFocus();

    await user.tab();
    expect(toggleBtn).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('verifies password string is never written to console during user interaction', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log');

    render(<ControlledPasswordInput />);
    const input = screen.getByLabelText('Account Password');
    await user.type(input, 'SuperSensitivePass2026!');

    expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('SuperSensitivePass2026!'));
    logSpy.mockRestore();
  });
});
