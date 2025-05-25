import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function flattenObjectArrays(obj:any) {
  // Check if input is an object
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }
  
  // // Use Object.values to get all arrays and flatMap to flatten them 
  // return Object.values(obj).flatMap(arr => 
  //   // Ensure each value is an array, then spread it without creating category
  //   Array.isArray(arr) ? arr : []
  // );

  // Use Object.entries to get key-value pairs and flatMap to flatten arrays and add 
  return Object.entries(obj).flatMap(([category, arr]) =>
    // Ensure arr is an array, then map each item to include category
    Array.isArray(arr)
      ? arr.map(item => ({
          ...item, // Spread existing properties
          category // Add category property
        }))
      : []
  );
}

export function retrieveIdFromTitle(titleStr: string) {
  const parts = titleStr.split("-");
  const lastPart = parts[parts.length - 1];
  return lastPart || null;
}

export function retrieveTitle(titleStr: string) {
  const parts = titleStr.split("-");
  const firstPart = parts[0];
  return firstPart || null;
}