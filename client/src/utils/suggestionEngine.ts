import { PasswordAnalysis } from '../types/password';
import { Suggestion } from '../types/suggestion';

export function getSuggestions(analysis: PasswordAnalysis): Suggestion[] {
  const suggestions: Suggestion[] = [];
  if (!analysis.hasMinLength) {
    suggestions.push({ id: '1', type: 'warning', message: 'Increase password length to at least 8 characters.' });
  }
  if (!analysis.hasSpecialChar) {
    suggestions.push({ id: '2', type: 'info', message: 'Include special symbols for higher entropy.' });
  }
  return suggestions;
}
