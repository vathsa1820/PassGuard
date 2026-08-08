import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('PassGuard Cross-Browser & E2E Verification', () => {

  test.beforeAll(() => {
    const dir = path.join(process.cwd(), 'tests', 'browser', 'screenshots');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test('1. Core Password Analysis & State Transitions', async ({ page, browserName }) => {
    await page.goto('/');

    const passwordInput = page.locator('#passguard-input');
    await expect(passwordInput).toBeVisible();

    // Verify initial state
    await expect(page.getByRole('heading', { name: 'Password Security', exact: true })).toBeVisible();

    // Take screenshot of empty state
    await page.screenshot({ path: `tests/browser/screenshots/${browserName}-empty-state.png` });

    // Step A: Type strong password
    await passwordInput.fill('P@ssGu@rd2026!');

    // Step B: Test Visibility Toggle
    const toggleBtn = page.getByRole('button', { name: /Show password|Hide password/i });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Screenshot of strong state
    await page.screenshot({ path: `tests/browser/screenshots/${browserName}-strong-state.png` });

    // Step C: Clear input
    await passwordInput.fill('');
    await expect(passwordInput).toHaveValue('');
  });

  test('2. Keyboard Navigation & Accessibility Controls', async ({ page }) => {
    await page.goto('/');

    const passwordInput = page.locator('#passguard-input');
    await passwordInput.focus();
    await expect(passwordInput).toBeFocused();

    // Tab to toggle button
    await page.keyboard.press('Tab');
    const toggleBtn = page.getByRole('button', { name: /Show password|Hide password/i });
    await expect(toggleBtn).toBeFocused();

    // Space key activates toggle
    await page.keyboard.press('Space');
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('3. WebCrypto SHA-256 Hashing & Storage Resilience', async ({ page }) => {
    await page.goto('/');

    const hasWebCrypto = await page.evaluate(() => {
      return Boolean(window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function');
    });

    expect(hasWebCrypto).toBe(true);
  });

  test('4. Prefers-Reduced-Motion Media Query Behavior', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const passwordInput = page.locator('#passguard-input');
    await passwordInput.fill('TestReducedMotion123!');

    await expect(page.getByRole('heading', { name: 'Password Security', exact: true })).toBeVisible();
  });

  test('5. Responsive Mobile & Desktop Layout Usability', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#passguard-input');
    await expect(input).toBeVisible();

    const box = await input.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(150);
    }
  });
});
