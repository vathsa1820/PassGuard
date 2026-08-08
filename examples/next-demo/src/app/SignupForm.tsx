'use client';

import React, { useState } from 'react';
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '@vatza/passguard';

// Configurable policy for Next.js app signup
const nextAppPolicy: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: true,
  preventKeyboardPatterns: true,
  checkCommonPasswords: true,
  preventReuse: true,
};

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis || analysis.score < 50) return;
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #1f2937' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#ffffff' }}>
        Next.js Account Registration
      </h2>

      {submitted ? (
        <div style={{ backgroundColor: '#065f46', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#34d399', fontWeight: 'bold', margin: '0 0 8px 0' }}>Success!</p>
          <p style={{ fontSize: '14px', margin: 0 }}>Registration mock complete for <strong>{email}</strong>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Work Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@company.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #374151',
                backgroundColor: '#1f2937',
                color: '#ffffff',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            {/* Next.js Client Component integration for PasswordSecurityCard */}
            <PasswordSecurityCard
              policy={nextAppPolicy}
              value={password}
              onChange={(val) => setPassword(val)}
              onContinue={(res) => setAnalysis(res || null)}
            />
          </div>

          <button
            type="submit"
            disabled={!analysis || analysis.score < 50}
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: analysis && analysis.score >= 50 ? '#2563eb' : '#374151',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: analysis && analysis.score >= 50 ? 'pointer' : 'not-allowed'
            }}
          >
            Sign Up with Next.js
          </button>
        </form>
      )}
    </div>
  );
}
