# PassGuard Integration Guide

Complete developer guide for integrating PassGuard's zero-knowledge real-time password security intelligence engine and UI components into React applications.

---

## Table of Contents
1. [Basic React Integration](#1-basic-react-integration)
2. [Custom Policy Configuration](#2-custom-policy-configuration)
3. [Controlled Component Usage](#3-controlled-component-usage)
4. [Form Integration & Submit Validation](#4-form-integration--submit-validation)
5. [Analysis Callback (`onContinue`) Usage](#5-analysis-callback-oncontinue-usage)
6. [Security & Privacy Standards](#6-security--privacy-standards)
7. [Common Integration Mistakes](#7-common-integration-mistakes)

---

## 1. Basic React Integration

To integrate PassGuard into your React application:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';

export function SimpleSignup() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
      <PasswordSecurityCard
        value={password}
        onChange={(newPassword) => setPassword(newPassword)}
      />
    </div>
  );
}
```

When no custom policy is provided, PassGuard automatically applies the `defaultPasswordPolicy` (12-character minimum, uppercase, lowercase, number, symbol, pattern detection, common password check, and reuse prevention).

---

## 2. Custom Policy Configuration

PassGuard allows developers to configure custom password policies without modifying internal security engines using the `PasswordPolicy` interface.

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordPolicy } from '@vatza/passguard';

const companyPolicy: PasswordPolicy = {
  minLength: 14,
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

export function PolicySignup() {
  const [password, setPassword] = useState('');

  return (
    <PasswordSecurityCard
      policy={companyPolicy}
      value={password}
      onChange={(val) => setPassword(val)}
    />
  );
}
```

### Policy Options Reference
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `minLength` | `number` | `12` | Minimum character length required (must be >= 1). |
| `maxLength` | `number` | `128` | Maximum character length allowed (must be >= minLength). |
| `requireUppercase` | `boolean` | `true` | Require at least one uppercase letter (A-Z). |
| `requireLowercase` | `boolean` | `true` | Require at least one lowercase letter (a-z). |
| `requireNumber` | `boolean` | `true` | Require at least one numeric digit (0-9). |
| `requireSymbol` | `boolean` | `true` | Require at least one special character (`!@#$%^&*`). |
| `preventRepeatedCharacters` | `boolean` | `true` | Flag consecutive repeated characters (`aaaa`). |
| `preventSequentialPatterns` | `boolean` | `true` | Flag sequential numbers or letters (`123`, `abc`). |
| `preventKeyboardPatterns` | `boolean` | `true` | Flag keyboard row patterns (`qwerty`, `asdf`). |
| `checkCommonPasswords` | `boolean` | `true` | Check input against common breach databases. |
| `preventReuse` | `boolean` | `true` | Check for local session password reuse. |

---

## 3. Controlled Component Usage

`PasswordSecurityCard` can be used as a fully controlled component:

```tsx
const [password, setPassword] = useState('');

<PasswordSecurityCard
  value={password}
  onChange={(val) => setPassword(val)}
/>
```

Or as an uncontrolled component with an internal state fallback:

```tsx
<PasswordSecurityCard
  onChange={(val) => console.log('Current password updated')}
/>
```

---

## 4. Form Integration & Submit Validation

To bind form submit buttons to PassGuard real-time security analysis output:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordAnalysis } from '@vatza/passguard';

export function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);

  // Require minimum security score of 50 to enable registration submit
  const isSubmitDisabled = !email || !analysis || analysis.score < 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    // Proceed with registration submit
    console.log('Registering user with verified secure password score:', analysis.score);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordSecurityCard
        value={password}
        onChange={(val) => setPassword(val)}
        onContinue={(analysisOutput) => {
          setAnalysis(analysisOutput || null);
        }}
      />

      <button type="submit" disabled={isSubmitDisabled}>
        Create Account
      </button>
    </form>
  );
}
```

---

## 5. Analysis Callback (`onContinue`) Usage

The `onContinue` prop receives the complete `PasswordAnalysis` payload calculated by PassGuard's 7 sub-engines:

```tsx
<PasswordSecurityCard
  onContinue={(analysis) => {
    if (!analysis) return;

    console.log('Score:', analysis.score); // 0 to 100
    console.log('Status:', analysis.status); // 'Weak' | 'Fair' | 'Strong' | 'Excellent'
    console.log('Entropy:', analysis.entropy); // bits of entropy
    console.log('Passed rules:', analysis.rules.filter(r => r.passed).length);
    console.log('Smart suggestion:', analysis.suggestion.title);
  }}
/>
```

---

## 6. Security & Privacy Standards

1. **Zero-Knowledge Architecture**: All entropy, rule, pattern, and common password evaluations occur **100% inside the browser memory**.
2. **No External Network Calls**: PassGuard does not transmit entered passwords to remote servers or third-party APIs.
3. **Zero Password Logging**: Passwords are never written to `console.log`, browser storage (`localStorage`/`sessionStorage`), or analytics tools.

---

## 7. Common Integration Mistakes

### ❌ Mistake 1: Importing Internal Sub-Engines Directly
```tsx
// INCORRECT - Do not import private sub-engines
import { RuleEngine, ScoreEngine } from '@vatza/passguard';
```
**Correct**:
```tsx
// CORRECT - Use public components, hooks, or analyzePassword
import { PasswordSecurityCard, usePasswordAnalysis, analyzePassword } from '@vatza/passguard';
```

### ❌ Mistake 2: Hardcoding Requirements in Component Logic
```tsx
// INCORRECT - Duplicating rule checks in React code
const isLongEnough = password.length >= 12;
```
**Correct**:
```tsx
// CORRECT - Pass a custom PasswordPolicy to PassGuard
const policy = { minLength: 12 };
<PasswordSecurityCard policy={policy} />
```

### ❌ Mistake 3: Invalid Policy Options
```tsx
// INCORRECT - Invalid minLength or maxLength
const badPolicy = { minLength: 0, maxLength: 5 }; // Throws validation error!
```
**Correct**:
```tsx
// CORRECT - Ensure minLength >= 1 and maxLength >= minLength
const goodPolicy = { minLength: 8, maxLength: 64 };
```
