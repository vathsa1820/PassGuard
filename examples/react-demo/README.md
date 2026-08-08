# PassGuard React Integration Demo

A realistic signup form demonstrating how to integrate the `@vatza/passguard` library into a React single-page application.

## 1. What This Example Demonstrates
- Full integration of `<PasswordSecurityCard />` inside a multi-field signup form (Name, Email, Password, Confirm Password).
- Custom security policy configuration via `PasswordPolicy`.
- Real-time password analysis, strength score feedback, requirement checking, and smart suggestions.
- Form validation bound to real-time security scores and confirm-password matching.
- Mock zero-knowledge account creation handling.

## 2. How to Run It
From the project root directory:

```bash
# Run dev server for the React demo
npm run dev --workspace=examples/react-demo
```

Or navigate to this directory and run:

```bash
cd examples/react-demo
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to test live password security evaluations.

## 3. How PassGuard is Imported
Import PassGuard UI components and types directly from the public API entrypoint:

```tsx
import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '@vatza/passguard';
```

## 4. How the Policy is Configured
Define a custom `PasswordPolicy` object to enforce enterprise password requirements without modifying the core analyzer:

```tsx
const customSignupPolicy: PasswordPolicy = {
  minLength: 12,
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
```

## 5. How the Component Communicates with the Surrounding Form
Pass the `policy`, controlled `value`, `onChange` handler, and optional `onContinue` analysis callback to `<PasswordSecurityCard />`:

```tsx
<PasswordSecurityCard
  policy={customSignupPolicy}
  value={password}
  onChange={(val) => setPassword(val)}
  onContinue={(analysis) => {
    // Receive real-time analysis scores to validate form state
    setLatestAnalysis(analysis || null);
  }}
/>
```
