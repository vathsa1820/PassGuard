# Public Component Reference

This document details all 7 public React UI components exported by `@vatza/passguard`. Each component section includes its purpose, props interface, and usage example.

---

## 1. `PasswordSecurityCard`

Primary integrated container combining password input, score health bar, requirement checklist, suggestion card, and password reuse warnings into a pre-styled card component.

### Props (`PasswordSecurityCardProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `undefined` | Controlled password string input value. |
| `onChange` | `(value: string) => void` | `undefined` | Callback triggered when password input changes. |
| `onContinue` | `(analysis?: PasswordAnalysisOutput \| null) => void` | `undefined` | Callback triggered when user clicks the Continue button. |
| `policy` | `Partial<PasswordPolicy>` | `defaultPasswordPolicy` | Custom security policy configuration object. |
| `className` | `string` | `undefined` | Optional CSS class name for outer container. |
| `stateProps` | `PasswordSecurityCardStateProps` | `undefined` | Static rendering props for server-driven or design preview modes. |

### Usage Example

```tsx
import React, { useState } from 'react';
import { PasswordSecurityCard } from '@vatza/passguard';

export function CardExample() {
  const [password, setPassword] = useState('');

  return (
    <PasswordSecurityCard
      value={password}
      onChange={setPassword}
      onContinue={(analysis) => {
        if (analysis?.isValid) {
          console.log('Proceeding with valid password');
        }
      }}
    />
  );
}
```

---

## 2. `PasswordInput`

Accessible input field with an integrated visibility toggle button, clear state handling, and secure `autoComplete="new-password"` defaults.

### Props (`PasswordInputProps`)

Extends standard `React.InputHTMLAttributes<HTMLInputElement>`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Input text value. |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | Input change event listener. |
| `showPassword` | `boolean` | `false` | Controls whether password text is visible (`type="text"`) or masked (`type="password"`). |
| `toggleVisibility` | `() => void` | `undefined` | Callback to toggle password visibility state. |
| `placeholder` | `string` | `'Enter password...'` | Placeholder text. |
| `className` | `string` | `undefined` | Optional container CSS class name. |

### Usage Example

```tsx
import React, { useState } from 'react';
import { PasswordInput } from '@vatza/passguard';

export function InputExample() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      showPassword={show}
      toggleVisibility={() => setShow((prev) => !prev)}
    />
  );
}
```

---

## 3. `PasswordHealthScore`

Displays a normalized score (`0–100`), progress bar, and status badge (`Weak`, `Fair`, `Strong`, `Excellent`).

### Props (`PasswordHealthScoreProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `score` | `number` | `0` | Normalized score value between `0` and `100`. |
| `status` | `string` | `'Neutral'` | Strength status label (`'Weak'`, `'Fair'`, `'Strong'`, `'Excellent'`, or `'Neutral'`). |
| `showScore` | `boolean` | `true` | Controls whether numerical score text is displayed. |
| `className` | `string` | `undefined` | Optional CSS class name. |

### Usage Example

```tsx
import React from 'react';
import { PasswordHealthScore } from '@vatza/passguard';

export function HealthScoreExample() {
  return <PasswordHealthScore score={85} status="Strong" showScore={true} />;
}
```

---

## 4. `PasswordStrengthIndicator`

Segmented strength meter rendering color-coded progress bars corresponding to security score tiers.

### Props (`PasswordStrengthIndicatorProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `score` | `number` | `0` | Numerical score (`0–100`). |
| `className` | `string` | `undefined` | Optional CSS class name. |

### Usage Example

```tsx
import React from 'react';
import { PasswordStrengthIndicator } from '@vatza/passguard';

export function IndicatorExample() {
  return <PasswordStrengthIndicator score={92} />;
}
```

---

## 5. `RequirementChecklist`

Renders an accessible checklist of password policy requirements with real-time pass/fail icons.

### Props (`RequirementChecklistProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `rules` | `RequirementItem[]` | `[]` | Array of requirement items containing `{ label: string, completed: boolean }`. |
| `className` | `string` | `undefined` | Optional CSS class name. |

### Usage Example

```tsx
import React from 'react';
import { RequirementChecklist } from '@vatza/passguard';

const sampleRules = [
  { label: 'At least 12 characters', completed: true },
  { label: 'Includes symbol (!@#$%)', completed: false },
];

export function ChecklistExample() {
  return <RequirementChecklist rules={sampleRules} />;
}
```

---

## 6. `SuggestionCard`

Displays actionable security advice instructing users how to increase their score.

### Props (`SuggestionCardProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Smart Suggestion'` | Heading title. |
| `description` | `string` | `''` | Actionable suggestion message. |
| `expectedScore` | `number` | `undefined` | Estimated score increase if suggestion is followed. |
| `className` | `string` | `undefined` | Optional CSS class name. |

### Usage Example

```tsx
import React from 'react';
import { SuggestionCard } from '@vatza/passguard';

export function SuggestionExample() {
  return (
    <SuggestionCard
      title="Smart Suggestion"
      description="Add a special symbol like ! or @ to increase complexity."
      expectedScore={15}
    />
  );
}
```

---

## 7. `ReuseWarning`

Alert banner notifying users if an entered password matches a recorded session hash.

### Props (`ReuseWarningProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isVisible` | `boolean` | `false` | Controls warning alert visibility. |
| `message` | `string` | `'Password previously used in session.'` | Warning description text. |
| `className` | `string` | `undefined` | Optional CSS class name. |

### Usage Example

```tsx
import React from 'react';
import { ReuseWarning } from '@vatza/passguard';

export function WarningExample() {
  return (
    <ReuseWarning
      isVisible={true}
      message="This password was previously used in this session."
    />
  );
}
```

---

## 8. Next Steps

- **[Public API Reference](api-reference.md)**: Explore hooks and TypeScript types.
- **[Configuration Guide](configuration.md)**: Customize policy constraints.
