import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantCard } from '../components/restaurant-card';
import { useFavorites } from '../hooks/custom-hook';
import { Restaurant } from '../types';
import restaurantsData from '../data/restaurants.json';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const favoriteRestaurants = useMemo(() => {
    return (restaurantsData as Restaurant[]).filter((restaurant) =>
      favorites.includes(restaurant.id)
    );
  }, [favorites]);

  const handleSelectRestaurant = (id: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">찜한 레스토랑</h1>
      </div>

      {/* 즐겨찾기 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {favoriteRestaurants.length > 0 ? (
          favoriteRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={handleSelectRestaurant}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">아직 찜한 레스토랑이 없어요.</p>
            <button
              className="text-blue-500 font-medium"
              onClick={() => navigate('/')}
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}