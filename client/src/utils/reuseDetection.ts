export function detectPasswordReuse(password: string, history: string[]): boolean {
  return history.includes(password);
}
