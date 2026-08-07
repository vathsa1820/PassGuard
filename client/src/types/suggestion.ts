export interface Suggestion {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
}
