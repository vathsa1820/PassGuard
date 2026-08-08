import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrengthIndicator } from '../../src/components/password/PasswordStrengthIndicator';

describe('PasswordStrengthIndicator Progress Component Tests', () => {
  it('renders progress bar with correct ARIA accessibility attributes', () => {
    render(<PasswordStrengthIndicator score={60} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-valuenow', '60');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });

  it('reflects score 0 as empty progress (aria-valuenow="0")', () => {
    render(<PasswordStrengthIndicator score={0} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
  });

  it('reflects score 100 as full progress (aria-valuenow="100")', () => {
    render(<PasswordStrengthIndicator score={100} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });

  it('normalizes negative score values safely to 0', () => {
    render(<PasswordStrengthIndicator score={-25} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
  });

  it('normalizes excessive score values safely to 100', () => {
    render(<PasswordStrengthIndicator score={150} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });
});
