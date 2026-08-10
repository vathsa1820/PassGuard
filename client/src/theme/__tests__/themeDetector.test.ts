import { describe, it, expect } from 'vitest';
import {
  parseCssColor,
  calculateRelativeLuminance,
  isLightColor,
  isDarkColor,
  getContrastRatio,
  getReadableForegroundColor,
  deriveAccentVariants,
} from '../themeDetector';

describe('PassGuard Theme Detector Utilities', () => {
  describe('parseCssColor', () => {
    it('parses short hex colors (#rgb)', () => {
      const color = parseCssColor('#fff');
      expect(color).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    });

    it('parses full hex colors (#rrggbb)', () => {
      expect(parseCssColor('#FF4ECD')).toEqual({ r: 255, g: 78, b: 205, a: 1 });
      expect(parseCssColor('#00D4FF')).toEqual({ r: 0, g: 212, b: 255, a: 1 });
      expect(parseCssColor('#123456')).toEqual({ r: 18, g: 52, b: 86, a: 1 });
    });

    it('parses hex colors with alpha (#rrggbbaa)', () => {
      const color = parseCssColor('#00d4ff80');
      expect(color.r).toBe(0);
      expect(color.g).toBe(212);
      expect(color.b).toBe(255);
      expect(color.a).toBeCloseTo(0.5, 1);
    });

    it('parses rgb and rgba strings', () => {
      expect(parseCssColor('rgb(255, 78, 205)')).toEqual({ r: 255, g: 78, b: 205, a: 1 });
      const rgba = parseCssColor('rgba(0, 212, 255, 0.9)');
      expect(rgba).toEqual({ r: 0, g: 212, b: 255, a: 0.9 });
    });

    it('parses hsl and hsla strings', () => {
      const hsl = parseCssColor('hsl(0, 100%, 50%)');
      expect(hsl.r).toBe(255);
      expect(hsl.g).toBe(0);
      expect(hsl.b).toBe(0);

      const hsla = parseCssColor('hsla(120, 100%, 50%, 0.8)');
      expect(hsla.r).toBe(0);
      expect(hsla.g).toBe(255);
      expect(hsla.b).toBe(0);
      expect(hsla.a).toBe(0.8);
    });

    it('parses named CSS colors', () => {
      expect(parseCssColor('white')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
      expect(parseCssColor('black')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it('returns fallback for invalid or empty colors', () => {
      const fallback = { r: 15, g: 23, b: 42, a: 1 };
      expect(parseCssColor('invalid-color', fallback)).toEqual(fallback);
      expect(parseCssColor('', fallback)).toEqual(fallback);
      expect(parseCssColor(null as any, fallback)).toEqual(fallback);
    });
  });

  describe('Luminance and Light/Dark Detection', () => {
    it('correctly calculates relative luminance', () => {
      expect(calculateRelativeLuminance('#ffffff')).toBe(1);
      expect(calculateRelativeLuminance('#000000')).toBe(0);
    });

    it('identifies light colors', () => {
      expect(isLightColor('#ffffff')).toBe(true);
      expect(isLightColor('#FF4ECD')).toBe(true);
      expect(isLightColor('#00D4FF')).toBe(true);
      expect(isLightColor('#f8fafc')).toBe(true);
    });

    it('identifies dark colors', () => {
      expect(isDarkColor('#000000')).toBe(true);
      expect(isDarkColor('#0f172a')).toBe(true);
      expect(isDarkColor('#123456')).toBe(true);
      expect(isDarkColor('#1e293b')).toBe(true);
    });
  });

  describe('Contrast & Readable Foreground Color', () => {
    it('calculates WCAG contrast ratio accurately', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('selects white foreground for dark backgrounds', () => {
      expect(getReadableForegroundColor('#0f172a')).toBe('#ffffff');
      expect(getReadableForegroundColor('#123456')).toBe('#ffffff');
      expect(getReadableForegroundColor('#000000')).toBe('#ffffff');
    });

    it('selects dark foreground for light backgrounds', () => {
      expect(getReadableForegroundColor('#ffffff')).toBe('#0f172a');
      expect(getReadableForegroundColor('#f8fafc')).toBe('#0f172a');
      expect(getReadableForegroundColor('#FF4ECD')).toBe('#0f172a');
    });
  });

  describe('deriveAccentVariants', () => {
    it('derives hover and focus variants for accent colors', () => {
      const variants = deriveAccentVariants('#3b82f6');
      expect(variants.accent).toBe('#3b82f6');
      expect(typeof variants.accentHover).toBe('string');
      expect(variants.focus).toBe('#3b82f6');
    });
  });
});
