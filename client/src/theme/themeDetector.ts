/**
 * PassGuard Theme Detector Utility
 * Pure functions for parsing CSS colors, relative luminance, contrast calculation, and accent derivation.
 */

export interface RGBA {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  a: number; // 0 - 1
}

const DEFAULT_DARK_BG: RGBA = { r: 15, g: 23, b: 42, a: 1 }; // #0f172a
const DEFAULT_ACCENT: RGBA = { r: 59, g: 130, b: 246, a: 1 }; // #3b82f6

/**
 * Named colors mapping for common CSS color names.
 */
const NAMED_COLORS: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'rgba(0,0,0,0)',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  slate: '#0f172a',
  gray: '#808080',
  grey: '#808080',
};

/**
 * Parses any valid CSS color string (#hex, rgb, rgba, hsl, hsla, named) into RGBA.
 * Returns fallback RGBA if input is invalid or unparseable.
 */
export function parseCssColor(color: string, fallback: RGBA = DEFAULT_DARK_BG): RGBA {
  if (!color || typeof color !== 'string') return fallback;
  const str = color.trim().toLowerCase();

  if (NAMED_COLORS[str]) {
    return parseCssColor(NAMED_COLORS[str], fallback);
  }

  // Hex Parsing: #rgb, #rgba, #rrggbb, #rrggbbaa
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b, a: 1 };
    } else if (hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = parseInt(hex[3] + hex[3], 16) / 255;
      if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) return { r, g, b, a };
    } else if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b, a: 1 };
    } else if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) return { r, g, b, a };
    }
    return fallback;
  }

  // RGB / RGBA Parsing
  const rgbMatch = str.match(/^rgba?\(\s*([\d.%]+)[\s,]+([\d.%]+)[\s,]+([\d.%]+)(?:[\s,/]+([\d.%]+))?\s*\)$/);
  if (rgbMatch) {
    const parseVal = (val: string, max: number) => {
      if (val.endsWith('%')) return Math.round((parseFloat(val) / 100) * max);
      return Math.round(parseFloat(val));
    };
    const r = parseVal(rgbMatch[1], 255);
    const g = parseVal(rgbMatch[2], 255);
    const b = parseVal(rgbMatch[3], 255);
    let a = 1;
    if (rgbMatch[4] !== undefined) {
      a = rgbMatch[4].endsWith('%') ? parseFloat(rgbMatch[4]) / 100 : parseFloat(rgbMatch[4]);
    }
    if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) {
      return {
        r: Math.max(0, Math.min(255, r)),
        g: Math.max(0, Math.min(255, g)),
        b: Math.max(0, Math.min(255, b)),
        a: Math.max(0, Math.min(1, a)),
      };
    }
  }

  // HSL / HSLA Parsing
  const hslMatch = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.%]+))?\s*\)$/);
  if (hslMatch) {
    const h = ((parseFloat(hslMatch[1]) % 360) + 360) % 360;
    const s = Math.max(0, Math.min(100, parseFloat(hslMatch[2]))) / 100;
    const l = Math.max(0, Math.min(100, parseFloat(hslMatch[3]))) / 100;
    let a = 1;
    if (hslMatch[4] !== undefined) {
      a = hslMatch[4].endsWith('%') ? parseFloat(hslMatch[4]) / 100 : parseFloat(hslMatch[4]);
    }

    const { r, g, b } = hslToRgb(h, s, l);
    return { r, g, b, a: Math.max(0, Math.min(1, a)) };
  }

  return fallback;
}

/**
 * Converts HSL values to RGB (0-255).
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (0 <= h && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (60 <= h && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (120 <= h && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (180 <= h && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (240 <= h && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (300 <= h && h < 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/**
 * Calculates WCAG 2.1 relative luminance for a given color.
 * Returns a value between 0 (darkest black) and 1 (lightest white).
 */
export function calculateRelativeLuminance(color: string | RGBA): number {
  const rgba = typeof color === 'string' ? parseCssColor(color) : color;
  const sRGB = [rgba.r / 255, rgba.g / 255, rgba.b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Determines whether a color is light (luminance > 0.45).
 */
export function isLightColor(color: string | RGBA): boolean {
  return calculateRelativeLuminance(color) > 0.45;
}

/**
 * Determines whether a color is dark (luminance <= 0.45).
 */
export function isDarkColor(color: string | RGBA): boolean {
  return !isLightColor(color);
}

/**
 * Calculates the WCAG contrast ratio between two colors.
 * Returns a value between 1:1 and 21:1.
 */
export function getContrastRatio(color1: string | RGBA, color2: string | RGBA): number {
  const lum1 = calculateRelativeLuminance(color1);
  const lum2 = calculateRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Selects the most readable text/foreground color (#ffffff or #0f172a) for a given background color.
 */
export function getReadableForegroundColor(bgColor: string | RGBA): string {
  const whiteContrast = getContrastRatio(bgColor, '#ffffff');
  const darkContrast = getContrastRatio(bgColor, '#0f172a');
  return whiteContrast >= darkContrast ? '#ffffff' : '#0f172a';
}

/**
 * Derives compatible accent variants (e.g., hover, focus ring).
 */
export function deriveAccentVariants(accentColor: string): { accent: string; accentHover: string; focus: string } {
  const rgba = parseCssColor(accentColor, DEFAULT_ACCENT);
  const isLight = isLightColor(rgba);

  const factor = isLight ? 0.85 : 1.15;
  const hoverR = Math.min(255, Math.max(0, Math.round(rgba.r * factor)));
  const hoverG = Math.min(255, Math.max(0, Math.round(rgba.g * factor)));
  const hoverB = Math.min(255, Math.max(0, Math.round(rgba.b * factor)));

  const accentHex = rgbaToHex(rgba);
  const hoverHex = rgbaToHex({ r: hoverR, g: hoverG, b: hoverB, a: rgba.a });

  return {
    accent: accentHex,
    accentHover: hoverHex,
    focus: accentHex,
  };
}

/**
 * Converts RGBA object to hex string.
 */
export function rgbaToHex(rgba: RGBA): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  if (rgba.a < 1) {
    const aHex = Math.round(rgba.a * 255).toString(16).padStart(2, '0');
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${aHex}`;
  }
  return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
}
