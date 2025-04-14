// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceRange(priceRange: string) {
  switch (priceRange) {
    case '$':
      return '저렴 ($)';
    case '$$':
      return '적당 ($$)';
    case '$$$':
      return '고급 ($$$)';
    case '$$$$':
      return '매우 고급 ($$$$)';
    default:
      return priceRange;
  }
}

export function generateStarRating(rating: number) {
  // 5점 만점 기준으로 별 아이콘 생성 (소수점 반올림)
  const roundedRating = Math.round(rating);
  return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
}