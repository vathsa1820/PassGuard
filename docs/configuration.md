# PasswordPolicy Configuration System

PassGuard allows developers to configure custom password security criteria using the `PasswordPolicy` interface. Policy objects dictate length requirements, character diversity, structural pattern flags, common password dictionary checks, and local reuse enforcement.

---

## 1. Complete Policy Property Reference Table

| Property Name | Type | Default Value | Purpose |
| :--- | :--- | :--- | :--- |
| `minLength` | `number` | `12` | Minimum character length required (must be >= 1). |
| `maxLength` | `number` | `128` | Maximum character length allowed (must be >= minLength). |
| `requireUppercase` | `boolean` | `true` | Requires at least one uppercase letter (`A-Z`). |
| `requireLowercase` | `boolean` | `true` | Requires at least one lowercase letter (`a-z`). |
| `requireNumber` | `boolean` | `true` | Requires at least one numeric digit (`0-9`). |
| `requireSymbol` | `boolean` | `true` | Requires at least one special symbol (`!@#$%^&*`). |
| `preventRepeatedCharacters` | `boolean` | `true` | Flags 4+ consecutive identical characters (e.g., `aaaa`). |
| `preventSequentialPatterns` | `boolean` | `true` | Flags 3+ sequential character runs (e.g., `1234`, `abcd`). |
| `preventKeyboardPatterns` | `boolean` | `true` | Flags adjacent keyboard spatial paths (e.g., `qwerty`, `asdf`). |
| `checkCommonPasswords` | `boolean` | `true` | Compares input against local dictionary of common passwords. |
| `preventReuse` | `boolean` | `true` | Enables local session password reuse checking via WebCrypto SHA-256. |

---

## 2. Policy Resolution & Merging

When you pass a partial policy object to `<PasswordSecurityCard policy={customPolicy} />` or `usePasswordAnalysis(password, customPolicy)`, PassGuard uses `resolvePasswordPolicy` to fill missing fields with `defaultPasswordPolicy` values:

```ts
import { resolvePasswordPolicy, type PasswordPolicy } from '@vatza/passguard';

// Partial policy definition
const customPolicy: Partial<PasswordPolicy> = {
  minLength: 16,
  requireSymbol: true,
};

// Resolves missing keys against defaultPasswordPolicy
const resolvedPolicy = resolvePasswordPolicy(customPolicy);
console.log(resolvedPolicy.minLength); // 16
console.log(resolvedPolicy.requireUppercase); // true (default)
```

---

## 3. Policy Validation Rules

PassGuard validates policy configuration objects to ensure logical boundaries using `validatePasswordPolicy`:

- **Length Constraints**: `minLength` must be an integer greater than or equal to `1`.
- **Upper Bound**: `maxLength` must be an integer greater than or equal to `minLength`.
- **Type Safety**: Invalid types (e.g. string values for `minLength`) trigger validation errors.

If an invalid policy is supplied, PassGuard falls back safely to `defaultPasswordPolicy` and emits a warning in development mode.

```ts
import { validatePasswordPolicy } from '@vatza/passguard';

const result = validatePasswordPolicy({ minLength: 0, maxLength: 5 });
console.log(result.isValid); // false
console.log(result.errors); // ['minLength must be >= 1']
```

---

## 4. Policy Configuration Examples

### Strict Enterprise Policy

```ts
import { type PasswordPolicy } from '@vatza/passguard';

export const strictPolicy: PasswordPolicy = {
  minLength: 16,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: true,
  preventKeyboardPatterns: true,
  checkCommonPasswords: true,
  preventReuse: true,
};
```

### Relaxed High-Entropy Policy

```ts
import { type PasswordPolicy } from '@vatza/passguard';

export const passphrasePolicy: PasswordPolicy = {
  minLength: 20,
  maxLength: 128,
  requireUppercase: false,
  requireLowercase: true,
  requireNumber: false,
  requireSymbol: false,
  preventRepeatedCharacters: true,
  preventSequentialPatterns: false,
  preventKeyboardPatterns: false,
  checkCommonPasswords: true,
  preventReuse: false,
};
```

---

## 5. Next Steps

- **[Usage Guide](usage.md)**: Integrate policies into forms.
- **[Component Reference](components.md)**: View component props.
- **[Public API Reference](api-reference.md)**: Explore full TypeScript declarations.
