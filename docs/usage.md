# Usage Guide

This guide provides practical integration examples for using `@vatza/passguard` in React applications, including controlled forms, submit validation, custom policies, and headless custom hooks.

---

## 1. Controlled Component Pattern

PassGuard components function seamlessly as controlled components:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';

export function ControlledSignup() {
  const [password, setPassword] = useState('');

  return (
    <PasswordSecurityCard
      value={password}
      onChange={(newPassword) => setPassword(newPassword)}
    />
  );
}
```

Or as uncontrolled components using internal fallback state:

```tsx
import React from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';

export function UncontrolledSignup() {
  return (
    <PasswordSecurityCard
      onChange={(currentPassword) => {
        console.log('Password updated');
      }}
    />
  );
}
```

---

## 2. Complete Signup Form Integration

Below is a complete, real-world signup form binding full-name, email, password security evaluations, confirm-password matching, and form submission validation:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordAnalysisOutput } from '@vatza/passguard';

export function FullRegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysisOutput | null>(null);

  // Form submission criteria: email present, passwords match, and analysis score >= 60
  const isPasswordsMatching = password === confirmPassword;
  const isScoreAcceptable = Boolean(analysis && analysis.score >= 60 && analysis.isValid);
  const isSubmitDisabled = !email || !password || !isPasswordsMatching || !isScoreAcceptable;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    console.log('Registering user with verified password score:', analysis?.score);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2>Create Account</h2>

      <label htmlFor="email-input">Email Address</label>
      <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordSecurityCard
        value={password}
        onChange={setPassword}
        onContinue={(analysisResult) => {
          setAnalysis(analysisResult || null);
        }}
      />

      <label htmlFor="confirm-input">Confirm Password</label>
      <input
        id="confirm-input"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {!isPasswordsMatching && confirmPassword && (
        <p style={{ color: 'red' }}>Passwords do not match.</p>
      )}

      <button type="submit" disabled={isSubmitDisabled}>
        Complete Registration
      </button>
    </form>
  );
}
```

---

## 3. Headless Usage with `usePasswordAnalysis`

If you prefer to build a fully custom UI while using PassGuard's zero-knowledge security engine, use the `usePasswordAnalysis` hook:

```tsx
import React, { useState } from 'react';
import { usePasswordAnalysis } from '@vatza/passguard';

export function HeadlessPasswordInput() {
  const [password, setPassword] = useState('');
  const analysis = usePasswordAnalysis(password);

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password..."
      />

      <div>
        <p>Score: {analysis.score} / 100</p>
        <p>Status: {analysis.status}</p>
        <p>Entropy: {analysis.entropy} bits</p>
      </div>

      <ul>
        {analysis.rules.map((rule) => (
          <li key={rule.id} style={{ color: rule.passed ? 'green' : 'red' }}>
            {rule.label}
          </li>
        ))}
      </ul>

      {analysis.suggestion.message && (
        <p>Tip: {analysis.suggestion.message}</p>
      )}
    </div>
  );
}
```

---

## 4. Asynchronous Programmatic Evaluation

For non-React scripts or validation pipelines, evaluate passwords directly using `analyzePassword`:

```ts
import { analyzePassword, type PasswordPolicy } from '@vatza/passguard';

const policy: PasswordPolicy = {
  minLength: 14,
  requireUppercase: true,
  requireNumber: true,
  requireSymbol: true,
  maxLength: 128,
  requireLowercase: true,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: true,
  preventKeyboardPatterns: true,
  checkCommonPasswords: true,
  preventReuse: true,
};

async function checkUserPassword(input: string) {
  const result = await analyzePassword(input, policy);
  console.log('Password valid:', result.isValid);
  console.log('Calculated score:', result.score);
}
```

---

## 5. Next Steps

- **[Configuration Guide](configuration.md)**: Detail custom rule properties.
- **[Component Reference](components.md)**: Explore modular UI components.
- **[Public API Reference](api-reference.md)**: Complete TypeScript API definitions.
