import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RequirementChecklist } from '../../src/components/password/RequirementChecklist';

describe('RequirementChecklist Component Tests', () => {
  const sampleRules = [
    { label: 'At least 12 characters', completed: true },
    { label: 'Uppercase letter', completed: false },
    { label: 'Special character', completed: true },
  ];

  it('renders requirement section heading and summary count correctly (2/3 met)', () => {
    render(<RequirementChecklist rules={sampleRules} />);
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('(2/3 met)')).toBeInTheDocument();
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
  });

  it('renders requirement summary counts accurately for 0/5, 1/5, 4/5, 5/5', () => {
    const rules5 = [
      { label: 'Min length', completed: false },
      { label: 'Uppercase', completed: false },
      { label: 'Lowercase', completed: false },
      { label: 'Number', completed: false },
      { label: 'Special char', completed: false },
    ];

    const { rerender } = render(<RequirementChecklist rules={rules5} />);
    expect(screen.getByText('(0/5 met)')).toBeInTheDocument();

    // 1/5
    rules5[0].completed = true;
    rerender(<RequirementChecklist rules={[...rules5]} />);
    expect(screen.getByText('(1/5 met)')).toBeInTheDocument();

    // 4/5
    rules5[1].completed = true;
    rules5[2].completed = true;
    rules5[3].completed = true;
    rerender(<RequirementChecklist rules={[...rules5]} />);
    expect(screen.getByText('(4/5 met)')).toBeInTheDocument();

    // 5/5
    rules5[4].completed = true;
    rerender(<RequirementChecklist rules={[...rules5]} />);
    expect(screen.getByText('(5/5 met)')).toBeInTheDocument();
  });

  it('supports compact progressive disclosure with toggle button and ARIA attributes', () => {
    render(<RequirementChecklist rules={sampleRules} density="compact" />);
    
    // Summary is visible
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('(2/3 met)')).toBeInTheDocument();

    // Toggle button exists with aria-expanded="false"
    const toggleButton = screen.getByRole('button', { name: /show details|view details/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls');

    // Click toggle button to expand
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hide details')).toBeInTheDocument();
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();

    // Click toggle button again to collapse
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('honors explicit density overrides', () => {
    render(<RequirementChecklist rules={sampleRules} density="detailed" />);
    expect(screen.queryByRole('button', { name: /show details|view details/i })).not.toBeInTheDocument();
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();

    const { unmount } = render(<RequirementChecklist rules={sampleRules} density="compact" />);
    expect(screen.getByRole('button', { name: /show details|view details/i })).toBeInTheDocument();
    unmount();
  });

  it('renders safely when rules prop is empty', () => {
    render(<RequirementChecklist rules={[]} />);
    expect(screen.getByText('(0/0 met)')).toBeInTheDocument();
  });
});
