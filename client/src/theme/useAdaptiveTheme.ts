import { useState, useEffect, useRef } from 'react';
import { AdaptiveTheme, PassGuardThemeOverride } from './types';
import {
  isDarkColor,
  getReadableForegroundColor,
  deriveAccentVariants,
} from './themeDetector';

const DEFAULT_THEME: AdaptiveTheme = {
  mode: 'dark',
  isDark: true,
  density: 'standard',
  colors: {
    bg: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    fg: '#f8fafc',
    fgMuted: '#94a3b8',
    border: '#334155',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    focus: '#60a5fa',
  },
  radius: '0.75rem',
  font: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  containerWidth: 440,
};

/**
 * Custom React hook that inspects a host container element via getComputedStyle and ResizeObserver
 * to construct a fully adaptive theme object.
 */
export function useAdaptiveTheme(
  containerRef?: React.RefObject<HTMLElement | null>,
  override?: PassGuardThemeOverride
): AdaptiveTheme {
  const [theme, setTheme] = useState<AdaptiveTheme>(DEFAULT_THEME);
  const themeCacheRef = useRef<string>('');

  useEffect(() => {
    const element = containerRef?.current;
    if (typeof window === 'undefined') return;

    const updateTheme = () => {
      let bg = '#0f172a';
      let fg = '#f8fafc';
      let border = '#334155';
      let radius = '0.75rem';
      let font = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      let containerWidth = 440;

      if (element) {
        containerWidth = element.getBoundingClientRect().width || 440;
        let currentEl: HTMLElement | null = element;

        while (currentEl && currentEl !== document.documentElement) {
          const style = window.getComputedStyle(currentEl);
          const computedBg = style.backgroundColor;
          if (computedBg && computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent') {
            bg = computedBg;
            break;
          }
          currentEl = currentEl.parentElement;
        }

        const hostStyle = window.getComputedStyle(element);
        if (hostStyle.color && hostStyle.color !== 'transparent') {
          fg = hostStyle.color;
        }
        if (hostStyle.borderColor && hostStyle.borderColor !== 'transparent') {
          border = hostStyle.borderColor;
        }
        if (hostStyle.borderRadius && hostStyle.borderRadius !== '0px') {
          radius = hostStyle.borderRadius;
        }
        if (hostStyle.fontFamily) {
          font = hostStyle.fontFamily;
        }
      }

      if (override?.bg) bg = override.bg;
      if (override?.fg) fg = override.fg;
      if (override?.border) border = override.border;
      if (override?.radius) radius = override.radius;
      if (override?.font) font = override.font;

      const isDark = override?.mode === 'dark' ? true : override?.mode === 'light' ? false : isDarkColor(bg);
      const mode = isDark ? 'dark' : 'light';

      const accentInput = override?.accent || (isDark ? '#3b82f6' : '#2563eb');
      const accentVariants = deriveAccentVariants(accentInput);

      const surface = isDark ? '#1e293b' : '#f8fafc';
      const surfaceHover = isDark ? '#334155' : '#f1f5f9';
      const fgMuted = isDark ? '#94a3b8' : '#64748b';

      let density: 'compact' | 'standard' | 'detailed' = 'standard';
      if (override?.density && override.density !== 'auto') {
        density = override.density === 'minimal' ? 'compact' : override.density;
      } else if (containerWidth < 340) {
        density = 'compact';
      } else if (containerWidth > 600) {
        density = 'detailed';
      }

      const cacheKey = `${mode}-${bg}-${fg}-${accentVariants.accent}-${containerWidth}-${density}`;
      if (themeCacheRef.current === cacheKey) {
        return;
      }
      themeCacheRef.current = cacheKey;

      setTheme({
        mode,
        isDark,
        density,
        colors: {
          bg,
          surface,
          surfaceHover,
          fg: override?.fg || getReadableForegroundColor(bg),
          fgMuted,
          border,
          accent: accentVariants.accent,
          accentHover: accentVariants.accentHover,
          focus: accentVariants.focus,
        },
        radius,
        font,
        containerWidth,
      });
    };

    updateTheme();

    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      updateTheme();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    containerRef,
    override?.mode,
    override?.density,
    override?.accent,
    override?.bg,
    override?.fg,
    override?.border,
    override?.radius,
    override?.font,
  ]);

  return theme;
}
