# PassGuard Next.js Integration Demo

A minimal integration example showing how to embed `@vatza/passguard` into a Next.js (App Router) application.

## 1. What This Example Demonstrates
- Using PassGuard React components inside Next.js App Router client components (`'use client';`).
- Passing a custom `PasswordPolicy` configuration.
- Client-side rendering boundary handling for real-time password security analysis.

## 2. How to Run It
From the project root directory:

```bash
# Run dev server for Next.js demo
npm run dev --workspace=examples/next-demo
```

Or navigate to this directory and run:

```bash
cd examples/next-demo
npm install
npm run dev
```

Open `http://localhost:3000` to test the Next.js page.

## 3. How PassGuard is Imported
Because Next.js defaults to Server Components in the `app/` directory, PassGuard components should be rendered inside a Client Component marked with `'use client';`:

```tsx
'use client';

import {
  PasswordSecurityCard,
  type PasswordPolicy,
  type PasswordAnalysis,
} from '@vatza/passguard';
```

## 4. How the Policy is Configured
Define a custom policy configuration at module scope or component scope:

```tsx
const nextAppPolicy: PasswordPolicy = {
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
Pass state handlers and policy props to `<PasswordSecurityCard />`:

```tsx
<PasswordSecurityCard
  policy={nextAppPolicy}
  value={password}
  onChange={(val) => setPassword(val)}
  onContinue={(analysis) => setAnalysis(analysis || null)}
/>
```
