export function detectPatterns(password: string): string[] {
  const patterns: string[] = [];
  if (/(1234|qwerty|password|abc123)/i.test(password)) {
    patterns.push('Sequential or common keyboard pattern detected');
  }
  return patterns;
}
