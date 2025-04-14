import { useState, useEffect, useMemo } from 'react';
import { Restaurant, RestaurantFilters } from '../types';
import restaurantsData from '../data/restaurants.json';

// 배열을 랜덤하게 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    // 0부터 i까지의 랜덤한 인덱스 생성
    const j = Math.floor(Math.random() * (i + 1));
    // 랜덤한 위치의 요소와 현재 위치의 요소를 교환
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

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

export function useRestaurants() {
  const [filters, setFilters] = useState<RestaurantFilters>({
    searchTerm: '',
    cuisine: '',
    location: '',
    priceRange: '',
    minRating: 0
  });

  // 모든 레스토랑 데이터를 가져오고 랜덤하게 섞기
  // 페이지가 로드/새로고침될 때마다 자동으로 섞임
  const allRestaurants = useMemo<Restaurant[]>(() => {
    const data = restaurantsData as Restaurant[];
    return shuffleArray(data); // 랜덤하게 섞은 데이터 반환
  }, []); // 빈 의존성 배열로 처음 마운트될 때만 섞음

  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter(restaurant => {
      // 검색어 필터링
      if (filters.searchTerm && !restaurant.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.cuisine.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.mainDish.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !restaurant.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))) {
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