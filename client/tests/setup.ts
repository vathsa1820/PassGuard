import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock matchMedia API for jsdom environment
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Mock ResizeObserver API for jsdom environment
if (typeof globalThis !== 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Ensure Web Crypto API fallback for Node/jsdom
if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
  try {
    const nodeCrypto = require('crypto');
    if (nodeCrypto && nodeCrypto.webcrypto) {
      Object.defineProperty(globalThis, 'crypto', {
        value: nodeCrypto.webcrypto,
      });
    }
  } catch {
    // Ignore fallback if unavailable
  }
}
