# Getting Started with PassGuard

PassGuard is an open-source React component library and zero-knowledge security engine that provides real-time, interactive password strength guidance as users type.

This guide will help you install PassGuard, add your first `<PasswordSecurityCard />` component, configure custom security policies, and handle real-time password analysis callbacks.

---

## 1. What is PassGuard?

PassGuard helps web applications guide users toward creating resilient, strong, and unique passwords without relying on opaque post-submission validation errors.

All password evaluations occur **100% locally inside client browser memory**. PassGuard never transmits passwords or hashes to remote servers, makes zero HTTP requests, and stores no plaintext credentials.

---

## 2. Quick Installation

Install `@vatza/passguard` and its required peer dependencies:

```bash
npm install @vatza/passguard
```

Import the pre-styled CSS stylesheet at your application root (e.g. `main.tsx` or `App.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

For complete installation details and build requirements, see the [Installation Guide](installation.md).

---

## 3. Your First Component

To add real-time password security guidance to a React form, render the `<PasswordSecurityCard />` component:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupPage() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <PasswordSecurityCard
        value={password}
        onChange={(val) => setPassword(val)}
        onContinue={(analysis) => {
          if (analysis && analysis.isValid) {
            console.log('Valid password ready for submit! Score:', analysis.score);
          }
        }}
      />
    </div>
  );
}
```

---

## 4. Configuring a Custom Policy

PassGuard enforces default security rules (12-character minimum, uppercase, lowercase, numbers, symbols, pattern detection, common password check, and reuse warning). You can override these defaults by passing a custom `PasswordPolicy` object:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordPolicy } from '@vatza/passguard';

const enterprisePolicy: PasswordPolicy = {
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

export function EnterpriseSignup() {
  const [password, setPassword] = useState('');

  return (
    <PasswordSecurityCard
      policy={enterprisePolicy}
      value={password}
      onChange={setPassword}
    />
  );
}
```

For a complete reference of policy options, see the [Configuration Guide](configuration.md).

---

## 5. Next Steps

- **[Usage Guide](usage.md)**: Form submit validation, controlled patterns, and headless custom hooks.
- **[Configuration Guide](configuration.md)**: Full `PasswordPolicy` reference table and validation logic.
- **[Component Reference](components.md)**: Detailed props and usage for all 7 exported UI components.
- **[Public API Reference](api-reference.md)**: Full TypeScript signatures for hooks, functions, and types.
- **[Security Model](security.md)**: Zero-knowledge architecture, threat boundaries, and backend responsibilities.
