import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordSecurityCard } from '../../src/components/password/PasswordSecurityCard';
import { PasswordAnalyzer } from '../../src/engine/analyzer/PasswordAnalyzer';

describe('Edge Case: Symbols & Injection Vectors Security', () => {
  const analyzer = new PasswordAnalyzer();

  describe('1. Special Symbol Sets & Punctuation', () => {
    it('evaluates full ASCII special character set without error', async () => {
      const symbolsPass = "!@#$%^&*()_+-=[]{}|;: '\",.<>?/~`";
      const result = await analyzer.analyze(symbolsPass);
      expect(result.score).toBeGreaterThan(0);
      expect(result.rules.find((r) => r.id === 'special-char')?.passed).toBe(true);
    });

    it('evaluates mixed quotes, backslashes, and brackets safely', async () => {
      const complexSymbols = 'Pass\\"\'\\\\/{}[];:<>,.?/~!@#$%^&*()';
      const result = await analyzer.analyze(complexSymbols);
      expect(result.score).toBeGreaterThan(0);
    });
  });

  describe('2. Code Injection Vectors (XSS, SQLi, Shell)', () => {
    it('handles HTML/XSS script injection strings without parser failure', async () => {
      const xssVector = "<script>alert('XSS')</script>";
      const result = await analyzer.analyze(xssVector);
      expect(result.score).toBeDefined();

      render(<PasswordSecurityCard value={xssVector} onChange={() => {}} />);
      expect(screen.getByPlaceholderText('Enter password...')).toHaveValue(xssVector);
      expect(screen.queryByText("alert('XSS')")).not.toBeInTheDocument();
    });

    it('handles SQL injection payload strings safely', async () => {
      const sqliVector = "'; DROP TABLE users; SELECT * FROM credentials WHERE '1'='1";
      const result = await analyzer.analyze(sqliVector);
      expect(result.score).toBeGreaterThan(0);

      render(<PasswordSecurityCard value={sqliVector} onChange={() => {}} />);
      expect(screen.getByPlaceholderText('Enter password...')).toHaveValue(sqliVector);
    });
  });
});
