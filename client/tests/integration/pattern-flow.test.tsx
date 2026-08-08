import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Pattern & Common Password Integration Flow Tests', () => {
  const analyzer = new PasswordAnalyzer();

  describe('Common Password Dataset Detection Flow', () => {
    it('flags common password "password" with High risk warning in analyzer and UI', async () => {
      const result = await analyzer.analyze('password');
      expect(result.commonPassword.isCommon).toBe(true);
      expect(result.commonPassword.risk).toBe('High');

      render(<PasswordSecurityCard value="password" onChange={() => {}} />);
      await waitFor(() => {
        expect(screen.getByText('Common Password Flagged')).toBeInTheDocument();
      });
    });

    it('does not flag random complex password as common', async () => {
      const result = await analyzer.analyze('k9#mP$92vL!x');
      expect(result.commonPassword.isCommon).toBe(false);

      render(<PasswordSecurityCard value="k9#mP$92vL!x" onChange={() => {}} />);
      expect(screen.queryByText('Common Password Flagged')).not.toBeInTheDocument();
    });
  });

  describe('Pattern Detection Flow (Engine -> UI Suggestion)', () => {
    it('detects sequential numbers "123456" and provides pattern feedback', async () => {
      const result = await analyzer.analyze('123456');
      const seqPattern = result.patterns.find((p) => p.detected && p.type === 'sequential-numbers');
      expect(seqPattern).toBeDefined();
    });

    it('detects keyboard pattern "qwertyuiop" and updates analysis result', async () => {
      const result = await analyzer.analyze('qwertyuiop');
      const kbPattern = result.patterns.find((p) => p.detected && p.type === 'keyboard');
      expect(kbPattern).toBeDefined();
    });

    it('detects repeated characters "aaaaaa" and updates analysis result', async () => {
      const result = await analyzer.analyze('aaaaaa');
      const repPattern = result.patterns.find((p) => p.detected && p.type === 'repeated-chars');
      expect(repPattern).toBeDefined();
    });
  });
});
