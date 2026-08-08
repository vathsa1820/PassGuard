# PassGuard Release & Versioning Strategy

This document outlines the official Semantic Versioning policy, public API boundaries, breaking change definitions, and step-by-step release process for PassGuard (`@vatza/passguard`).

---

## 1. Semantic Versioning Policy

PassGuard follows [Semantic Versioning (SemVer 2.0.0)](https://semver.org/):

$$\text{MAJOR}.\text{MINOR}.\text{PATCH}$$

- **PATCH (`1.0.0` $\rightarrow$ `1.0.1`)**: Backward-compatible bug fixes or internal performance optimizations that do not alter the public API or component behavior.
  - *Example*: Fixing a keyboard sequence pattern detection false-positive.
- **MINOR (`1.0.1` $\rightarrow$ `1.1.0`)**: Backward-compatible new features, new UI components, additional optional props, or new policy configuration parameters.
  - *Example*: Adding a new optional `showScoreBoost` prop to `PasswordSecurityCard`.
- **MAJOR (`1.1.0` $\rightarrow$ `2.0.0`)**: Incompatible breaking changes to public APIs, component prop signature changes, prop removals, or raised peer dependency constraints.
  - *Example*: Renaming `onContinue` to `onSubmit` or changing `usePasswordAnalysis` return fields.

---

## 2. Initial Version (`1.0.0`)

PassGuard `@vatza/passguard` is currently at **Version 1.0.0**.

### Justification for `1.0.0`
- **Public API Stability**: Core component signatures, hooks, and policy interfaces are locked and fully specified.
- **Production QA Status**: 100% test pass rate across unit, component, accessibility (`jest-axe`), integration, and Playwright cross-browser tests (265/265 tests pass).
- **Package Readiness**: Dry-run package building produces a clean, trimmed library distribution containing zero test or development artifacts.

---

## 3. Public API Boundaries

The public API of PassGuard consists **only** of explicit exports defined in `client/src/index.ts` and the package stylesheet:

### Exported Components
- `PasswordSecurityCard`
- `PasswordInput`
- `PasswordHealthScore`
- `PasswordStrengthIndicator`
- `RequirementChecklist`
- `SuggestionCard`
- `ReuseWarning`

### Exported React Hooks
- `usePasswordAnalysis`
- `usePasswordAnalyzer`
- `usePasswordStrength`

### Exported Utilities & Functions
- `analyzePassword`
- `resolvePasswordPolicy`
- `validatePasswordPolicy`

### Exported Types & Contracts
- `PasswordPolicy`
- `PasswordAnalysisOutput`
- `PasswordRuleResult`
- `PasswordSuggestion`
- `PasswordStatus`
- `RequirementItem`

### Package Stylesheet
- `@vatza/passguard/style.css`

*Note: Internal sub-engines in `client/src/engine/` and utility files not exported by `client/src/index.ts` are internal implementation details and may change internally without triggering a major version bump.*

---

## 4. Breaking Change Policy

The following changes are classified as **Breaking Changes** and require a **MAJOR** version bump (`1.x.x` $\rightarrow$ `2.0.0`):

1. Removing or renaming any exported UI component, hook, utility function, or TypeScript type.
2. Removing or renaming a prop on any public component (e.g. changing `PasswordSecurityCard` prop `onChange` to `onPasswordChange`).
3. Changing an optional prop to a required prop.
4. Changing the return signature or data structure of `usePasswordAnalysis`, `usePasswordAnalyzer`, or `analyzePassword`.
5. Bumping peer dependencies beyond `react ^18.0.0 || ^19.0.0`.
6. Modifying zero-knowledge invariants in a way that breaks existing host integration security models.

---

## 5. Step-by-Step Release Checklist

When preparing a new release of `@vatza/passguard`, maintainers must follow this release checklist sequentially.

### Pre-Release Verification
- [ ] Run full lint & typecheck: `npm run lint`
- [ ] Run Vitest test suite: `npm run test`
- [ ] Run test coverage report: `npm run test:coverage`
- [ ] Run Playwright cross-browser tests: `npm run test:e2e`
- [ ] Build production library package: `npm run build`
- [ ] Perform package tarball dry-run inspection: `npm run package`
- [ ] Verify WCAG 2.2 AA accessibility test results.
- [ ] Update `CHANGELOG.md` with new features, fixes, and release date.
- [ ] Update `version` in `client/package.json` and root `package.json`.

### Release Execution
- [ ] Create Git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
- [ ] Push tag to GitHub: `git push origin v1.0.0`
- [ ] Draft GitHub Release on GitHub repository with release notes from `CHANGELOG.md`.
- [ ] Publish package to npm registry: `npm publish --workspace=client`

### Post-Release Verification
- [ ] Test fresh npm package installation in a clean project: `npm install @vatza/passguard`
- [ ] Verify styles import (`import '@vatza/passguard/style.css'`).
- [ ] Confirm GitHub Release page displays correct tag and notes.
- [ ] Verify live demo preview.

---

## 6. Release Notes Template

When drafting GitHub Release Notes, maintainers should use the following Markdown template:

```markdown
## PassGuard Release v1.0.0

### Highlights
- Short summary of major achievements in this release.

### Added
- Feature 1
- Feature 2

### Changed
- Change 1

### Fixed
- Fix 1

### Security
- Security improvement or patch details (without disclosing unpatched zero-days).

### Breaking Changes
- N/A (or list breaking changes and migration steps).
```
