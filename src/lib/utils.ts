import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assetPath(path: string) {
  const basePath = '/Gia-Luat-portfolio';
  if (!path) return '';
  if (path.startsWith('http')) return path; // Don't prefix external links
  if (path.startsWith(basePath)) return path; // Already prefixed
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
}
