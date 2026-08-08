import { ReuseStorageProvider } from './types';

const STORAGE_KEY = 'passguard_password_hashes';

/**
 * In-Memory Provider (Default for secure non-persisted client operations).
 * Stores SHA-256 hashes in memory only for the duration of the current session.
 */
export class InMemoryReuseProvider implements ReuseStorageProvider {
  private hashes: Set<string> = new Set();

  public getHashes(): string[] {
    return Array.from(this.hashes);
  }

  public addHash(hash: string): void {
    if (hash) {
      this.hashes.add(hash);
    }
  }

  public clear(): void {
    this.hashes.clear();
  }
}

/**
 * LocalStorage Provider for Client Demo Persistence.
 * 
 * SECURITY AUDIT NOTICE:
 * Storing hashes in localStorage is provided for interactive demo previews only.
 * Production applications should perform password reuse validation securely server-side
 * or use zero-knowledge server-backed hash sets (e.g. k-Anonymity API).
 */
export class LocalStorageReuseProvider implements ReuseStorageProvider {
  public getHashes(): string[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public addHash(hash: string): void {
    if (!hash || typeof localStorage === 'undefined') return;
    try {
      const hashes = this.getHashes();
      if (!hashes.includes(hash)) {
        hashes.push(hash);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(hashes));
      }
    } catch {
      // Storage full or restricted
    }
  }

  public clear(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage restricted
    }
  }
}

