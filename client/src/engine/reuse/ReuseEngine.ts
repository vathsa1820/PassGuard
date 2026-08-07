import { ReuseResult, ReuseStorageProvider } from './types';
import { hashPassword } from './hash';
import { LocalStorageReuseProvider } from './storage';

/**
 * ReuseEngine Class
 * Manages zero-knowledge password reuse detection using SHA-256 hashes.
 */
export class ReuseEngine {
  private storage: ReuseStorageProvider;

  constructor(storage?: ReuseStorageProvider) {
    this.storage = storage || new LocalStorageReuseProvider();
  }

  /**
   * Checks whether the SHA-256 hash of the password exists in storage.
   */
  public async checkPassword(password: string): Promise<ReuseResult> {
    if (!password) {
      return { reused: false, message: 'Password is empty.' };
    }

    const hash = await hashPassword(password);
    const hashes = this.storage.getHashes();
    const reused = hashes.includes(hash);

    if (reused) {
      return {
        reused: true,
        message: 'Password has already been used.',
      };
    }

    return {
      reused: false,
      message: 'Password has not been previously used.',
    };
  }

  /**
   * Hashes and stores a newly adopted password into storage.
   */
  public async addPassword(password: string): Promise<void> {
    if (!password) return;
    const hash = await hashPassword(password);
    this.storage.addHash(hash);
  }

  /**
   * Clears stored password hashes.
   */
  public clearStorage(): void {
    this.storage.clear();
  }
}

/**
 * Helper function to immediately check password reuse.
 */
export async function checkPasswordReuse(
  password: string,
  storage?: ReuseStorageProvider
): Promise<ReuseResult> {
  const engine = new ReuseEngine(storage);
  return engine.checkPassword(password);
}
