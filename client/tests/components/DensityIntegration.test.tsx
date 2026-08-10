import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';

describe('Phase 4 — Density & Embedded UI Integration Tests', () => {
  it('renders minimal embedded header in 240px container (<280px)', () => {
    const { container } = render(
      <div style={{ width: '240px' }}>
        <PasswordSecurityCard density="compact" value="Secret123!" />
      </div>
    );

    const rootCard = container.querySelector('[data-passguard]');
    expect(rootCard).toHaveAttribute('data-passguard-density', 'compact');
    expect(screen.getByText('Password Security')).toBeInTheDocument();
    // Shield icon container is hidden in compact/minimal headers
    expect(container.querySelector('.lucide-shield-check')).not.toBeInTheDocument();
  });

  it('renders compact header without icon in 280px-339px containers', () => {
    const { container } = render(
      <div style={{ width: '300px' }}>
        <PasswordSecurityCard density="compact" value="Secret123!" />
      </div>
    );

    expect(screen.getByText('Password Security')).toBeInTheDocument();
    expect(container.querySelector('.lucide-shield-check')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });

  it('renders standard header with icon in 340px-600px containers', () => {
    const { container } = render(
      <div style={{ width: '450px' }}>
        <PasswordSecurityCard density="standard" value="Secret123!" />
      </div>
    );

    expect(screen.getByText('Password Security')).toBeInTheDocument();
    expect(container.querySelector('.lucide-shield-check')).toBeInTheDocument();
  });

  it('renders detailed layout in 700px+ containers', () => {
    const { container } = render(
      <div style={{ width: '750px' }}>
        <PasswordSecurityCard density="detailed" value="Secret123!" />
      </div>
    );

    const rootCard = container.querySelector('[data-passguard]');
    expect(rootCard).toHaveAttribute('data-passguard-density', 'detailed');
    expect(screen.queryByRole('button', { name: /view details/i })).not.toBeInTheDocument();
  });

  it('allows expanding and collapsing requirement details in compact mode', () => {
    render(<PasswordSecurityCard density="compact" value="Pass1!" />);

    const toggleButton = screen.getByRole('button', { name: /view details/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Expand
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hide details')).toBeInTheDocument();

    // Collapse
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('View details')).toBeInTheDocument();
  });

  it('adapts cleanly to Host Application A (Modern SaaS #7C3AED)', () => {
    const { container } = render(
      <PasswordSecurityCard override={{ bg: '#F8FAFC', accent: '#7C3AED', mode: 'light' }} value="Secret123!" />
    );

    const rootCard = container.querySelector('[data-passguard]');
    expect(rootCard).toHaveAttribute('data-passguard-theme', 'light');
    expect(rootCard?.getAttribute('style')?.toLowerCase()).toContain('--passguard-accent: #7c3aed');
  });

  it('adapts cleanly to Host Application B (Cybersecurity #00D4FF)', () => {
    const { container } = render(
      <PasswordSecurityCard override={{ bg: '#09090B', accent: '#00D4FF', mode: 'dark' }} value="Secret123!" />
    );

    const rootCard = container.querySelector('[data-passguard]');
    expect(rootCard).toHaveAttribute('data-passguard-theme', 'dark');
    expect(rootCard?.getAttribute('style')?.toLowerCase()).toContain('--passguard-accent: #00d4ff');
  });

  it('adapts cleanly to Host Application C (Banking #123456)', () => {
    const { container } = render(
      <PasswordSecurityCard override={{ bg: '#FFFFFF', accent: '#123456', radius: '0.125rem', mode: 'light' }} value="Secret123!" />
    );

    const rootCard = container.querySelector('[data-passguard]');
    expect(rootCard).toHaveAttribute('data-passguard-theme', 'light');
    expect(rootCard?.getAttribute('style')).toContain('--passguard-radius: 0.125rem');
  });
});
