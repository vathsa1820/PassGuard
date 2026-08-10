import * as React from 'react';
import { createContext, useContext, useRef } from 'react';
import { AdaptiveTheme, PassGuardThemeOverride } from './types';
import { useAdaptiveTheme } from './useAdaptiveTheme';

const AdaptiveThemeContext = createContext<AdaptiveTheme | null>(null);

export interface AdaptiveThemeProviderProps {
  children: React.ReactNode;
  override?: PassGuardThemeOverride;
  className?: string;
}

/**
 * Internal Adaptive Theme Provider.
 * Establishes context and applies scoped CSS custom variables and container data-attributes to host container element.
 */
export const AdaptiveThemeProvider: React.FC<AdaptiveThemeProviderProps> = ({
  children,
  override,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useAdaptiveTheme(containerRef, override);

  const dynamicStyle = {
    '--passguard-bg': theme.colors.bg,
    '--passguard-surface': theme.colors.surface,
    '--passguard-surface-hover': theme.colors.surfaceHover,
    '--passguard-fg': theme.colors.fg,
    '--passguard-fg-muted': theme.colors.fgMuted,
    '--passguard-border': theme.colors.border,
    '--passguard-accent': theme.colors.accent,
    '--passguard-accent-hover': theme.colors.accentHover,
    '--passguard-focus': theme.colors.focus,
    '--passguard-radius': theme.radius,
    '--passguard-font': theme.font,
  } as React.CSSProperties;

  return (
    <AdaptiveThemeContext.Provider value={theme}>
      <div
        ref={containerRef}
        data-passguard=""
        data-passguard-theme={theme.mode}
        data-passguard-density={theme.density}
        style={dynamicStyle}
        className={className}
      >
        {children}
      </div>
    </AdaptiveThemeContext.Provider>
  );
};

/**
 * Internal hook to consume the adaptive theme context.
 * Returns null if rendered outside an AdaptiveThemeProvider.
 */
export function useAdaptiveThemeContext(): AdaptiveTheme | null {
  return useContext(AdaptiveThemeContext);
}
