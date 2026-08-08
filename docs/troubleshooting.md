# Troubleshooting & FAQ

This document addresses common integration problems, build warnings, stylesheet issues, and browser environment limitations.

---

## 1. Stylesheet / Component Styling Missing

### Problem
Components render with unstyled default HTML elements or broken layouts.

### Cause
The pre-styled PassGuard CSS file (`@vatza/passguard/style.css`) was not imported into the application bundle.

### Solution
Import the CSS file at your application root (e.g. `main.tsx`, `App.tsx`, or Next.js `layout.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

---

## 2. Next.js SSR / Hydration Error (`window is not defined`)

### Problem
Next.js throws `ReferenceError: window is not defined` or hydration mismatch warnings during server-side rendering.

### Cause
PassGuard UI components interact with DOM state and WebCrypto APIs (`window.crypto`).

### Solution
Add the `'use client'` directive to the top of any React file that imports and renders PassGuard components:

```tsx
'use client';

import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';

export function SignupForm() {
  const [password, setPassword] = useState('');
  return <PasswordSecurityCard value={password} onChange={setPassword} />;
}
```

---

## 3. WebCrypto / Hashing Unavailable Warning

### Problem
Console logs show warnings regarding SHA-256 reuse detection fallback: `WebCrypto subtle digest is unavailable`.

### Cause
The application is running over an insecure HTTP connection (`http://domain.com`). Modern browsers disable `window.crypto.subtle` outside of Secure Contexts (`https://` or `localhost`).

### Solution
Serve your application over HTTPS using TLS certificates (or test locally on `http://localhost`). PassGuard will operate normally and fallback to in-memory analysis if WebCrypto is unavailable.

---

## 4. Policy Validation Error (`minLength must be >= 1`)

### Problem
PassGuard emits console warnings and reverts to `defaultPasswordPolicy`.

### Cause
A custom `PasswordPolicy` object contains invalid or conflicting bounds (e.g., `minLength: 0` or `maxLength < minLength`).

### Solution
Ensure custom policy objects specify `minLength >= 1` and `maxLength >= minLength`:

```ts
// CORRECT
const policy = {
  minLength: 12,
  maxLength: 128,
};
```

---

## 5. Peer Dependency Warnings (`React 18 / 19`)

### Problem
Package manager warns about peer dependencies during `npm install`.

### Cause
Your application uses an older version of React (< 18.0.0).

### Solution
Upgrade React and React DOM to version `18.x` or `19.x`:

```bash
npm install react@^18.2.0 react-dom@^18.2.0
```

---

## 6. Next Steps

- **[Installation Guide](installation.md)**: Review setup requirements.
- **[Public API Reference](api-reference.md)**: Check function and prop types.
