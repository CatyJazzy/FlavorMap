import { useEffect } from 'react';
import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // 로컬 스토리지에서 즐겨찾기 목록 불러오기
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 즐겨찾기 추가/제거 함수
  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}

// src/hooks/use-restaurants.ts
import { useState, useMemo } from 'react';
import { Restaurant, RestaurantFilters } from '../types';
import restaurantsData from '../data/restaurants.json';

export function useRestaurants() {
  const [filters, setFilters] = useState<RestaurantFilters>({
    searchTerm: '',
    cuisine: '',
    location: '',
    priceRange: '',
    minRating: 0
  });

  const allRestaurants = useMemo<Restaurant[]>(() => {
    return restaurantsData as Restaurant[];
  }, []);

  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter(restaurant => {
      // 검색어 필터링
      if (filters.searchTerm && !restaurant.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.cuisine.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.mainDish.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.location.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // 음식 종류 필터링
      if (filters.cuisine && restaurant.cuisine !== filters.cuisine) {
        return false;
      }

      // 위치 필터링
      if (filters.location && restaurant.location !== filters.location) {
        return false;
      }

      // 가격대 필터링
      if (filters.priceRange && restaurant.priceRange !== filters.priceRange) {
        return false;
      }

      // 최소 평점 필터링
      if (restaurant.rating < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [allRestaurants, filters]);

  return {
    restaurants: filteredRestaurants,
    allRestaurants,
    filters,
    setFilters
  };
}