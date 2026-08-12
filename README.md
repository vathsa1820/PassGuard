# PassGuard

> Zero-knowledge real-time password security guidance for React applications.

[![npm version](https://img.shields.io/npm/v/@vatza/passguard.svg)](https://www.npmjs.com/package/@vatza/passguard)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![CI Workflow](https://github.com/vathsa1820/PassGuard/actions/workflows/ci.yml/badge.svg)](https://github.com/vathsa1820/PassGuard/actions/workflows/ci.yml)

PassGuard is a React component library that provides real-time password security feedback directly inside forms.

### Core Positioning

- Client-side password analysis
- Zero-knowledge architecture
- No plaintext password transmission
- Adaptive UI
- Container-aware density
- Progressive disclosure
- Accessible React components
- Self-contained CSS package

---

## ✨ Features

PassGuard decouples its core security engine from its visual presentation layer to deliver instant feedback with zero network latency.

- **Real-Time Password Strength Analysis**: Dynamic evaluation of password quality as users type.
- **Password Policy Validation**: Configurable rules for length, character sets, and complexity.
- **Entropy Calculation**: Mathematical entropy measurement in bits.
- **Pattern Detection**: Identification of sequential patterns (`1234`), repeated characters (`aaaa`), and spatial keyboard patterns (`qwerty`).
- **Common-Password Detection**: Instant client-side lookup against common breached password lists.
- **Password Reuse Detection**: Session-scoped history matching using local WebCrypto SHA-256 hashing.
- **Password Health Score**: 0–100 numerical security score paired with clear status indicators.
- **Requirement Checklist**: Real-time pass/fail feedback for individual policy rules.
- **Compact Progressive Disclosure UI**: Collapsed requirements by default to preserve vertical form space.
- **Adaptive Themes**: Inherits host application colors, light/dark modes, and CSS variables.
- **Container-Aware Responsive Density**: Automatically adjusts visual density based on parent container width.
- **Host Font Inheritance**: Adopts host application font families naturally.
- **Accessibility Semantics**: Built with ARIA live regions, focus management, and keyboard accessibility.
- **Zero External Network Requests**: All analysis executes locally in browser memory during evaluation.
- **Self-Contained Production CSS**: Includes pre-compiled utility styles without external CSS build requirements.

---

## 📦 Installation

```bash
npm install @vatza/passguard
```

Import the required CSS stylesheet in your entry file (`App.tsx` or `main.tsx`):

```tsx
import '@vatza/passguard/style.css';
```

### Usage Example

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';
import '@vatza/passguard/style.css';

export function SignupForm() {
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <PasswordSecurityCard
        value={password}
        onChange={(val) => setPassword(val)}
        onContinue={(analysis) => {
          console.log('Password score:', analysis?.score);
        }}
      />
    </form>
  );
}
```

---

## 🎨 Compact Password UX

PassGuard v1.1.2 features a compact, password-first layout designed to fit cleanly inside signup and login forms:

```text
Password
[ password input                         👁 ]

[ 4px strength indicator ]

✓ Strong · 84%                 Show details →
```

The requirement checklist remains collapsed by default and expands only when requested by the user (`Show details →`).

Key UX elements:
- **40px Input Field**: Standard, ergonomic height matching modern design systems.
- **Integrated Visibility Control**: Built-in toggle to reveal or hide password text.
- **Thin 4px Strength Indicator**: Non-intrusive progress bar positioned directly below the input.
- **Compact Status Row**: High-contrast score and status display in a single inline line.
- **Progressive Disclosure**: Keeps forms compact until the user seeks detailed feedback.
- **Clean Typography**: Refined spacing and legible font weights.
- **Container-Aware Density**: Micro-adjusts padding and font sizes dynamically.

---

## 🧩 Components & Hooks

### UI Components

| Component | Description |
|---|---|
| `PasswordSecurityCard` | All-in-one adaptive password card with automatic container density awareness. |
| `PasswordInput` | Accessible password input field with visibility toggle and security styling. |
| `PasswordHealthScore` | Compact score readout (0–100) and status badge (`Weak`, `Fair`, `Strong`, `Excellent`). |
| `PasswordStrengthIndicator` | Thin progress bar visualizing numerical password strength. |
| `RequirementChecklist` | Interactive checklist rendering requirement status with collapsible progressive disclosure. |
| `SuggestionCard` | Guidance banner providing actionable tips to improve password strength. |
| `ReuseWarning` | Alert banner flagging passwords previously entered in the local session. |

### React Hooks

| Hook | Description |
|---|---|
| `usePasswordAnalysis` | React hook providing real-time evaluation outputs for a given password string. |
| `usePasswordAnalyzer` | Headless state management hook combining input handling and analysis output. |
| `usePasswordStrength` | Lightweight hook returning numerical score and qualitative status. |
| `useAdaptiveTheme` | Dynamic hook detecting parent container dimensions, host colors, and dark/light mode. |

---

## 🔐 Security & Privacy

PassGuard is designed with a strict zero-knowledge privacy model:

- **Local Browser Analysis**: All password analysis occurs locally in browser memory.
- **No PassGuard Server**: PassGuard does not transmit passwords or telemetry to external servers.
- **Zero External Network Requests**: No external API calls are made during password evaluation.
- **No Plaintext Storage**: Plaintext passwords are not intentionally persisted in `localStorage` or `sessionStorage`.
- **Local WebCrypto SHA-256 Hashing**: Password reuse detection hashes entries using browser WebCrypto APIs (`window.crypto.subtle`) locally.
- **UI & Security Guidance Boundary**: PassGuard is a UI and security-guidance library and is **NOT** a replacement for server-side authentication controls.
- **Server Responsibilities**: Applications must still hash passwords securely on the server (e.g., Argon2id/bcrypt) and transmit data over HTTPS.
- **Breach Database Limit**: PassGuard does not guarantee that a password has never appeared in every breach database.

---

## 🎨 Adaptive UI

PassGuard automatically inherits visual styles from its parent container:

- **Host Theme Inheritance**: Inherits parent background and text colors via custom CSS variables (`--passguard-*`).
- **CSS Variables**: Easy override support for background, surface, accent, and focus ring colors.
- **Light & Dark Themes**: Automatic luminance detection adapts text contrast seamlessly.
- **Accent Customization**: Matches application brand primary colors automatically.
- **Container-Aware Responsive Density**: Automatically selects visual density based on parent container width.
- **Density Modes**: Minimal, Compact, Standard, and Detailed layouts.

| Container Width | Density |
|---|---|
| `<280px` | Minimal |
| `280–339px` | Compact |
| `340–600px` | Standard |
| `>600px` | Detailed |

---

## ♿ Accessibility

PassGuard prioritizes accessible user experiences:

- **Keyboard Navigation**: Complete keyboard focus support across all inputs and interactive buttons.
- **Visible Focus States**: High-contrast focus rings for interactive elements.
- **ARIA Semantics**: `aria-expanded` and `aria-controls` on disclosure controls.
- **Live Announcements**: `aria-live` region updates score changes for screen readers.
- **Progress Semantics**: Standard `role="progressbar"` attributes on strength meters.
- **Automated Validation**: Verified via automated `axe-core` accessibility audit suites.

*Note: PassGuard is engineered following accessibility best practices, but does not claim formal WCAG certification.*

---

## 🧪 Testing & Quality Assurance

PassGuard v1.1.2 release verification results:

- **35 test files** passed
- **249 tests** passing
- Security audit passing
- TypeScript/lint passing
- Production build passing
- npm package dry-run passing

---

## 🌐 Live Demo

Try PassGuard in your browser:

[**https://pass-guard-six.vercel.app/**](https://pass-guard-six.vercel.app/)

Interactive public demo showing PassGuard integrated into a realistic signup form.

---

## 📦 Package Information

- **npm**: [`@vatza/passguard`](https://www.npmjs.com/package/@vatza/passguard)
- **Current Version**: `@vatza/passguard@1.1.2`

---

## 👨‍💻 Developer

**Shrivathsa T**<br />
GitHub: [@vathsa1820](https://github.com/vathsa1820)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🗺️ Roadmap

Future planned directions:
- Additional framework integration examples (Vue, Svelte, Next.js)
- Expanded theme customization presets
- Additional password policy presets
- Richer developer diagnostics and telemetry hooks
- Improved developer documentation and guides

*Note: The roadmap items above represent future ideas and are not currently implemented features.*

---

## ⭐ Why PassGuard?

Traditional password fields provide weak feedback while large password-security dashboards disrupt form UX. PassGuard aims to put security guidance directly beside the password field while remaining compact, adaptive, accessible, and privacy-preserving.

---

Built with React, TypeScript, Vite and Tailwind CSS.

Developer: Shrivathsa T<br />
GitHub: @vathsa1820
