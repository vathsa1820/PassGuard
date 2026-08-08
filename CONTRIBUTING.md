# Contributing to PassGuard

Thank you for your interest in contributing to **PassGuard**! PassGuard is an open-source React component library and zero-knowledge security engine designed to provide real-time password feedback.

We welcome contributions from the community to help make password security more intuitive, accessible, and resilient for modern web applications.

---

## 1. Welcome to the Community

We welcome many forms of contribution, including:

- **Bug Fixes**: Resolving logic errors, edge-case failures, or UI rendering glitches.
- **Security Improvements**: Hardening zero-knowledge invariants, entropy math, or memory handling.
- **Accessibility Enhancements**: Improving screen reader support, keyboard focus management, or WCAG 2.2 AA compliance.
- **Performance Optimizations**: Reducing latency in real-time keystroke evaluation sub-engines.
- **Documentation**: Fixing instructions, clarifying API reference guides, or expanding troubleshooting steps.
- **Test Coverage**: Adding unit, component, integration, or accessibility test scenarios.
- **Developer Experience**: Improving build tools, TypeScript declarations, or local playground setup.
- **Carefully Justified Features**: Proposed features that align with PassGuard's core zero-knowledge principles.

*Note: Please discuss major architectural changes or new feature proposals in a GitHub Issue prior to opening a Pull Request.*

---

## 2. Before Contributing

Before writing code or opening a pull request, please:

1. Read the project [README.md](README.md) to understand PassGuard's core purpose and scope.
2. Review the developer documentation in [docs/](docs/), specifically [docs/security.md](docs/security.md) and [docs/accessibility.md](docs/accessibility.md).
3. Search existing **GitHub Issues** and **Pull Requests** to ensure your proposed change or bug fix is not already under active development.
4. Avoid duplicate submissions by commenting on an open issue if you intend to work on it.

---

## 3. Development Setup

Follow these steps to set up your local development environment:

### Step 1: Fork & Clone

Fork the PassGuard repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/vathsa1820/PassGuard.git
cd PassGuard
```

### Step 2: Install Workspace Dependencies

PassGuard uses an npm workspaces monorepo structure. Install all project dependencies from the root directory:

```bash
npm install
```

### Step 3: Create a Feature Branch

Create a dedicated branch for your work:

```bash
git checkout -b feature/entropy-pool-refactor
```

### Step 4: Launch Development Playground

Start the Vite development server to test your changes live:

```bash
npm run dev
```

Open your browser at `http://localhost:5173` to interact with the demo playground.

---

## 4. Branch Naming Conventions

Use simple, descriptive branch names formatted in lowercase with hyphens:

- `feature/<description>` — New capabilities or enhancements (e.g. `feature/custom-checklist-icons`)
- `fix/<description>` — Bug fixes or edge-case corrections (e.g. `fix/sequence-pattern-bounds`)
- `docs/<description>` — Documentation additions or fixes (e.g. `docs/update-installation-guide`)
- `test/<description>` — Test suite additions or refactoring (e.g. `test/add-unicode-tests`)
- `security/<description>` — Security hardening or invariant tests (e.g. `security/zero-knowledge-checks`)

---

## 5. Code & Architecture Guidelines

When submitting code changes, please adhere to these core principles:

- **Strict TypeScript**: Write type-safe TypeScript code without suppressing type errors or using `any`.
- **Separation of Concerns**:
  - Keep React UI components in `client/src/components/`.
  - Keep pure math and analysis sub-engines in `client/src/engine/`.
  - Keep reactive hooks in `client/src/hooks/`.
- **Zero Unnecessary Dependencies**: Avoid introducing third-party runtime dependencies unless strictly necessary and approved by maintainers.
- **Public API Stability**: Maintain backward compatibility for exports defined in `client/src/index.ts`.
- **Focused Changes**: Keep pull requests small and focused on a single topic. Avoid combining unrelated refactoring with bug fixes.

---

## 6. Security-Sensitive Code Standards

PassGuard handles security-critical password evaluations. All contributors working on security-sensitive code must strictly follow these rules:

1. **Zero Plaintext Logging**: Never output plaintext password strings to `console.log`, `console.warn`, error bounds, or persistent storage.
2. **Zero Unnecessary Persistence**: Never serialize plaintext credentials to `localStorage`, `sessionStorage`, or cookies.
3. **Zero External Transmission**: Never add HTTP requests (`fetch`, `XMLHttpRequest`, `axios`, WebSockets) to analysis engines. All processing must remain 100% in local browser memory.
4. **Use Established Cryptographic APIs**: Do not write custom encryption or hashing algorithms. Use the browser's native Web Crypto API (`window.crypto.subtle`) for hashing.
5. **Add Regression Tests**: Every security-sensitive fix must include an automated regression test in `client/src/__tests__/` or `client/tests/`.
6. **Protect Private Data**: Never include real passwords, API keys, or credentials in issue descriptions, pull requests, or commit messages.

---

## 7. Testing Requirements

PassGuard requires automated tests for all code contributions. Run tests matching the category of your change:

| Change Category | Test Category | Target Command |
| :--- | :--- | :--- |
| Engine Math / Logic | Unit Tests | `npm run test -- tests/unit/` |
| React UI Component | Component Tests | `npm run test -- tests/components/` |
| Full User Journey | Integration Tests | `npm run test -- tests/integration/` |
| Edge-Cases / Boundaries | Robustness Tests | `npm run test -- tests/edge-cases/` |
| Security Invariants | Security Tests | `npm run test -- tests/unit/engine/security/` |
| Accessibility (WCAG) | `jest-axe` Audit | `npm run test -- tests/accessibility/` |
| Cross-Browser E2E | Playwright Matrix | `npx playwright test` |

---

## 8. Code Quality Checks

Before submitting a pull request, verify that your branch passes all local quality checks:

```bash
# 1. Typechecking (TypeScript compiler check without output)
npm run lint

# 2. Run unit and component test suite
npm run test

# 3. Build client library package
npm run build

# 4. Dry-run npm pack tarball inspection
npm run package
```

---

## 9. Commit Message Guidelines

We follow a lightweight Conventional Commits format for clear release changelogs:

- `feat: <description>` — A new feature
- `fix: <description>` — A bug fix
- `docs: <description>` — Documentation updates
- `test: <description>` — Adding or updating tests
- `refactor: <description>` — Code refactoring with no behavior change
- `security: <description>` — Security hardening or vulnerability fix
- `chore: <description>` — Maintenance or build configuration update

### Examples

```bash
git commit -m "feat: add configurable minLength policy option"
git commit -m "fix: handle empty input in entropy calculator safely"
git commit -m "security: enforce zero console logging invariant in analysis engine"
git commit -m "docs: expand installation guide for Next.js App Router"
```

---

## 10. Pull Request Process

1. **Push your branch** to your GitHub fork:
   ```bash
   git push origin feature/entropy-pool-refactor
   ```
2. **Open a Pull Request** against the `main` branch of `vathsa1820/PassGuard`.
3. **Complete the PR description**:
   - Summarize **what** changed and **why**.
   - List the tests added or executed to verify the change.
   - Mention any security or accessibility implications.
   - Reference related GitHub Issue numbers (e.g. `Closes #42`).
4. **Respond to Review Feedback**: Maintainers will review your PR and may suggest adjustments.

---

## 11. Pull Request Checklist

Before requesting maintainer review, ensure your PR meets all criteria:

- [ ] Change is focused, cohesive, and readable.
- [ ] TypeScript compilation passes cleanly (`npm run lint`).
- [ ] All unit and component tests pass (`npm run test`).
- [ ] Production build succeeds (`npm run build`).
- [ ] Tests have been added or updated for new/modified code.
- [ ] Relevant documentation in `docs/` or `README.md` has been updated.
- [ ] No API keys, secrets, or credentials added.
- [ ] No plaintext password logging or unapproved persistence added.
- [ ] Zero network requests introduced into analysis engines.
- [ ] Accessibility standards (WCAG 2.2 AA) maintained for UI changes.

---

## 12. Issue Reporting

### Bug Reports & Feature Requests

Submit bug reports, feature requests, or documentation improvements via **GitHub Issues**. Please include:
- Clear steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Relevant environment details (browser version, React version).

### Security Vulnerabilities

**Do NOT open public GitHub Issues for security vulnerabilities.**

If you discover a potential security vulnerability, please follow our responsible disclosure process outlined in [docs/SECURITY.md](docs/SECURITY.md) or submit a report via GitHub Security Advisories.

---

## 13. Maintainer Review Expectations

Maintainers evaluate pull requests based on:
- Technical correctness and adherence to zero-knowledge principles.
- Code quality, readability, and TypeScript type safety.
- Test coverage and regression prevention.
- Accessibility compliance and keyboard usability.
- API stability and maintainability.

Reviews are conducted in a welcoming, constructive, and professional manner.

---

## 14. Documentation Contributions

Documentation improvements are always welcome! Helpful documentation contributions include:
- Clarifying setup or integration instructions.
- Fixing code examples or broken links.
- Adding troubleshooting scenarios for bundlers or frameworks.
- Improving API reference signatures.

---

## 15. Security Contributions

Contributions to security-critical engines receive extra maintainer scrutiny to ensure no cryptographic weaknesses, side-channel leaks, or privacy regressions are introduced. Custom encryption algorithms will not be accepted.

---

## 16. License

By contributing to PassGuard, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
