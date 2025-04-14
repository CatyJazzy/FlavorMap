// src/types/index.ts
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export type Cuisine = 
  | '한식' 
  | '일식' 
  | '중식' 
  | '태국' 
  | '이탈리안' 
  | '프렌치' 
  | '그리스' 
  | '멕시칸' 
  | '인도' 
  | '베트남'
  | '카페' 
  | '브런치' 
  | '해산물'
  | '스테이크'
  | '베이커리'
  | '기타';

export type Location = 
  | 'CBD' 
  | 'Darling Harbour' 
  | 'Circular Quay' 
  | 'The Rocks' 
  | 'Surry Hills' 
  | 'Newtown' 
  | 'Bondi' 
  | 'Manly'
  | 'Parramatta'
  | 'Chatswood';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: Cuisine;
  mainDish: string;
  location: Location;
  address: string;
  priceRange: PriceRange;
  rating: number;
  imageUrl: string;
  reservationLink?: string;
  websiteLink?: string;
  description: string;
  tags: string[];
}

export interface RestaurantFilters {
  searchTerm: string;
  cuisine: Cuisine | '';
  location: Location | '';
  priceRange: PriceRange | '';
  minRating: number;
}

export interface FavoritesState {
  favorites: string[];
}