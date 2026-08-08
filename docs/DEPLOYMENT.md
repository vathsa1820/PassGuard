# PassGuard React Live Demo Vercel Deployment Guide

This document outlines the step-by-step manual procedure for deploying the **PassGuard v1.0.1 Public Live Demo** (`examples/react-demo`) to [Vercel](https://vercel.com).

---

## 1. Architecture & Deployment Overview

- **Project Location**: `examples/react-demo`
- **Application Package**: `@vatza/example-react`
- **Consumed NPM Package**: `@vatza/passguard@1.0.1`
- **Framework**: Vite + React 18 + TypeScript
- **Build Output Directory**: `examples/react-demo/dist`
- **Routing**: Single Page Application (SPA static bundle)

---

## 2. Pre-Deployment Configuration & Audit

Before connecting the repository to Vercel, verify that the application resolves the published `@vatza/passguard@1.0.1` package directly from `node_modules` without local path overrides or source aliases:

```bash
# Verify TypeScript & Vite build pass locally
npm run lint --workspace=examples/react-demo
npm run build --workspace=examples/react-demo
```

### Monorepo Dependency Resolution
The project uses npm workspaces (`passguard-monorepo`). When Vercel builds `examples/react-demo`, Vercel automatically inspects parent directories for the root `package.json` and `package-lock.json`, ensuring `@vatza/passguard@1.0.1` is resolved as a published npm dependency.

---

## 3. Step-by-Step Vercel Deployment Instructions

### Step 1: Connect Repository
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** $\rightarrow$ **Project**.
3. Select your GitHub repository: `vathsa1820/PassGuard`.

### Step 2: Configure Project Settings
In the **Configure Project** screen, set the following parameters:

| Configuration Field | Recommended Setting | Description |
| :--- | :--- | :--- |
| **Framework Preset** | `Vite` | Auto-detects Vite build settings. |
| **Root Directory** | `examples/react-demo` | Crucial: points Vercel directly to the demo app subfolder. |
| **Build Command** | `npm run build` *(or `tsc && vite build`)* | Executes TypeScript typecheck followed by Vite production bundling. |
| **Output Directory** | `dist` | Relative to `examples/react-demo`. |
| **Install Command** | `npm install` *(default)* | Installs workspace dependencies from npm registry. |

### Step 3: Environment Variables
- **Required Variables**: None.
- PassGuard operates 100% zero-knowledge client-side in browser memory. No backend server URLs, API keys, or secret tokens are required.

### Step 4: Deploy & Verify
1. Click **Deploy**.
2. Wait for Vercel build logs to complete (typically ~30-45 seconds).
3. Once deployment finishes, Vercel will assign a production URL (e.g., `https://passguard-demo.vercel.app`).

---

## 4. Post-Deployment Verification Checklist

Upon successful deployment, navigate to the generated production URL and perform the following QA verification steps:

- [ ] **Initial Load**: Page loads over HTTPS without errors or blank screens.
- [ ] **PassGuard Rendering**: Both `<PasswordSecurityCard />` and granular components render styled elements correctly.
- [ ] **CSS Assets Loaded**: Visual indicators, badges, bars, and layout styles (`@vatza/passguard/style.css` and `demo.css`) display cleanly.
- [ ] **Synthetic Presets**: Clicking through all 7 synthetic presets (`1. Empty`, `2. Very Weak`, `3. Common`, `4. Pattern-Based`, `5. Medium`, `6. Strong`, `7. Long Strong`) instantly updates:
  - Security score (`0 - 100`) and status badge.
  - Policy requirements checklist pass/fail state.
  - Computed entropy bits and estimated crack time.
  - Pattern detection warnings.
  - Recommendations / Suggestion card.
- [ ] **Raw Telemetry Inspector**: Toggle button expands live `PasswordAnalysis` JSON payload.
- [ ] **Privacy Banner & Disclosure**: Privacy statement and client-side security boundary section display cleanly.
- [ ] **Footer Links**: Links to GitHub Repository (`https://github.com/vathsa1820/PassGuard`) and NPM Package (`https://www.npmjs.com/package/@vatza/passguard`) open in new tabs.
- [ ] **Console Audit**: Browser Developer Tools Console contains **zero** warnings or unhandled exceptions.
- [ ] **Network Audit**: Browser Developer Tools Network tab confirms **zero** outgoing requests containing password payloads or credentials.
- [ ] **Mobile & Keyboard Nav**: Layout scales gracefully to mobile widths (< 400px), and keyboard `Tab` focus rings are visible.

---

## 5. Security & Privacy Declaration

- **No Server Password Transmission**: Password inputs remain strictly in volatile browser JavaScript memory.
- **No Remote Telemetry**: PassGuard does not collect telemetry, analytics, or user metadata.
- **No Hardcoded Credentials**: No secrets or private keys are stored in source code or static assets.
