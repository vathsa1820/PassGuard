# PassGuard Threat Model & Security Boundaries

This document defines the formal threat model, asset classification, trust boundaries, attack surface analysis, and explicit out-of-scope boundaries for the **PassGuard** React component library.

---

## 1. Asset Classification

| Asset | Sensitivity | Location | Protection Mechanism |
| :--- | :--- | :--- | :--- |
| **Plaintext Password** | **Critical** | Transient browser JS memory | Processed in-memory; zero network transmission; zero persistent storage; zero logging. |
| **Password Analysis Output** | Low / Public | React component state | Heuristic ratings (`score`, `status`, `rules`) exposed to UI only. Contains zero password text. |
| **Password Hashes (Demo)** | Medium | In-Memory / `localStorage` (Demo option) | SHA-256 strings stored if developer explicitly enables `LocalStorageReuseProvider`. |
| **Common Password List** | Public | Embedded bundle `Set<string>` | Static dictionary of breach passwords compiled into bundle. |
| **Policy Configuration** | Public | Application code | Validated by `validatePasswordPolicy` to enforce min/max length constraints. |

---

## 2. Trust Boundaries & Attack Surface Analysis

```
 +-----------------------------------------------------------------------+
 |                        USER BROWSER ENVIRONMENT                        |
 |                                                                       |
 |   +------------------------+             +------------------------+   |
 |   |   Host Application     |             |    PassGuard UI        |   |
 |   |   (Signup / Login)     |             |    Component           |   |
 |   +-----------+------------+             +-----------+------------+   |
 |               |                                      |                |
 |               +-------------------+------------------+                |
 |                                   |                                   |
 |                        [TRUST BOUNDARY: React State]                  |
 |                                   |                                   |
 |                        +----------v----------+                        |
 |                        | Intelligence Engine |                        |
 |                        | (Rules, Patterns,   |                        |
 |                        |  Common, Reuse)     |                        |
 |                        +---------------------+                        |
 +-----------------------------------------------------------------------+
```

### Attack Surfaces
1. **User Input Element (`<input type="password">`)**: Vulnerable to XSS or DOM injection if parent application renders unescaped content. PassGuard uses standard React synthetic inputs rendering plain string text.
2. **Policy Configuration API**: Developers pass custom policy objects. Malformed inputs could cause infinite loops or invalid states if not validated.
3. **Browser Storage (`localStorage`)**: Accessible to any script running on the same origin.

---

## 3. Threat Matrix & Countermeasures

| Threat Scenario | Threat Actor | Impact | Countermeasure |
| :--- | :--- | :--- | :--- |
| **Accidental Password Leakage in Logs** | Developer / Debugger | Critical | Zero logging policy (`0` `console.log` calls in core engine/UI; zero sensitive strings in thrown errors). |
| **XSS Payload Execution** | External Attacker | High | HTML injection vectors (`<script>`, SQLi) treated purely as literal strings; zero `innerHTML` or `dangerouslySetInnerHTML`. |
| **ReDoS / CPU Exhaustion (DoS)** | Malicious User | Medium | Repeated substring search capped at `maxWordLen = 32`; non-backtracking linear regexes. |
| **Same-Origin Storage Tampering** | Malicious Script / Extension | Medium | `LocalStorageReuseProvider` stores SHA-256 hashes only; clearly documented as non-production demo fallback. |
| **Malformed Policy DoS** | Misconfigured Host App | Low | `validatePasswordPolicy` sanitizes limits (`minLength >= 1`, `maxLength >= minLength`, type checks). |

---

## 4. Out-of-Scope Security Threats

The following threats are explicitly **OUT OF SCOPE** for PassGuard as a client-side React UI component:

1. **Compromised User Environment**: Keyloggers, malicious browser extensions, or OS-level malware executing on the client host.
2. **Same-Origin Cross-Site Scripting (XSS)**: If the host application contains an unpatched XSS vulnerability elsewhere on the origin, an attacker can access browser DOM/memory.
3. **Server-Side Password Authentication & Hashing**: PassGuard provides client-side guidance only; production backend authentication must hash passwords with `Argon2id` or `bcrypt`.
4. **Offline Dictionary Attacks on Plain SHA-256**: Unsalted client-side SHA-256 hashes stored in browser `localStorage` can be bruteforced offline if origin storage is compromised.

---

## 5. Security Invariants

PassGuard guarantees the following security invariants:
- **Zero-Knowledge**: Plaintext passwords never leave the immediate browser input control.
- **Zero-Network**: PassGuard makes zero `fetch`, `XMLHttpRequest`, `WebSocket`, or beacon calls.
- **Zero-Log**: No password string or hash is ever written to browser developer consoles.
