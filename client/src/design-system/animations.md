# PassGuard Design System - Motion & Transitions

Functional micro-animations designed to provide immediate clarity without distracting the user.

## Duration & Timing Function Tokens

| Motion Token | Duration | Timing Function | Application |
|--------------|----------|-----------------|-------------|
| **Fast** | 150ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Button hover states, checkbox toggles, icon flips |
| **Normal** | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Input focus ring transition, password score bar movement |
| **Slow** | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Expanding requirement checklist, suggestion card expand/collapse |

## Micro-Interactions
1. **Password Strength Meter**: Smooth spring-like `width` transition and color interpolation when typing.
2. **Checklist Validation**: Immediate icon scale-in (`transform: scale(1.1) -> scale(1)`) with color shift.
3. **Visibility Toggle**: Smooth opacity and line cross-fade on eye toggle.
