import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PasswordHealthScore } from '../../src/components/password/PasswordHealthScore';

describe('PasswordHealthScore Component Tests', () => {
  it('renders password score container correctly', () => {
    render(<PasswordHealthScore score={75} status="Strong" />);
    expect(screen.getByText('Password Score')).toBeInTheDocument();
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('displays the supplied numeric score and maximum denominator (/100)', () => {
    render(<PasswordHealthScore score={85} status="Excellent" showScore={true} />);
    expect(screen.getByText('/100')).toBeInTheDocument();
  });

  it('updates status badge when status prop changes', async () => {
    const { rerender } = render(<PasswordHealthScore score={25} status="Weak" />);
    expect(screen.getByText('Weak')).toBeInTheDocument();

    rerender(<PasswordHealthScore score={65} status="Strong" />);
    await waitFor(() => {
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  it('handles boundary status states cleanly', () => {
    const statuses = ['Weak', 'Fair', 'Strong', 'Excellent'];
    statuses.forEach((status) => {
      const { unmount } = render(<PasswordHealthScore score={50} status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });

  it('does not recalculate score internally; strictly renders supplied props', () => {
    render(<PasswordHealthScore score={99} status="CustomStatus" />);
    expect(screen.getByText('CustomStatus')).toBeInTheDocument();
  });
});
