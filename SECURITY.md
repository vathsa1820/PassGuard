# Security Policy

Security is a primary concern for **PassGuard**. Because PassGuard evaluates password credentials, maintaining strong zero-knowledge invariants, client-side memory isolation, and safe DOM rendering is critical to our project.

We welcome responsible security research and vulnerability reports from the open-source community.

---

## 1. Supported Versions

Security updates and vulnerability patches are applied to the active release version on the `main` branch.

| Package | Version | Status | Supported |
| :--- | :--- | :--- | :--- |
| `@vatza/passguard` | `1.0.0` (main) | Active Release / Initial Release | Yes |
| Pre-release commits | `< 1.0.0` | Development / Legacy | No (upgrade required) |

*Note: Maintainers support the current major release on the `main` branch. Older unreleased commits are not actively backported.*

---

## 2. Reporting a Vulnerability

**DO NOT report security vulnerabilities through public GitHub Issues, discussions, or pull requests.**

Public disclosure of an unpatched vulnerability exposes users of PassGuard to unnecessary risk before a fix can be prepared and released.

### Recommended Reporting Mechanism

Please report security vulnerabilities confidentially through **GitHub Private Vulnerability Reporting**:

1. Navigate to the PassGuard repository on GitHub.
2. Click the **Security** tab.
3. Select **Advisories** from the left navigation sidebar.
4. Click **Report a vulnerability** to open a private advisory draft directly with project maintainers.

*Note for Repository Administrators: Ensure GitHub Private Vulnerability Reporting is enabled in Repository Settings $\rightarrow$ Code security and analysis prior to the public release.*

### Report Contents

To help maintainers triage and reproduce the issue quickly, please include the following details in your report:

- **Description**: A clear explanation of the vulnerability and its root cause.
- **Affected Component**: The specific module, engine, hook, or component affected (e.g., `PasswordInput`, `ReuseEngine`, `usePasswordAnalysis`).
- **Affected Version / Commit**: The package version or git commit hash evaluated.
- **Reproduction Steps**: Step-by-step instructions to reproduce the issue locally.
- **Proof of Concept**: Minimal code snippet demonstrating the vulnerability using **synthetic data**.
- **Expected vs. Actual Behavior**: What should happen vs. what actually occurs.
- **Potential Impact**: Technical evaluation of potential risk (e.g., XSS, memory leak, pattern bypass).
- **Suggested Mitigation**: Proposed fix or patch if available.

---

## 3. Do Not Include Real Secrets

**Never include real passwords, live credentials, API keys, private keys, or personal identifiable information (PII) in vulnerability reports.**

Always use **synthetic test passwords** (e.g., `SyntheticPass123!#`) and simulated local environments when demonstrating potential security issues.

---

## 4. Responsible Disclosure Policy

We ask security researchers to adhere to coordinated responsible disclosure:

- Provide maintainers reasonable time to investigate, reproduce, patch, and release an advisory before publicly disclosing details.
- Avoid accessing, modifying, or degrading user data during research.
- Perform all security research within isolated local development environments (`http://localhost:5173`).

PassGuard maintainers will acknowledge receipt of your report, investigate the issue, and keep you informed of remediation progress.

---

## 5. Security Scope

The following technical areas are in scope for security vulnerability reporting:

- **Plaintext Password Exposure**: Unintended logging (`console.log`), storage, or DOM leakage of plaintext passwords.
- **Unexpected Network Transmission**: Introduction of HTTP calls (`fetch`, `XMLHttpRequest`, `axios`, WebSockets) within analysis sub-engines.
- **Cross-Site Scripting (XSS)**: Unsafe DOM parsing, HTML injection, or script execution via input fields or suggestion components.
- **Regular Expression Denial of Service (ReDoS)**: Catastrophic backtracking in pattern detection algorithms caused by malformed inputs.
- **Cryptographic Misuse**: Insecure usage of WebCrypto APIs or hash truncation flaws in password reuse engines.
- **Unsafe Persistence**: Serialization of unhashed credentials to browser `localStorage` or `sessionStorage`.
- **Dependency Vulnerabilities**: Severe CVEs affecting direct runtime dependencies of `@vatza/passguard`.

---

## 6. Out of Scope

The following items are considered out of scope for security vulnerability reports:

- **Feature Requests**: Suggestions for new policy options or UI enhancements.
- **Subjective Scoring Disagreements**: Disagreements over specific password health score weightings or entropy formulas that do not represent a bypass flaw.
- **Theoretical Attacks Without Impact**: Theoretical vulnerabilities requiring unreasonable or impossible preconditions.
- **Host Application Vulnerabilities**: Attacks caused solely by host application misconfigurations (e.g., host site rendering user input dangerously outside PassGuard).
- **Compromised Host OS / Malware**: Attacks relying on existing keyloggers, malicious browser extensions, or root access on the user's local OS.
- **Developer Misconfiguration**: Issues resulting from developers explicitly overriding security defaults (e.g., setting `minLength: 1`).

---

## 7. Password Guidance Limitations

PassGuard is a **frontend password security guidance component**. It provides real-time user feedback during credential creation.

PassGuard **does NOT replace** core backend security controls, including:

- Server-side password hashing (using modern algorithms like `Argon2id` or `bcrypt`).
- Backend authentication & session management.
- Multi-factor authentication (MFA / WebAuthn).
- Rate limiting and IP throttling.
- Account lockout policies.
- Centralized credential breach monitoring.

Design boundaries and client-side limitations are expected system behaviors and should not automatically be reported as security vulnerabilities.

---

## 8. Security Research Guidelines

To test PassGuard safely:

- Use local development environments (`npm run dev`).
- Test against isolated synthetic accounts.
- Do not attempt security testing against live production systems belonging to third parties without explicit authorization.

---

## 9. Vulnerability Triage & Remediation Process

When a private security advisory is submitted, maintainers follow this triage process:

```
[Report Received] ──► [Maintainer Triage & Reproduction] ──► [Severity Assessment]
                                                                     │
[Advisory Release] ◄── [Package Update Published] ◄── [Patch & Regression Test]
```

1. **Receipt & Acknowledgement**: Report received confidentially via GitHub Security Advisories.
2. **Triage & Reproduction**: Issue reproduced in an isolated test environment.
3. **Severity Assessment**: Severity scored according to potential impact.
4. **Fix & Test**: A patch is created alongside security regression tests.
5. **Release**: An updated package version is published to npm.
6. **Disclosure**: A public GitHub Security Advisory is published crediting the reporter.

---

## 10. Researcher Acknowledgement

Security researchers who responsibly disclose verified vulnerabilities will be publicly acknowledged in the GitHub Security Advisory and release notes, subject to their preference. PassGuard does not currently offer monetary bug bounties.

---

## 11. Technical Security Documentation

For comprehensive technical details on PassGuard's threat model, zero-knowledge architecture, and security audit findings, review:

- **[docs/security.md](docs/security.md)** — Developer Security & Privacy Guide
- **[docs/THREAT-MODEL.md](docs/THREAT-MODEL.md)** — Threat Model & Boundary Specifications
- **[docs/SECURITY-AUDIT.md](docs/SECURITY-AUDIT.md)** — Deep Technical Security Audit Findings
