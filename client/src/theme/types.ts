/**
 * PassGuard Adaptive Theme Type Definitions
 * Defines modes, density tiers, theme tokens, and custom override properties.
 */

export type AdaptiveThemeMode = 'auto' | 'light' | 'dark';

export type AdaptiveDensity = 'auto' | 'minimal' | 'compact' | 'standard' | 'detailed';

export interface PassGuardThemeOverride {
  mode?: AdaptiveThemeMode;
  density?: AdaptiveDensity;
  accent?: string;
  bg?: string;
  surface?: string;
  fg?: string;
  border?: string;
  radius?: string;
  font?: string;
}

export interface ResolvedThemeColors {
  bg: string;
  surface: string;
  surfaceHover: string;
  fg: string;
  fgMuted: string;
  border: string;
  accent: string;
  accentHover: string;
  focus: string;
}

export interface AdaptiveTheme {
  mode: 'light' | 'dark';
  isDark: boolean;
  density: 'compact' | 'standard' | 'detailed';
  colors: ResolvedThemeColors;
  radius: string;
  font: string;
  containerWidth: number;
}
