import { type ClassValue, clsx } from 'clsx';

/**
 * Merges tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
