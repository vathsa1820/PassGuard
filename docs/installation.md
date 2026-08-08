# Installation & Setup Guide

This document covers package installation, peer dependencies, stylesheet setup, framework integration, and browser environment requirements for `@vatza/passguard`.

---

## 1. Package Installation

Install `@vatza/passguard` via your package manager of choice:

```bash
# npm
npm install @vatza/passguard

# pnpm
pnpm add @vatza/passguard

# yarn
yarn add @vatza/passguard
```

---

## 2. Peer Dependencies

PassGuard requires **React** and **React DOM** version `18.0.0` or higher (including React `19.x` compatibility):

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

If your project does not already have React installed, add it alongside PassGuard:

```bash
npm install react react-dom @vatza/passguard
```

---

## 3. Stylesheet Requirements

PassGuard UI components rely on bundled CSS for glassmorphism styling, layout structure, color tokens, and micro-animations.

Import `@vatza/passguard/style.css` in your application root:

### React / Vite (`src/main.tsx` or `src/App.tsx`)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@vatza/passguard/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Next.js (App Router: `src/app/layout.tsx`)

```tsx
import '@vatza/passguard/style.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. Next.js & Server Components (RSC) Notice

PassGuard UI components and hooks interact with browser state (`useState`, `useEffect`) and WebCrypto APIs (`window.crypto.subtle`). When using Next.js App Router, ensure files importing PassGuard components include the `'use client'` directive:

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

## 5. Browser Environment Requirements

PassGuard executes zero-knowledge password evaluations locally in browser memory. The environment must support:

- **ECMAScript 2020+ (ES11)** syntax support.
- **Web Crypto API** (`window.crypto.subtle`) for SHA-256 cryptographic hashing in local password reuse detection.
- **HTTPS Context**: Browser Web Crypto APIs require a Secure Context (`https://` or `http://localhost`).

For complete compatibility details, see the [Browser Support Guide](browser-support.md).

---

## 6. Next Steps

- **[Getting Started](getting-started.md)**: Add your first component.
- **[Usage Guide](usage.md)**: Explore signup forms and controlled state patterns.
- **[Troubleshooting Guide](troubleshooting.md)**: Resolve common import or CSS issues.
