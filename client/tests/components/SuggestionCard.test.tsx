import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SuggestionCard } from '../../src/components/password/SuggestionCard';

describe('SuggestionCard Component Tests', () => {
  it('renders suggestion title, description, and expected score boost', () => {
    render(
      <SuggestionCard
        title="Smart Suggestion"
        description="Add a special character to increase password complexity."
        expectedScore={15}
      />
    );

    expect(screen.getByText('Smart Suggestion')).toBeInTheDocument();
    expect(
      screen.getByText('Add a special character to increase password complexity.')
    ).toBeInTheDocument();
    expect(screen.getByText('+15')).toBeInTheDocument();
  });

  it('renders correctly without expectedScore boost badge when omitted', () => {
    render(
      <SuggestionCard
        title="Length Recommendation"
        description="Make password longer for better security."
      />
    );

    expect(screen.getByText('Length Recommendation')).toBeInTheDocument();
    expect(screen.getByText('Make password longer for better security.')).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});
