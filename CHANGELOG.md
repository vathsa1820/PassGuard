# Changelog

All notable changes to **PassGuard** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.1.2] - 2026-08-11

### Changed
- **Compact Password UX Architecture**: Exported compact password security card experience with progressive disclosure requirement checklist collapsed by default (`aria-expanded="false"`, `aria-controls`).
- **Inline Status Row**: Integrated thin 4px strength bar directly below password input with inline status (`✓ Strong · 84%`) aligned horizontally with interactive `Show details →` toggle button.
- **Form-First Alignment**: Optimized container density and host alignment for modern signup/login forms without dashboard clutter or excessive vertical whitespace.

### Security & Compatibility
- **Zero Engine Changes**: No engine or security calculation logic was altered (`client/src/engine/**` remains 100% untouched).
- **Zero Breaking API Changes**: All React components, props, hooks, types, and adaptive CSS variable APIs remain 100% backward compatible.

---

## [1.1.1] - 2026-08-11

### Fixed
- **External Consumer CSS Packaging**: Configured Tailwind CSS / PostCSS build pipeline to ensure compiled component utility styles (`flex`, `grid`, `space-y-*`, `gap-*`, `p-*`, `rounded-*`, `border`, `bg-*`, `text-*`, etc.) are processed and included directly in `dist/style.css` (increasing stylesheet size from 1.89 kB to 35.73 kB).
- **Host Styling Isolation**: Set `preflight: false` in Tailwind configuration and introduced scoped `[data-passguard]` element resets for lists (`ul`/`ol`), inputs, buttons, and headings, guaranteeing zero style pollution of third-party host applications.
- **Removed Unscoped Body Styling**: Removed global `body` selector from `theme.css` to preserve external consumer global layout defaults.

### Security & Compatibility
- **Zero Engine Changes**: No engine or security calculation logic was altered (`client/src/engine/**` remains 100% untouched).
- **Zero Breaking API Changes**: All React components, props, hooks, types, and adaptive CSS variable APIs remain 100% backward compatible.

---

## [1.1.0] - 2026-08-10

### Added
- **Adaptive Theme Engine**: Automatically adapts UI colors, background, borders, and typography to host application styling using `--passguard-*` CSS tokens.
- **Container-Aware Responsive Density**: Automatically adjusts visual layout density (`minimal` <280px, `compact` 280-339px, `standard` 340-600px, `detailed` >600px) based on parent DOM container width.
- **Progressive Requirement Disclosure**: Collapsible requirement summary (`Requirements (X/Y met)   View details →`) with full ARIA accessibility semantics.
- **Interactive Developer Playground**: Built-in simulator in demo page allowing developers to test host colors, light/dark modes, container widths, and password scenarios in real time.
- **Enhanced Micro-Adapting Headers**: Compact and minimal header layouts that eliminate icon box whitespace when embedded in narrow form sidebars (<280px).
- **Reduced Motion Support**: Automated compliance with `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.

### Security & Compatibility
- **Zero Engine Changes**: No security-engine behavior was changed (entropy, pattern engines, rule checks, common password lookups, SHA-256 reuse hashing remain 100% untouched).
- **Zero Breaking API Changes**: All public React components, props, hooks, and types remain 100% backward compatible.

## [1.0.1] - 2026-08-08

### Fixed
- **Stylesheet Packaging**: Resolved issue where `dist/style.css` was missing from the published `@vatza/passguard` npm tarball.
- **Build Asset Emitting**: Modified Vite build entry graph to ensure `dist/style.css` is generated during clean production builds.
- **Stylesheet Export**: Verified public stylesheet export `@vatza/passguard/style.css` resolves cleanly in external applications.

### Security & Compatibility
- **No API Changes**: Public React component and engine API remain 100% backward compatible.
- **No Logic Changes**: Zero changes to local zero-knowledge password analysis, entropy calculations, or security boundaries.

---

## [1.0.0] - 2026-08-08

### Added
- **Zero-Knowledge Password Security Engine**: High-performance real-time analysis engine computing entropy, checking rule policies, detecting sequential/keyboard patterns, verifying common passwords, and evaluating local password reuse.
- **Accessible UI Components**:
  - `<PasswordSecurityCard />` — Full-featured container component.
  - `<PasswordInput />` — Accessible password input with visibility toggle.
  - `<PasswordHealthScore />` — Visual score badge and aria-live announcements.
  - `<PasswordStrengthIndicator />` — Multi-segment strength progress bar.
  - `<RequirementChecklist />` — Real-time rule pass/fail checkmarks.
  - `<SuggestionCard />` — Contextual password strength guidance.
  - `<ReuseWarning />` — Local WebCrypto SHA-256 password reuse warning badge.
- **React Hooks**:
  - `usePasswordAnalysis` — Reactive single-password analysis hook.
  - `usePasswordAnalyzer` — Managed state and control hook for password inputs.
  - `usePasswordStrength` — Lightweight strength and entropy hook.
- **Core Utility API**: `analyzePassword`, `resolvePasswordPolicy`, `validatePasswordPolicy`.
- **CSS Styling**: Pre-styled vanilla CSS stylesheet (`@vatza/passguard/style.css`).
- **Accessibility**: Full WCAG 2.2 AA compliance, keyboard navigation, high contrast elements, and `jest-axe` test suite passing.
- **Cross-Browser Verification**: E2E test suite covering Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari.
