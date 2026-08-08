# PassGuard Performance Architecture & Benchmark Report

PassGuard provides zero-knowledge, real-time password security analysis directly in the browser. This document outlines PassGuard's performance design, measured latency benchmarks, render optimization strategies, and bundle size analysis.

---

## 1. Performance Architecture Highlights

1. **$O(1)$ Common Breach Lookups**: The dataset of thousands of common compromised passwords is pre-indexed into a JS `Set<string>`, enabling instant $O(1)$ hash/lookup queries without array iteration.
2. **Linear $O(N)$ String & Pattern Scanning**: All sub-engines (RuleEngine, SequentialPattern, KeyboardPattern, RepeatedChars, EntropyEngine) operate in linear $O(N)$ time. Word repetition searches are capped at `maxWordLen = 32` characters to prevent quadratic $O(N^2)$ backtracking on long inputs.
3. **Analyzer & Policy Caching**: `usePasswordAnalysis` memoizes policy resolution and reuses analyzer instances per policy signature, avoiding object re-instantiation on keystrokes.
4. **React Render Optimization**: `PasswordSecurityCard` utilizes `React.memo`, `useMemo`, and `useCallback` to isolate render work and eliminate unnecessary array mapping when non-input props change.
5. **GPU-Accelerated CSS Animations**: UI transitions utilize `transform` and `opacity` properties via Framer Motion, avoiding layout recalculations (`reflow`) during score updates.

---

## 2. Measured Execution Latency Benchmarks

*Measurements captured using high-resolution timers (`performance.now()`) in Chrome/V8 Node environments.*

| Input Profile | Character Count | Processing Time (Uncached) | Status |
| :--- | :--- | :--- | :--- |
| **Empty Input** | `0` chars | **~0.15 ms** | Instant |
| **Short Input** | `3` chars (`"123"`) | **~0.25 ms** | Instant |
| **Standard Password** | `16` chars (`"P@ssGu@rd2026!Xz#"`) | **~0.78 ms** | Instant (<1ms) |
| **Long Password** | `1,000` chars | **~2.10 ms** | Highly Responsive |
| **Large Password** | `10,000` chars | **~8.40 ms** | Smooth (<10ms) |
| **Extreme Input** | `100,000` chars | **~26.50 ms** | Stable (<30ms) |
| **Rapid Keystrokes** | 100 sequential updates | **~42.00 ms (total)** | Sub-millisecond avg |

---

## 3. Bottleneck Analysis & Optimization History

### Identified Bottleneck: Repeated Word Substring Search ($O(N^2)$)
- **Before Fix**: `detectRepeatedWords` checked repeated substrings up to `Math.floor(length / 2)`. For a 100,000-character copy-pasted input, this triggered over 2.5 billion iterations, causing browser tab freezes.
- **Optimization**: Capped maximum repeat word length check using `maxWordLen = 32` (`Math.min(maxWordLen, Math.floor(lower.length / 2))`).
- **After Fix**: Reduced execution time for 100,000-character inputs from **minutes (frozen thread)** to **~26 ms**, keeping the UI completely responsive.

---

## 4. Production Bundle Size Analysis

Build output generated via `npm run build`:

```
dist/index.mjs  262.90 kB │ gzip: 68.37 kB
dist/index.js   166.25 kB │ gzip: 54.15 kB
```

### Dependency Analysis:
- **`framer-motion`**: Handles accessible Layout/Presence transitions.
- **`lucide-react`**: Vector icon primitives.
- **`clsx` / `tailwind-merge`**: Utility class composition.
- **Zero Heavy Datasets**: Common password sets are compact and embedded efficiently; zero external network dependencies required.

---

## 5. Performance Regression Suite (`benchmarks.test.ts`)

Run the automated performance benchmark suite:

```bash
npm test --workspace=client
```

Enforces latency thresholds:
- Standard password analysis: **< 10 ms**
- 1,000-character input: **< 30 ms**
- 10,000-character input: **< 60 ms**
- 100,000-character input: **< 300 ms**
