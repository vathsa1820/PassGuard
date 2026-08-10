# Usage Guide

This guide provides practical integration examples for using `@vatza/passguard` in React applications, including controlled forms, signup form integration, container-aware adaptive density, and headless custom hooks.

---

## 1. Zero-Config Automatic Mode vs Explicit Density

### Automatic Theme & Container Adaptation
PassGuard inspects its host parent container and automatically adapts colors and layout density:

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

### Explicit Density Control
To override automatic container measurement (e.g. inside a narrow sidebar or modal form), pass `density`:

```tsx
<PasswordSecurityCard density="compact" />
```

Available density options:
* `auto`: Automatically selects density based on container width (`<340px` compact, `>600px` detailed).
* `compact` / `minimal`: Single-row requirement summary with interactive progressive disclosure toggle.
* `standard`: Standard form view (`340px–600px`).
* `detailed`: Extended multi-column view (`>600px`).

---

## 2. Complete Signup Form Integration

Below is a complete, real-world registration form embedding PassGuard naturally underneath a password input field:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordAnalysisOutput } from '@vatza/passguard';

export function FullRegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysisOutput | null>(null);

  const isPasswordsMatching = password === confirmPassword;
  const isScoreAcceptable = Boolean(analysis && analysis.score >= 60 && analysis.isValid);
  const isSubmitDisabled = !email || !password || !isPasswordsMatching || !isScoreAcceptable;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    console.log('Registering user with verified password score:', analysis?.score);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 440, margin: '0 auto' }}>
      <h2>Create Account</h2>

      <label htmlFor="email-input">Email Address</label>
      <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* PassGuard embedded password security module */}
      <PasswordSecurityCard
        density="compact"
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
        <p>Score: {analysis.score} / 100 ({analysis.status})</p>
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

## 4. Accessibility & Reduced Motion

PassGuard components enforce accessibility out-of-the-box:
* **Keyboard Navigation**: All inputs, toggles, and buttons support keyboard focus (`focus-visible:ring-2`).
* **ARIA Semantics**: Collapsible checklists use `aria-expanded` and `aria-controls`.
* **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by turning off visual transition effects.

---

## 5. Security & Operational Boundaries

PassGuard performs password strength evaluations **100% locally in browser memory**. PassGuard does **not** replace:
- Server-side password hashing (`Argon2id`, `bcrypt`).
- Backend authentication & session security.
- IP rate-limiting & multi-factor authentication (MFA).

---

## 6. Next Steps

- **[Configuration Guide](configuration.md)**: Detail custom rule properties.
- **[Component Reference](components.md)**: Explore modular UI components.
- **[Public API Reference](api-reference.md)**: Complete TypeScript API definitions.
