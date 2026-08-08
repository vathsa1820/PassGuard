# Changelog

All notable changes to **PassGuard** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- *(No unreleased changes currently pending release.)*

---

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
