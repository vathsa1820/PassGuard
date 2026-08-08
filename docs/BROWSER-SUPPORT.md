# Browser Support Matrix

PassGuard is tested across modern desktop and mobile web browsers. This document outlines supported browser versions, Web Crypto API requirements, and test matrix results.

---

## 1. Supported Browsers & Minimum Versions

| Browser Environment | Minimum Version | Tested & Verified | Notes |
| :--- | :--- | :--- | :--- |
| **Google Chrome** | Chrome 80+ | Yes (v122+) | Full ES2020 & WebCrypto support. |
| **Microsoft Edge** | Edge 80+ | Yes (v122+) | Chromium-based core. |
| **Mozilla Firefox** | Firefox 78+ | Yes (v123+) | Full ES2020 & WebCrypto support. |
| **Apple Safari** | Safari 14+ | Yes (v17+) | macOS & iOS WebKit support. |
| **Mobile Chrome** | Android 10+ | Yes (Pixel 5) | Full responsive layout support. |
| **Mobile Safari** | iOS 14+ | Yes (iPhone 12) | Full touch & responsive layout support. |
| **Node.js** | Node 18+ | Yes (v20+) | Headless testing & SSR rendering support. |

---

## 2. Web Crypto API Requirement

PassGuard's local password reuse detection (`ReuseEngine`) uses the browser Web Crypto API:

```ts
window.crypto.subtle.digest('SHA-256', data)
```

### Secure Context Requirement

The Web Crypto API requires a **Secure Context**:
- Supported on `https://` origins.
- Supported on `http://localhost` or `http://127.0.0.1` during local development.
- In insecure HTTP production environments (`http://example.com`), `window.crypto.subtle` is disabled by the browser. PassGuard gracefully falls back to memory-based pattern matching if WebCrypto is unavailable.

---

## 3. Automated Cross-Browser Testing

PassGuard uses Playwright to run 25 automated E2E browser tests across 5 browser environments:

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5 Viewport)
- Mobile Safari (iPhone 12 Viewport)

**Pass Rate**: 100% (25/25 scenarios passed).

For detailed Playwright execution logs, see [docs/BROWSER-TEST-REPORT.md](BROWSER-TEST-REPORT.md).

---

## 4. Next Steps

- **[Troubleshooting Guide](troubleshooting.md)**: Resolve browser-specific issues.
- **[Installation Guide](installation.md)**: View build requirements.
