import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordInput } from '../../src/components/password/PasswordInput';
import { PasswordHealthScore } from '../../src/components/password/PasswordHealthScore';
import { PasswordStrengthIndicator } from '../../src/components/password/PasswordStrengthIndicator';
import { RequirementChecklist } from '../../src/components/password/RequirementChecklist';
import { SuggestionCard } from '../../src/components/password/SuggestionCard';
import { ReuseWarning } from '../../src/components/password/ReuseWarning';

expect.extend(toHaveNoViolations);

describe('Automated Accessibility (axe-core) Audit', () => {
  it('1. PasswordSecurityCard has no axe accessibility violations', async () => {
    const { container } = render(<PasswordSecurityCard value="PassGuard2026!#" onChange={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('2. PasswordInput with associated label has no axe accessibility violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-pass">Password</label>
        <PasswordInput id="test-pass" value="SamplePass123!" onChange={() => {}} />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('3. PasswordHealthScore has no axe accessibility violations', async () => {
    const { container } = render(<PasswordHealthScore score={85} status="Strong" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('4. PasswordStrengthIndicator progressbar has no axe accessibility violations', async () => {
    const { container } = render(<PasswordStrengthIndicator score={75} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('5. RequirementChecklist has no axe accessibility violations', async () => {
    const rules = [
      { label: 'At least 12 characters', completed: true },
      { label: 'Include uppercase letter', completed: false },
    ];
    const { container } = render(<RequirementChecklist rules={rules} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('6. SuggestionCard has no axe accessibility violations', async () => {
    const { container } = render(
      <SuggestionCard
        title="Smart Suggestion"
        description="Add a special symbol like ! or # to boost score."
        expectedScore={15}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('7. ReuseWarning alert has no axe accessibility violations', async () => {
    const { container } = render(
      <ReuseWarning
        isVisible={true}
        message="Previously used password detected."
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
