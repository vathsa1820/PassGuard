import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes conditionally without style conflicts.
 * Follows shadcn/ui design system architecture.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
