import { PasswordAnalysis } from '../types/password';
import { Suggestion } from '../types/suggestion';

export function getSuggestions(analysis: PasswordAnalysis): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const minLengthPassed = analysis.rules.find((r) => r.id === 'min-length')?.passed ?? true;
  const specialCharPassed = analysis.rules.find((r) => r.id === 'special-char')?.passed ?? true;

  if (!minLengthPassed) {
    suggestions.push({ id: '1', type: 'warning', message: 'Increase password length to at least 12 characters.' });
  }
  if (!specialCharPassed) {
    suggestions.push({ id: '2', type: 'info', message: 'Include special symbols for higher entropy.' });
  }
  return suggestions;
}

