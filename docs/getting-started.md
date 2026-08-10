# Getting Started with PassGuard

PassGuard is an open-source React component library and zero-knowledge security engine that provides real-time, interactive password strength guidance as users type.

PassGuard automatically adapts to your host application's theme colors, light/dark modes, font family, and container density without requiring complex theme configuration.

---

## 1. Quick Installation

Install `@vatza/passguard` via npm:

```bash
npm install @vatza/passguard
```

Import the pre-styled CSS stylesheet at your application root (e.g. `main.tsx` or `App.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

---

## 2. Automatic Mode (`<PasswordSecurityCard />`)

PassGuard automatically detects parent container background color, text color, and width to adjust theme tokens (`--passguard-*`) and information density (`compact`, `standard`, `detailed`).

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupPage() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto' }}>
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

## 3. Explicit Density Override (`density="compact"`)

You can explicitly control component density when rendering inside tight sidebars or embedded login modals:

```tsx
import React from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function CompactModalSignup() {
  return (
    <PasswordSecurityCard density="compact" />
  );
}
```

---

## 4. Container-Aware Density Thresholds

PassGuard measures its immediate DOM parent container width using `ResizeObserver`:

* **`minimal` (`<280px`)**: Single-row title header, compact padding (`p-2`), single-row requirement summary (`Requirements (X/Y met)`).
* **`compact` (`280px–339px`)**: Compact header, single-row requirement summary with `View details →` toggle.
* **`standard` (`340px–600px`)**: Icon header, standard requirement grid.
* **`detailed` (`>600px`)**: Full dashboard layout with uncollapsed requirement list.

---

## 5. Configuring Custom Security Policy

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

---

## 6. Security Boundaries

PassGuard performs password analysis **100% client-side in browser memory**. PassGuard does **not** replace:
- Server-side password hashing (`Argon2id`, `bcrypt`).
- Backend authentication & session security.
- IP rate-limiting & multi-factor authentication (MFA).

---

## 7. Next Steps

- **[Usage Guide](usage.md)**: Controlled components, signup form integration, and headless hooks.
- **[Configuration Guide](configuration.md)**: Full `PasswordPolicy` options.
- **[Component Reference](components.md)**: Props for all PassGuard components.
- **[Security Model](../SECURITY.md)**: Security boundaries and threat disclosures.
