/**
 * PassGuard Password Reuse Engine Types
 * Pure TypeScript definitions for zero-knowledge hash comparison.
 */

export interface ReuseResult {
  reused: boolean;
  message: string;
}

export interface ReuseStorageProvider {
  getHashes(): string[];
  addHash(hash: string): void;
  clear(): void;
}
