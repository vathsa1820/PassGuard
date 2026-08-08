# Maintainer & Developer Contribution Guide

Thank you for your interest in contributing to PassGuard! This guide details the development workflow, testing standards, build routines, and pull request procedures.

---

## 1. Fork & Clone Workflow

1. Fork the PassGuard repository on GitHub.
2. Clone your fork locally:

```bash
git clone https://github.com/vathsa1820/PassGuard.git
cd PassGuard
```

3. Create a descriptive feature branch:

```bash
git checkout -b feature/entropy-enhancements
```

---

## 2. Environment Setup & Installation

PassGuard uses an npm workspaces monorepo structure. Install all dependencies from the project root:

```bash
npm install
```

---

## 3. Development Commands

Run the interactive local playground dev server:

```bash
npm run dev
```

This launches the Vite playground at `http://localhost:5173`.

---

## 4. Quality Assurance & Testing

PassGuard enforces high test coverage and zero type errors. Run all test suites before submitting a pull request:

```bash
# Run full Vitest suite (240 unit & component tests)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Perform TypeScript type checking
npm run lint

# Build client library package
npm run build

# Perform dry-run package tarball inspection
npm run package
```

---

## 5. Coding Standards & Guidelines

- **Zero-Knowledge Invariant**: Never add external HTTP calls (`fetch`, `axios`) to core analysis engines.
- **Privacy Guarantee**: Never log plaintext password strings to `console` or persistent storage.
- **Type Safety**: Maintain strict TypeScript types. Avoid using `any`.
- **Accessibility**: Ensure new UI components maintain WCAG 2.2 AA compliance and pass `jest-axe` audits.

---

## 6. Submitting Pull Requests

1. Commit your changes with descriptive commit messages.
2. Push your feature branch to your fork.
3. Open a Pull Request against `main` on the main PassGuard repository.
4. Ensure all CI automated checks (linting, tests, build) pass.

---

## 7. Next Steps

- **[Getting Started](getting-started.md)**: Explore project documentation.
- **[Security Model](security.md)**: Review security invariants.
