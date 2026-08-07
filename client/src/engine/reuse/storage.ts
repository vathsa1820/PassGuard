import { ReuseStorageProvider } from './types';

const STORAGE_KEY = 'passguard_password_hashes';

/**
 * LocalStorage Provider for MVP hash persistence.
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
