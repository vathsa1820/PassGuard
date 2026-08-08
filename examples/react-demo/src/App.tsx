import React, { useState } from 'react';
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '@vatza/passguard';
import '@vatza/passguard/style.css';

// Define a custom, enterprise-grade password policy for your application
const customSignupPolicy: PasswordPolicy = {
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

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [latestAnalysis, setLatestAnalysis] = useState<PasswordAnalysis | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isPasswordMatched = password && confirmPassword && password === confirmPassword;
  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    isPasswordMatched &&
    (latestAnalysis ? latestAnalysis.score >= 50 : false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    // Simulate zero-knowledge secure registration submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '540px', margin: '40px auto', padding: '24px', color: '#f3f4f6' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#ffffff' }}>
          Create Your PassGuard Account
        </h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
          Demonstrating zero-knowledge real-time password security integration
        </p>
      </header>

      {submitSuccess ? (
        <div style={{
          backgroundColor: '#065f46',
          border: '1px solid #10b981',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#34d399', margin: '0 0 8px 0' }}>Account Created Successfully!</h2>
          <p style={{ color: '#e5e7eb', margin: '0 0 16px 0', fontSize: '14px' }}>
            Welcome, <strong>{name}</strong>! Your account has been registered with high password security score ({latestAnalysis?.score}/100).
          </p>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setPassword('');
              setConfirmPassword('');
            }}
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reset Form Demo
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Full Name Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alice Smith"
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

          {/* Email Address Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
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

          {/* PassGuard PasswordSecurityCard Component */}
          <div>
            <PasswordSecurityCard
              policy={customSignupPolicy}
              value={password}
              onChange={(val: string) => setPassword(val)}
              onContinue={(analysis: PasswordAnalysis | null | undefined) => {
                setLatestAnalysis(analysis || null);
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Confirm Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                border: `1px solid ${confirmPassword && !isPasswordMatched ? '#ef4444' : '#374151'}`,
                backgroundColor: '#1f2937',
                color: '#ffffff',
                boxSizing: 'border-box'
              }}
            />
            {confirmPassword && !isPasswordMatched && (
              <span style={{ fontSize: '12px', color: '#f87171', marginTop: '4px', display: 'block' }}>
                Passwords do not match.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isFormValid ? '#3b82f6' : '#374151',
              color: isFormValid ? '#ffffff' : '#9ca3af',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      )}
    </div>
  );
}
