import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toTitle = ( text : string )=>{
  const value = text.charAt(0) + text.toLowerCase().slice(1);
  return value
}
