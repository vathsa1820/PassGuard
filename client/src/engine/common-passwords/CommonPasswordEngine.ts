import { CommonPasswordResult } from './types';
import { defaultCommonPasswordsSet } from './commonPasswords';

/**
 * CommonPasswordEngine Class
 * Performs fast O(1) local dataset checking to flag heavily reused breach passwords.
 */
export class CommonPasswordEngine {
  private commonSet: Set<string>;

  constructor(customList?: string[] | Set<string>) {
    if (customList instanceof Set) {
      this.commonSet = customList;
    } else if (Array.isArray(customList)) {
      this.commonSet = new Set(customList.map((s) => s.toLowerCase()));
    } else {
      this.commonSet = defaultCommonPasswordsSet;
    }
  }

  /**
   * Checks whether the given password exists in the common breach set.
   */
  public evaluate(password: string): CommonPasswordResult {
    if (!password) {
      return {
        isCommon: false,
        risk: 'None',
        message: 'Password field is empty.',
      };
    }

    const normalized = password.toLowerCase().trim();
    const isCommon = this.commonSet.has(normalized);

    if (isCommon) {
      return {
        isCommon: true,
        risk: 'High',
        message: 'This password is frequently used and appears in common breach lists.',
      };
    }

    return {
      isCommon: false,
      risk: 'None',
      message: 'Password was not found in common breach lists.',
    };
  }
}

/**
 * Pure helper function for immediate common password check.
 */
export function checkCommonPassword(
  password: string,
  customList?: string[] | Set<string>
): CommonPasswordResult {
  const engine = new CommonPasswordEngine(customList);
  return engine.evaluate(password);
}
