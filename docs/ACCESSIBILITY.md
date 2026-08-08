# Accessibility (WCAG 2.2 AA) Guide

PassGuard is engineered to conform with **WCAG 2.2 Level AA** accessibility standards. This document details keyboard navigation, screen reader ARIA support, visual contrast specifications, reduced-motion behavior, and automated accessibility test coverage.

---

## 1. Keyboard Navigation

All interactive elements within PassGuard components support standard keyboard controls:

- **Tab Navigation**: Input fields, visibility toggle buttons, and action buttons receive visible focus outlines in sequential DOM tab order.
- **Space & Enter Activation**: The visibility toggle button (`PasswordInput`) can be focused via `Tab` and triggered using either `Space` or `Enter`.
- **Focus Rings**: Interactive controls render high-contrast focus rings (`outline-2 outline-blue-500`) to assist keyboard-only and low-vision users.

---

## 2. ARIA Semantics & Screen Reader Support

PassGuard UI components use explicit ARIA attributes to communicate state changes to assistive technologies:

- **Form Field Binding**: `PasswordInput` is explicitly associated with labels using `htmlFor` and `id` attributes (`id="passguard-input"`).
- **Password Visibility State**: Toggle buttons use dynamic `aria-label` attributes (`"Show password"` / `"Hide password"`) and update `aria-pressed` state.
- **Dynamic Status Updates**: Health scores, status badges, and suggestion messages use `aria-live="polite"` regions so screen readers announce score updates without interrupting active speech.
- **Decorative Elements**: Non-textual SVG icons use `aria-hidden="true"` to prevent redundant screen reader announcements.

---

## 3. Visual Contrast & Color Independence

- **Contrast Ratios**: Text elements, requirement checkmarks, and focus indicators maintain a minimum **4.5:1 contrast ratio** against slate background surfaces (`#0f172a`).
- **Non-Color Indicators**: Requirement items use distinct icons (checkmarks vs. warning octagons) alongside color changes (green vs. red) to ensure pass/fail status is identifiable for colorblind users.

---

## 4. Reduced-Motion Support

PassGuard respects user system preferences for reduced motion:

- Micro-animations (such as progress bar transitions and suggestion card entrances) include `@media (prefers-reduced-motion: reduce)` overrides.
- CSS transitions automatically disable or shift to instant fades when reduced motion is requested.

---

## 5. Automated Accessibility Testing (`jest-axe`)

PassGuard includes automated accessibility testing using `jest-axe`:

- Automated test suite (`tests/accessibility/axe-audit.test.tsx`) evaluates component DOM trees for missing labels, broken ARIA roles, invalid contrast ratios, and structural hierarchy violations.
- **Status**: `7 / 7 Accessibility Tests PASS` with zero violations.

For the full accessibility audit report, see [docs/ACCESSIBILITY.md](ACCESSIBILITY.md).

---

## 6. Next Steps

- **[Browser Support Guide](browser-support.md)**: Review browser matrix.
- **[Component Reference](components.md)**: Explore component props.
