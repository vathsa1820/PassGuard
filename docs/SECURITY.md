# Security & Privacy Model

PassGuard is designed from the ground up on strict **zero-knowledge** principles. This document outlines PassGuard's privacy architecture, data flow, client-side storage audit, threat model boundaries, and application security responsibilities.

---

## 1. Zero-Knowledge Architecture

1. **100% Client-Side Processing**: All password evaluation logic (entropy math, rule verification, pattern scanning, common password lookup) executes entirely within local browser memory.
2. **Zero Network Transmission**: PassGuard contains no network dependencies. It makes zero HTTP requests (`fetch`, `XMLHttpRequest`, `axios`, or WebSockets) and never transmits plaintext passwords or hashes to remote servers.
3. **Zero Plaintext Logging**: Passwords are never logged to `console`, saved to `localStorage`/`sessionStorage`, or stored in persistent cookies.

---

## 2. Data Flow & Memory Lifetime

```
[User Input Keystroke]
        │
        ▼
[React Memory State] ──► [PassGuard Analysis Engine] ──► [PasswordAnalysis Result]
        │                         │                                  │
        ▼                         ▼                                  ▼
[DOM Input Render]     [Volatile Memory Only]             [React Render Output]
```

- Plaintext password strings reside temporarily in volatile JavaScript component state while the active component is mounted.
- When the user leaves or unmounts the form, component memory state is garbage collected by the browser engine.

---

## 3. Password Reuse Detection & Storage Boundaries

PassGuard includes a local password reuse detection feature via `ReuseEngine`:

- **WebCrypto SHA-256 Hashing**: When a password is submitted or evaluated, PassGuard computes a SHA-256 cryptographic hash (`window.crypto.subtle.digest('SHA-256', ...)`). Plaintext strings are never retained for reuse comparisons.
- **Session Hash History**: Hashes are stored in memory or in browser `localStorage` under `passguard_password_hashes` for client-side demo previews.
- **Client Boundary Limitations**: Client-side reuse checking is isolated to the local browser environment and local storage scope. It does not replace centralized server-side credential history enforcement.

---

## 4. Threat Model & Boundaries

PassGuard is a **frontend password security guidance library**. It provides real-time user feedback during credential creation, but is NOT an authentication service or vault store.

### Out of Scope / Unsupported Guarantees

1. **Compromised Client Devices**: Frontend components cannot defend against keyloggers, malicious browser extensions, or DOM inspection on compromised user devices.
2. **Server-Side Authentication**: PassGuard does not authenticate credentials, handle user sessions, or issue authentication tokens.
3. **Backend Password Hashing**: Web applications must still hash passwords server-side prior to persistent database storage.

---

## 5. Application Security Responsibilities

To achieve end-to-end security, integrating applications must implement:

1. **Server-Side Password Hashing**: Always hash passwords on your backend using modern algorithms (`Argon2id`, `bcrypt`, or `scrypt`) with strong salt and cost parameters before database persistence.
2. **Transport Layer Security (TLS)**: Serve all pages over HTTPS to protect credentials during form submission.
3. **Multi-Factor Authentication (MFA)**: Implement TOTP, WebAuthn, or SMS verification for sensitive account operations.
4. **Server-Side Reuse & Breach Checks**: For production systems, enforce password history policies server-side or integrate k-Anonymity API lookups (e.g., HaveIBeenPwned 5-character SHA-1 prefix matching).

---

## 6. Security Audit & Documentation Links

For deeper technical analyses of security invariants, threat boundaries, and audit results, review:

- **[Threat Model Specification](THREAT-MODEL.md)**
- **[Deep Security Audit Findings](SECURITY-AUDIT.md)**
- **[Final QA Report](FINAL-QA-REPORT.md)**

---

## 7. Vulnerability Disclosure

If you discover a potential security vulnerability in PassGuard, please report it privately via GitHub Security Advisories or by emailing `security@passguard.dev`. Please do not open public GitHub issues for undisclosed security concerns.
