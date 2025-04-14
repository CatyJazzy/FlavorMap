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
  | '햄버거'
  | '채식'
  | '말레이시안'
  | '바비큐'
  | '아시안'
  | '지중해식'
  | '모던 오스트레일리안'
  | '레바논'
  | '터키'
  | '스위스'
  | '스페인'
  | '브라질리안'
  | '중동'
  | '스칸디나비안'
  | '아르헨티나'
  | '인도네시안'
  | '스코티시'
  | '오스트레일리안'
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
  | 'Chatswood'
  | 'Kings Cross'
  | 'Chippendale'
  | 'Leichhardt'
  | 'Strathfield'
  | 'Cabramatta'
  | 'Woolloomooloo'
  | 'Chinatown';

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