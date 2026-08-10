# PassGuard

Real-time, adaptive password security guidance for React.

[![npm version](https://img.shields.io/npm/v/@vatza/passguard.svg)](https://www.npmjs.com/package/@vatza/passguard)
[![GitHub release](https://img.shields.io/github/v/release/vathsa1820/PassGuard.svg)](https://github.com/vathsa1820/PassGuard/releases)
[![CI Workflow](https://github.com/vathsa1820/PassGuard/actions/workflows/ci.yml/badge.svg)](https://github.com/vathsa1820/PassGuard/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-249%20passed-success.svg)](https://github.com/vathsa1820/PassGuard)

---

[ **Live Demo** ](https://pass-guard-react-demo.vercel.app/) &nbsp;|&nbsp; [ **npm** ](https://www.npmjs.com/package/@vatza/passguard) &nbsp;|&nbsp; [ **GitHub** ](https://github.com/vathsa1820/PassGuard)

---

## Value Proposition

### What PassGuard Is
PassGuard is an open-source React component library and client-side password analysis engine designed for modern web applications.

### Adaptive UI Experience
PassGuard automatically adapts to your existing host application's UI:
- **Zero-Config Theme Adaptation**: Dynamically inspects parent background, foreground, border-radius, and font-family via `--passguard-*` CSS tokens.
- **Container-Aware Responsive Density**: Automatically switches density based on parent container width (`minimal` `<280px`, `compact` `280px–339px`, `standard` `340px–600px`, `detailed` `>600px`).
- **Progressive Disclosure**: Compact requirement summaries (`Requirements (X/Y met)   View details →`) prevent vertical layout bloat in login & signup forms.

### Why Client-Side Password Guidance Is Useful
- **Immediate Feedback**: Users receive real-time updates as they type, helping them build strong passwords faster.
- **Privacy & Safety**: Passwords are analyzed entirely within browser memory; raw passwords are never sent over the network to external validation services.
- **Reduced Friction**: Live requirement indicators prevent post-submission form rejection.

---

## Quick Start

### 1. Installation

Install `@vatza/passguard` via npm:

```bash
npm install @vatza/passguard
```

### 2. Import CSS Styles

Import the component stylesheet in your entry file (`App.tsx` or `main.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

### 3. Usage Examples

#### Automatic Zero-Config Mode (`PasswordSecurityCard`)

PassGuard automatically inherits your application's colors, background, and container density:

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
        onContinue={(analysis) => {
          console.log('Password score:', analysis?.score);
        }}
      />
    </div>
  );
}
```

#### Explicit Density Control (`density="compact"`)

For tight form sidebars or embedded login modals, force compact density explicitly:

```tsx
import React from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function EmbeddedSignup() {
  return (
    <PasswordSecurityCard density="compact" />
  );
}
```

#### Custom Headless Hook (`usePasswordAnalyzer`)

```tsx
import React from 'react';
import { usePasswordAnalyzer, PasswordInput, RequirementChecklist } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function CustomSignup() {
  const { password, setPassword, analysis } = usePasswordAnalyzer();

  const rules = analysis.rules.map((r) => ({
    label: r.label,
    completed: r.passed,
  }));

  return (
    <div className="space-y-4">
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create password..."
      />
      <div>Score: {analysis.score} / 100 ({analysis.status})</div>
      <RequirementChecklist rules={rules} />
    </div>
  );
}
```

---

## Features

- **Adaptive Theme Engine**: Automatically adapts to host colors (`#7C3AED`, `#00D4FF`, `#123456`), light/dark modes, and CSS variables.
- **Container-Aware Responsive Density**: Automatically adjusts layout for containers from `240px` up to `1000px+`.
- **Progressive Requirement Disclosure**: Accessible collapsible checklist (`aria-expanded`, `aria-controls`) for compact forms.
- **Real-time password analysis**: Instant key-by-keystroke feedback without latency or network overhead.
- **Password strength scoring**: Multi-factor 0–100 numerical score categorized into clear status tiers (`Weak`, `Fair`, `Strong`, `Excellent`).
- **Pattern detection**: Detection of repeated characters (`aaaa`), sequential character runs (`1234`), and keyboard spatial patterns (`qwerty`).
- **Common-password detection**: In-memory lookup against common breached password lists.
- **Password reuse warning**: Session-scoped SHA-256 hash comparison using WebCrypto API.
- **Accessibility & Reduced Motion**: Full keyboard focus rings, WCAG contrast compliance, screen reader support, and `prefers-reduced-motion` safety.

---

## Architecture

PassGuard decouples input analysis from visual rendering using a client-side execution pipeline:

```
React Application
       ↓
@vatza/passguard
       ↓
Local Password Analysis
       ↓
PasswordAnalysis
       ↓
UI Components
```

Password evaluation occurs entirely client-side inside local browser memory. Raw passwords are never transmitted across the network, logged to storage, or sent to external servers.

---

## Security & Operational Boundaries

PassGuard is designed specifically to provide **client-side password security guidance**.

### Operational Boundary

PassGuard **does NOT replace**:
- **Server-side password hashing**: Passwords must be hashed on the server using secure algorithms (such as `Argon2id` or `bcrypt`).
- **Backend authentication**: Client-side analysis does not handle identity verification or login state.
- **MFA / 2FA**: Multi-factor authentication remains essential for user account security.
- **Rate limiting**: Server endpoints must retain IP rate-limiting and brute-force protection.
- **Session security**: Backend session management, token handling, and storage security remain server responsibilities.

For full details, read our [SECURITY.md](SECURITY.md).

---

## Public Components & Hooks

| Component / Hook | Type | Purpose |
| :--- | :--- | :--- |
| `PasswordSecurityCard` | Component | All-in-one adaptive card component with container density awareness (`auto`, `compact`, `standard`, `detailed`). |
| `PasswordInput` | Component | Accessible password input field with visibility toggle and security styling. |
| `PasswordHealthScore` | Component | Visual indicator showing numerical strength score (0–100) and status badge. |
| `PasswordStrengthIndicator` | Component | Progress bar visualizing password strength levels. |
| `RequirementChecklist` | Component | Interactive checklist rendering pass/fail states with summary count and progressive disclosure toggle. |
| `SuggestionCard` | Component | Guidance card providing actionable advice to improve password quality. |
| `ReuseWarning` | Component | Alert banner flagging passwords previously entered in the current local session. |
| `usePasswordAnalyzer` | Hook | Headless React hook providing input state management and real-time analysis output. |

---

## Documentation Links

- [Getting Started](docs/getting-started.md)
- [Installation](docs/installation.md)
- [Usage](docs/usage.md)
- [Configuration](docs/configuration.md)
- [API Reference](docs/api-reference.md)
- [Components](docs/components.md)
- [Security](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Release Notes](docs/RELEASE-NOTES.md)

---

## License

This project is licensed under the [MIT License](LICENSE).
