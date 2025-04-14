import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { Restaurant } from '../types';
import { useFavorites } from '../hooks/custom-hook';
import { generateStarRating, formatPriceRange } from '../lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (id: string) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="w-full mb-4 overflow-hidden cursor-pointer"
      onClick={() => onSelect(restaurant.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {/* 이미지 오류 발생 시 대체 이미지 표시 */}
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            <span className="text-center px-4">
              <p className="font-medium">이미지를 표시할 수 없습니다</p>
              <p className="text-sm mt-1">{restaurant.name}</p>
            </span>
          </div>
        ) : (
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full bg-white bg-opacity-80 ${isFavorite(restaurant.id) ? 'text-red-500' : 'text-gray-500'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(restaurant.id);
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite(restaurant.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{restaurant.name}</CardTitle>
            <CardDescription className="text-xs">
              {restaurant.cuisine} · {restaurant.location} · {formatPriceRange(restaurant.priceRange)}
            </CardDescription>
          </div>
          <div className="text-yellow-500 text-sm font-semibold">
            {restaurant.rating.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{restaurant.mainDish}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {restaurant.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between text-sm text-gray-500">
        <span>{generateStarRating(restaurant.rating)}</span>
        <span>{restaurant.address.split(',')[0]}</span>
      </CardFooter>
    </Card>
  );
}