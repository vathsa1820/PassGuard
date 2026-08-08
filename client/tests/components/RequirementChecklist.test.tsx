import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RequirementChecklist } from '../../src/components/password/RequirementChecklist';

describe('RequirementChecklist Component Tests', () => {
  const sampleRules = [
    { label: 'At least 12 characters', completed: true },
    { label: 'Uppercase letter', completed: false },
    { label: 'Special character', completed: true },
  ];

  it('renders requirement section heading and list items', () => {
    render(<RequirementChecklist rules={sampleRules} />);
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
    expect(screen.getByText('Uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Special character')).toBeInTheDocument();
  });

  it('renders completed and incomplete items based on completed boolean prop', () => {
    render(<RequirementChecklist rules={sampleRules} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });

  it('updates completed states when props change', () => {
    const { rerender } = render(<RequirementChecklist rules={sampleRules} />);

    const updatedRules = [
      { label: 'At least 12 characters', completed: true },
      { label: 'Uppercase letter', completed: true }, // Changed to true
      { label: 'Special character', completed: true },
    ];

    rerender(<RequirementChecklist rules={updatedRules} />);
    expect(screen.getByText('Uppercase letter')).toBeInTheDocument();
  });

  it('renders empty list safely without crashing when rules prop is empty', () => {
    render(<RequirementChecklist rules={[]} />);
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });
});
