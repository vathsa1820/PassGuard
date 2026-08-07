# PassGuard Design System - Shadows & Focus Rings

Subtle, multi-layered neutral shadows for spatial depth without visual noise.

## Shadow Scale

| Token Name | Shadow Value | Purpose |
|------------|--------------|---------|
| **Shadow SM** | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Default input fields, subtle buttons |
| **Shadow MD** | `0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)` | Dropdown cards, suggestions popover |
| **Shadow LG** | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)` | Floating modals, main password card overlay |

## Focus Rings (Accessibility & State)
- **Focus Ring Default**: `0 0 0 2px var(--color-background), 0 0 0 4px rgba(59, 130, 246, 0.6)`
- **Focus Ring Error**: `0 0 0 2px var(--color-background), 0 0 0 4px rgba(239, 68, 68, 0.6)`
- **Focus Ring Success**: `0 0 0 2px var(--color-background), 0 0 0 4px rgba(16, 185, 129, 0.6)`
