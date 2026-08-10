# PassGuard Release Notes

## PassGuard v1.1.0 Minor Release

### WHAT CHANGED
PassGuard `v1.1.0` introduces a zero-config **Adaptive UI Engine** and **Container-Aware Responsive Density System**. Key enhancements include:
- **Adaptive CSS Token System**: Automatically inherits host application colors, background, borders, and typography using `--passguard-*` CSS tokens.
- **Container-Aware Responsive Density**: Dynamically adjusts visual density based on parent container width (`minimal` `<280px`, `compact` `280px–339px`, `standard` `340px–600px`, `detailed` `>600px`).
- **Progressive Requirement Disclosure**: Compact requirement summaries (`Requirements (X/Y met)   View details →`) with full ARIA accessibility semantics.
- **Interactive Developer Playground**: Built-in simulator in demo page allowing real-time host color, dark/light theme, and container width testing.
- **Embedded Micro-Header Adaptation**: Reduces header icon and description whitespace when embedded in narrow form sidebars (<280px).

### WHY IT MATTERS
Developers no longer need to write custom CSS or wrap PassGuard in fixed dark-mode containers. PassGuard fits natively into any host application's login or signup form out-of-the-box.

### HOW TO USE IT
Install `@vatza/passguard` and render `<PasswordSecurityCard />`. Theme adaptation and responsive density work automatically without requiring manual configuration:

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupForm() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto' }}>
      <PasswordSecurityCard
        value={password}
        onChange={(val) => setPassword(val)}
      />
    </div>
  );
}
```

### BACKWARD COMPATIBILITY
PassGuard `v1.1.0` is 100% backward compatible with `v1.0.1`. All existing React components, props, hooks, engine utilities, and policy options function identically.

### SECURITY BOUNDARY
PassGuard provides **client-side password security guidance**. It does NOT replace server-side password hashing (`Argon2id`/`bcrypt`), backend authentication, multi-factor authentication (MFA), IP rate limiting, or backend session security.

---

### Overview
PassGuard `v1.0.1` is a backward-compatible patch release addressing a stylesheet packaging issue in the npm release distribution.

### Fixed
- **Stylesheet Packaging**: Added missing `dist/style.css` asset into the published npm package tarball (`@vatza/passguard@1.0.1`).
- **Build Output**: Updated Vite entry point imports to ensure clean production builds generate and bundle `dist/style.css`.
- **Public Export**: Verified that external consumer imports via `import "@vatza/passguard/style.css"` resolve without error.

### Compatibility & Security
- **No Public API Changes**: Component interfaces, React hooks, and engine exports are 100% backward compatible with `v1.0.0`.
- **No Analysis/Security Logic Changes**: Zero modifications to zero-knowledge entropy calculations, pattern detection, rule validation, or crypto hashing.

---

## PassGuard v1.0.0 Initial Release

## Overview

PassGuard `v1.0.0` is the initial stable public release of the **PassGuard** React component library (`@vatza/passguard`). PassGuard provides real-time, zero-knowledge password security guidance for web applications.

All password evaluation algorithms—entropy calculations, rule checking, sequential/keyboard pattern detection, common-password matching, and password reuse checking—execute 100% locally within browser memory. PassGuard makes zero network requests and never stores or logs plaintext password credentials.

---

## Key Highlights

- **Zero-Knowledge Architecture**: 100% client-side memory evaluation with zero external API calls or network transmissions.
- **7 Pre-Styled Accessible UI Components**: `<PasswordSecurityCard />`, `<PasswordInput />`, `<PasswordHealthScore />`, `<PasswordStrengthIndicator />`, `<RequirementChecklist />`, `<SuggestionCard />`, and `<ReuseWarning />`.
- **3 React Hooks**: `usePasswordAnalysis`, `usePasswordAnalyzer`, and `usePasswordStrength` for custom headless integrations.
- **Configurable Policy Engine**: Easily configure min/max length, uppercase, lowercase, numbers, symbols, character repetition, sequential/keyboard pattern blocking, common password lookup, and local reuse prevention.
- **Local Password Reuse Detection**: Crypto-hashed SHA-256 local session password history via WebCrypto API (`window.crypto.subtle`).
- **WCAG 2.2 Level AA Compliance**: High-contrast elements, screen reader ARIA live region support (`aria-live="polite"`), visible keyboard focus rings, and reduced motion overrides.

---

## Developer Experience

### Installation (Planned Release Command)

Once published to the npm registry, install `@vatza/passguard` via:

```bash
npm install @vatza/passguard
```

### Basic Integration

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupForm() {
  const [password, setPassword] = useState('');

  return (
    <PasswordSecurityCard
      value={password}
      onChange={setPassword}
      onContinue={(analysis) => {
        console.log('Valid password ready for backend submission:', analysis?.score);
      }}
    />
  );
}
```

### Headless Hook Usage

```tsx
import { usePasswordAnalysis } from '@vatza/passguard';

function CustomPasswordMeter({ password }: { password: string }) {
  const { score, status, isValid, rules } = usePasswordAnalysis(password);

  return (
    <div>
      <p>Strength: {status} ({score}/100)</p>
      {rules.map((rule) => (
        <p key={rule.id}>{rule.passed ? '✓' : '✗'} {rule.label}</p>
      ))}
    </div>
  );
}
```

---

## Security Model & Boundaries

- **Zero Plaintext Logging**: Plaintext password strings reside temporarily in volatile component state and are never logged to `console`, saved to storage, or serialized.
- **Client Boundary**: PassGuard is a **frontend guidance tool**. It does NOT replace backend password hashing (`Argon2id`/`bcrypt`), server-side authentication, MFA, or backend rate limiting.
- **WebCrypto Requirement**: Local SHA-256 reuse hashing requires a **Secure Context** (`https://` or `localhost`). In insecure HTTP environments, PassGuard gracefully falls back to memory analysis.

---

## Accessibility (WCAG 2.2 AA)

- **Keyboard Control**: Full keyboard support (`Tab`, `Space`, `Enter`).
- **Screen Readers**: `aria-live="polite"` regions announce health score changes automatically.
- **Contrast & Motion**: 4.5:1 minimum text contrast ratio and `@media (prefers-reduced-motion: reduce)` animation overrides.
- **Automated Verification**: `7 / 7` `jest-axe` accessibility test suites pass with zero violations.

---

## Browser Support Matrix

- **Chrome**: 80+ (Desktop & Mobile)
- **Firefox**: 78+
- **Safari**: 14+ (macOS & iOS)
- **Edge**: 80+
- **Node.js**: 18+ (for SSR and headless testing)

---

## Testing Strategy & QA Coverage

- **Total Tests Passed**: **265 / 265 Tests (100% Pass Rate)**
- **Unit & Component Tests**: 240 Vitest scenarios testing sub-engines, hook reactivity, and component render states.
- **Playwright Cross-Browser Tests**: 25 E2E scenarios across Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), and Mobile Safari (iPhone 12).
- **TypeScript & Linting**: `0` errors (`tsc --noEmit`).

---

## Known Limitations

1. **Client-Side Storage Isolation**: Local password reuse detection uses client-side SHA-256 storage (`localStorage` or memory). It is isolated to the local browser instance and does not replace server-side credential history enforcement.
2. **Secure Context**: WebCrypto API SHA-256 hashing requires `https://` or `localhost`.
3. **Frontend Boundary**: Does not replace backend password hashing or server-side authentication.

---

## Release Verification Checklist

- [x] Package builds cleanly (`npm run build`).
- [x] Package content inspected (`npm pack --dry-run`).
- [x] Local consumer import test verified.
- [x] Documentation synchronized across README and `docs/`.
- [x] Zero secrets or sensitive data in repository.
