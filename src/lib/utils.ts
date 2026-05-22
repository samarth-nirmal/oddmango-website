import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asset(path: string) {
  // If the path is already an absolute URL, return it
  if (path.startsWith('http')) return path;
  
  const base = import.meta.env.BASE_URL;
  // Make sure we don't end up with double slashes if base is "/" and path is "/file"
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

