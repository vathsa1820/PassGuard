/**
 * Curated dataset of top 50+ common passwords (lowercase)
 * Easily expandable or replaceable with custom breach dictionaries.
 */
export const topCommonPasswords: string[] = [
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  '111111',
  '1234567',
  'sunshine',
  'qwerty',
  'iloveyou',
  'princess',
  'admin',
  'welcome',
  'letmein',
  'monkey',
  'football',
  'dragon',
  'master',
  'shadow',
  '123123',
  '654321',
  'superman',
  'pass123',
  'pass1234',
  'password123',
  'charlie',
  'donald',
  'passguard',
  'computer',
  'security',
  'trustno1',
  '000000',
  'gothics',
  'soccer',
  'baseball',
  'picture1',
  'password1',
];

/**
 * Fast O(1) hash lookup Set created from the list.
 */
export const defaultCommonPasswordsSet = new Set<string>(
  topCommonPasswords.map((p) => p.toLowerCase())
);
