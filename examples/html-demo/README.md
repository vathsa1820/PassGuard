# PassGuard HTML / Traditional Web Page Integration

Demonstrating traditional web page embedding and documenting PassGuard distribution boundaries.

## 1. What This Example Demonstrates
- Traditional web page embedding architecture.
- Documenting current React/bundler distribution boundaries vs future UMD/CDN script bundle roadmap.

## 2. How to Open It
Double-click `index.html` or serve with any static web server (such as `npx serve .` or VS Code Live Server).

## 3. Architecture & Import Limitation Notice
> **Current Architectural Limitation**: PassGuard is currently packaged as an open-source React component library (`@vatza/passguard`) requiring React 18+ and a modern JavaScript bundler (Vite, Next.js, Webpack).
> 
> A standalone UMD/CDN bundle (e.g. `<script src="https://cdn.passguard.io/passguard.min.js">`) is under active development for non-React websites.

## 4. How PassGuard is Imported (in React/Bundler Environments)
In React environments:

```tsx
import { PasswordSecurityCard } from '@vatza/passguard';
```

## 5. How Policy is Configured
Policy configuration object passed via props:

```tsx
const policy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  preventReuse: true,
};
```

## 6. Communication with Surrounding Forms
Communicates via standard React `onChange` and `onContinue` callbacks:

```tsx
<PasswordSecurityCard
  policy={policy}
  onChange={(val) => handlePasswordChange(val)}
  onContinue={(analysis) => handleAnalysis(analysis)}
/>
```
