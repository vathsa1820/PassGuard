# Public API Reference

This document contains the complete TypeScript signatures for all components, hooks, utilities, configuration objects, and types exported by `@vatza/passguard`.

---

## 1. UI Components

### `PasswordSecurityCard`

```tsx
export const PasswordSecurityCard: React.FC<PasswordSecurityCardProps>;

export interface PasswordSecurityCardProps {
  className?: string;
  value?: string;
  onChange?: (password: string) => void;
  onContinue?: (analysis?: PasswordAnalysisOutput | null) => void;
  stateProps?: PasswordSecurityCardStateProps;
  policy?: Partial<PasswordPolicy> | PasswordPolicy;
}

export interface PasswordSecurityCardStateProps {
  password?: string;
  score?: number;
  status?: string;
  rules?: RequirementItem[];
  suggestion?: string | null;
  expectedScoreBoost?: number;
  reuseWarning?: { isVisible: boolean; message?: string } | null;
  successMessage?: string | null;
}
```

### `PasswordInput`

```tsx
export const PasswordInput: React.FC<PasswordInputProps>;

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
  toggleVisibility?: () => void;
  className?: string;
}
```

### `PasswordHealthScore`

```tsx
export const PasswordHealthScore: React.FC<PasswordHealthScoreProps>;

export interface PasswordHealthScoreProps {
  score: number;
  status: string;
  showScore?: boolean;
  className?: string;
}
```

### `PasswordStrengthIndicator`

```tsx
export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps>;

export interface PasswordStrengthIndicatorProps {
  score: number;
  className?: string;
}
```

### `RequirementChecklist`

```tsx
export const RequirementChecklist: React.FC<RequirementChecklistProps>;

export interface RequirementChecklistProps {
  rules: RequirementItem[];
  className?: string;
}

export interface RequirementItem {
  label: string;
  completed: boolean;
}
```

### `SuggestionCard`

```tsx
export const SuggestionCard: React.FC<SuggestionCardProps>;

export interface SuggestionCardProps {
  title?: string;
  description?: string;
  expectedScore?: number;
  className?: string;
}
```

### `ReuseWarning`

```tsx
export const ReuseWarning: React.FC<ReuseWarningProps>;

export interface ReuseWarningProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}
```

---

## 2. React Hooks

### `usePasswordAnalysis`

```ts
export function usePasswordAnalysis(
  password: string,
  customPolicy?: Partial<PasswordPolicy> | PasswordPolicy
): PasswordAnalysisOutput;
```

### `usePasswordAnalyzer`

```ts
export function usePasswordAnalyzer(
  options?: UsePasswordAnalyzerOptions
): {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  analysis: PasswordAnalysisOutput;
  isValid: boolean;
  handleReset: () => void;
};

export interface UsePasswordAnalyzerOptions {
  initialPassword?: string;
  policy?: Partial<PasswordPolicy>;
}
```

### `usePasswordStrength`

```ts
export function usePasswordStrength(
  password: string
): {
  score: number;
  status: PasswordStatus;
  entropy: number;
};
```

---

## 3. Analysis Functions & Policy Helpers

### `analyzePassword`

```ts
export function analyzePassword(
  password: string,
  customPolicy?: Partial<PasswordPolicy> | PasswordPolicy
): Promise<PasswordAnalysisOutput>;
```

### `resolvePasswordPolicy`

```ts
export function resolvePasswordPolicy(
  customPolicy?: Partial<PasswordPolicy> | PasswordPolicy
): PasswordPolicy;
```

### `validatePasswordPolicy`

```ts
export function validatePasswordPolicy(
  policy?: Partial<PasswordPolicy> | PasswordPolicy
): PolicyValidationResult;

export interface PolicyValidationResult {
  isValid: boolean;
  errors: string[];
}
```

---

## 4. TypeScript Types & Data Interfaces

### `PasswordPolicy`

```ts
export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSymbol: boolean;
  preventRepeatedCharacters: boolean;
  preventSequentialPatterns: boolean;
  preventKeyboardPatterns: boolean;
  checkCommonPasswords: boolean;
  preventReuse: boolean;
}
```

### `PasswordAnalysisOutput`

```ts
export interface PasswordAnalysisOutput {
  score: number;
  status: PasswordStatus;
  entropy: number;
  isValid: boolean;
  rules: PasswordRuleResult[];
  patterns: PatternDetectionResult;
  commonPassword: CommonPasswordResult;
  reuse: ReuseResult;
  suggestion: PasswordSuggestion;
}
```

### `PasswordStatus`

```ts
export type PasswordStatus = 'Weak' | 'Fair' | 'Strong' | 'Excellent' | 'Neutral';
```

### `PasswordRuleResult`

```ts
export interface PasswordRuleResult {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
}
```

### `PasswordSuggestion`

```ts
export interface PasswordSuggestion {
  id: string;
  title: string;
  message: string;
  expectedScore?: number;
  priority: number;
}
```

---

## 5. Next Steps

- **[Component Reference](components.md)**: Explore UI component usage.
- **[Configuration Guide](configuration.md)**: Custom policy options.
