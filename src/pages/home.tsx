import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/serach-bar';
import { FilterDialog } from '../components/filter-dialog';
import { RestaurantCard } from '../components/restaurant-card';
import { useRestaurants } from '../hooks/custom-hook';
import { RestaurantFilters } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { restaurants, filters, setFilters } = useRestaurants();
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

  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sydney Flavor</h1>
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
          </div>
        )}
      </div>
    </div>
  );
}