# PassGuard Design System - Color Palette

Modern, refined SaaS color system designed for high legibility, subtle contrast, and seamless integration into developer apps (Linear / Vercel / shadcn/ui inspired).

## 1. Core Palette Tokens

### Semantic Tokens (Light Mode & Dark Mode)

| Token Name | Light Mode (HEX / HSL) | Dark Mode (HEX / HSL) | Usage / Intent |
|------------|-------------------------|------------------------|----------------|
| **Primary** | `#0f172a` / `222 47% 11%` | `#f8fafc` / `210 40% 98%` | Primary interactive elements, main actions |
| **Secondary** | `#f1f5f9` / `210 40% 96.1%` | `#1e293b` / `217.2 32.6% 17.5%` | Muted backgrounds, secondary button states |
| **Success** | `#10b981` / `160 84% 39%` | `#34d399` / `158 64% 52%` | High password strength, verified requirements |
| **Warning** | `#f59e0b` / `38 92% 50%` | `#fbbf24` / `43 96% 56%` | Moderate strength, password reuse alert |
| **Error** | `#ef4444` / `0 84.2% 60.2%` | `#f87171` / `0 91.2% 70.8%` | Weak password, security vulnerability |
| **Neutral (Slate)** | `#64748b` / `215.4 16.3% 46.9%` | `#94a3b8` / `215.4 16.3% 56.9%` | Neutral status indicators, quiet icons |
| **Background** | `#ffffff` / `0 0% 100%` | `#090d16` / `224 71% 4%` | Base container backdrop |
| **Card / Surface** | `#ffffff` / `0 0% 100%` | `#0f172a` / `222 47% 11%` | Component container surface |
| **Border** | `#e2e8f0` / `214.3 31.8% 91.4%` | `#1e293b` / `217.2 32.6% 17.5%` | Subtle dividers and component outlines |
| **Text Primary** | `#0f172a` / `222 47% 11%` | `#f8fafc` / `210 40% 98%` | High-emphasis body and header text |
| **Text Secondary** | `#64748b` / `215.4 16.3% 46.9%` | `#94a3b8` / `215.4 16.3% 56.9%` | Labels, captions, helper text |

## 2. Password Strength Multi-Tier Scale

- **Score 0 (Very Weak)**: `#ef4444` / `hsl(0, 84.2%, 60.2%)`
- **Score 1 (Weak)**: `#f97316` / `hsl(24.6, 95%, 53.1%)`
- **Score 2 (Fair)**: `#f59e0b` / `hsl(37.7, 92.1%, 50.2%)`
- **Score 3 (Good)**: `#3b82f6` / `hsl(217.2, 91.2%, 59.8%)`
- **Score 4 (Strong)**: `#10b981` / `hsl(160, 84.2%, 39.2%)`
