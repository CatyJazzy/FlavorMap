import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/search-bar';
import { FilterDialog } from '../components/filter-dialog';
import { RestaurantCard } from '../components/restaurant-card';
import { useRestaurants } from '../hooks/custom-hook';
import { RestaurantFilters } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { restaurants, allRestaurants, filters, setFilters } = useRestaurants();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setFilters({ ...filters, searchTerm });
  };

  const handleApplyFilters = (newFilters: RestaurantFilters) => {
    setFilters(newFilters);
  };

  const handleSelectRestaurant = (id: string) => {
    navigate(`/details/${id}`);
  };

  const openFilterDialog = () => {
    setIsFilterOpen(true);
  };

  const closeFilterDialog = () => {
    setIsFilterOpen(false);
  };

  // 레스토랑 통계 계산
  const cuisineCount = allRestaurants.reduce((acc, restaurant) => {
    acc[restaurant.cuisine] = (acc[restaurant.cuisine] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCuisines = Object.entries(cuisineCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cuisine]) => cuisine);

  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-2xl font-bold">Sydney Flavor</h1>
        <p className="text-sm text-gray-500 mt-1">시드니의 {allRestaurants.length}개 맛집을 둘러보세요</p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        onOpenFilter={openFilterDialog} 
        currentFilters={filters} 
      />

      <FilterDialog 
        isOpen={isFilterOpen} 
        onClose={closeFilterDialog} 
        currentFilters={filters} 
        onApplyFilters={handleApplyFilters} 
      />

      {/* 인기 카테고리 */}
      {!filters.searchTerm && !filters.cuisine && !filters.location && !filters.priceRange && filters.minRating === 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-500 mb-2">인기 카테고리:</h2>
          <div className="flex flex-wrap gap-2">
            {topCuisines.map(cuisine => (
              <button 
                key={cuisine}
                className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                onClick={() => setFilters({...filters, cuisine: cuisine as any})}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 활성화된 필터 태그 표시 */}
      {(filters.cuisine || filters.location || filters.priceRange || filters.minRating > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.cuisine && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              음식: {filters.cuisine}
            </span>
          )}
          {filters.location && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              위치: {filters.location}
            </span>
          )}
          {filters.priceRange && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              가격: {filters.priceRange}
            </span>
          )}
          {filters.minRating > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              평점: {filters.minRating}+
            </span>
          )}
        </div>
      )}

      {/* 검색 결과 카운트 */}
      {filters.searchTerm && (
        <p className="text-sm text-gray-500 mb-4">
          '{filters.searchTerm}'에 대한 검색 결과 {restaurants.length}개
        </p>
      )}

      {/* 레스토랑 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              onSelect={handleSelectRestaurant}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
            <button 
              className="mt-2 text-blue-500"
              onClick={handleResetFilters}
            >
              필터 초기화하기
            </button>
          </div>
        )}
      </div>
    </div>
  );

  function handleResetFilters() {
    const resetFilters: RestaurantFilters = {
      searchTerm: '',
      cuisine: '',
      location: '',
      priceRange: '',
      minRating: 0
    };
    setFilters(resetFilters);
  }
}