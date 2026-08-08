# @vatza/passguard

> **Zero-knowledge, real-time password security guidance component library for React & TypeScript.**

PassGuard is an open-source React component library designed to help users create strong, resilient, and non-reused passwords with immediate visual feedback while typing.

---

## Features

- 🔒 **Zero-Knowledge Architecture**: All password analysis occurs 100% locally in browser memory. No network calls, no analytics logging, and zero external APIs.
- ⚡ **Real-Time Keystroke Intelligence**: Live strength scoring (0–100), entropy calculation, pattern recognition, common password detection, and reuse warnings.
- ⚙️ **Configurable Password Policies**: Easily enforce custom rules (`minLength`, casing, symbols, pattern prevention) via a clean TypeScript configuration object.
- 🎨 **Modern Accessible UI**: Pre-styled, accessible, dark-themed UI components matching modern SaaS standards.
- 📦 **Tree-Shaking & ESM Support**: Dual ESM/CommonJS distribution with complete TypeScript definitions out of the box.

---

## Installation

```bash
npm install @vatza/passguard
# or
pnpm add @vatza/passguard
# or
yarn add @vatza/passguard
```

### Import Stylesheet

Import the PassGuard stylesheet in your application root (e.g. `App.tsx` or `_app.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

---

## Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupForm() {
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-md mx-auto p-4">
      <PasswordSecurityCard
        value={password}
        onChange={(val) => setPassword(val)}
        onContinue={(analysis) => console.log('Passed with score:', analysis.score)}
      />
    </div>
  );
}
```

---

## Custom Policy Configuration

PassGuard allows developers to inject a custom `PasswordPolicy` to enforce organization-specific security standards:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard, type PasswordPolicy } from '@vatza/passguard';

const enterprisePolicy: PasswordPolicy = {
  minLength: 14,
  maxLength: 64,
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

export function SecureSignup() {
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

## Public API Reference

### Exported UI Components

| Component | Description |
| :--- | :--- |
| `PasswordSecurityCard` | Primary full-featured card integrating input, score, rules, suggestions, and reuse warning. |
| `PasswordInput` | Accessible password input with visibility toggle icon and `autoComplete="new-password"` defaults. |
| `PasswordHealthScore` | Visual score progress bar and status badge (`Weak`, `Fair`, `Strong`, `Excellent`). |
| `RequirementChecklist` | Rule checklist rendering real-time pass/fail states for active policy constraints. |
| `SuggestionCard` | Smart actionable advice card guiding users to improve password entropy. |
| `ReuseWarning` | Alert warning users if a password hash matches previously used credentials. |

### Exported Hooks & Utilities

- `usePasswordAnalysis(password, policy)`: React hook returning real-time `PasswordAnalysis` output.
- `analyzePassword(password, policy)`: Asynchronous evaluation function for programmatic analysis.
- `resolvePasswordPolicy(customPolicy)`: Validates and merges custom options with default policy.

---

## PasswordPolicy Configuration Table

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `minLength` | `number` | `12` | Minimum required password length. |
| `maxLength` | `number` | `128` | Maximum allowed password length. |
| `requireUppercase` | `boolean` | `true` | Enforces uppercase character presence (`A-Z`). |
| `requireLowercase` | `boolean` | `true` | Enforces lowercase character presence (`a-z`). |
| `requireNumber` | `boolean` | `true` | Enforces numeric character presence (`0-9`). |
| `requireSymbol` | `boolean` | `true` | Enforces special symbol presence (`!@#$%^&*`). |
| `preventRepeatedCharacters` | `boolean` | `true` | Flags 4+ consecutive identical characters (e.g. `aaaa`). |
| `preventSequentialPatterns` | `boolean` | `true` | Flags sequential numbers (`123`) or letters (`abc`). |
| `preventKeyboardPatterns` | `boolean` | `true` | Flags row sequences (`qwerty`, `asdf`). |
| `checkCommonPasswords` | `boolean` | `true` | Checks against top compromised dictionary passwords. |
| `preventReuse` | `boolean` | `true` | Checks SHA-256 hash against session password history. |

---

## Security & Zero-Knowledge Guarantee

PassGuard processes passwords **exclusively in local browser memory**.
- 🚫 Zero network transmission (`fetch`, `axios`, `WebSocket` calls).
- 🚫 Zero plaintext password logging to browser storage or console.
- 🚫 Zero third-party tracker or analytics integration.

*Note: PassGuard provides client-side password creation guidance. Production applications must still hash passwords server-side (using `Argon2id` or `bcrypt`) prior to persistent storage.*

---

## Browser Support

Works in all modern browsers supporting ES2020+ and Web Crypto API:
- Chrome / Edge 80+
- Firefox 78+
- Safari 14+
- Node.js 18+ (for SSR / headless testing)

---

## License

MIT © PassGuard
