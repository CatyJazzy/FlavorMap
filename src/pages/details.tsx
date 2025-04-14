import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, MapPin, ExternalLink, Phone, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useFavorites } from '../hooks/custom-hook';
import { Restaurant } from '../types';
import { formatPriceRange, generateStarRating } from '../lib/utils';
import restaurantsData from '../data/restaurants.json';

export function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (id) {
      const foundRestaurant = (restaurantsData as Restaurant[]).find(
        (r) => r.id === id
      );
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* 헤더 이미지 */}
      <div className="relative h-64 w-full">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=이미지+없음';
          }}
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white bg-opacity-80 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`bg-white bg-opacity-80 rounded-full ${
              isFavorite(restaurant.id) ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => toggleFavorite(restaurant.id)}
          >
            <Heart className={`h-5 w-5 ${isFavorite(restaurant.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* 레스토랑 정보 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <div className="text-yellow-500 font-bold">
            {restaurant.rating.toFixed(1)}
          </div>
        </div>

        {/* 찜하기 버튼 (크게 표시) */}
        <div className="mb-4">
          <Button
            variant={isFavorite(restaurant.id) ? "default" : "outline"}
            className={`w-full flex items-center justify-center gap-2 ${
              isFavorite(restaurant.id) ? 'bg-red-500 hover:bg-red-600' : 'border-red-500 text-red-500 hover:bg-red-50'
            }`}
            onClick={() => toggleFavorite(restaurant.id)}
          >
            <Heart className={`h-5 w-5 ${isFavorite(restaurant.id) ? 'fill-current' : ''}`} />
            {isFavorite(restaurant.id) ? '찜 목록에서 제거하기' : '찜 목록에 추가하기'}
          </Button>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2">{restaurant.cuisine}</span>
          <span className="mr-2">•</span>
          <span className="mr-2">{formatPriceRange(restaurant.priceRange)}</span>
          <span className="mr-2">•</span>
          <span>{generateStarRating(restaurant.rating)}</span>
        </div>

        <div className="flex items-start mb-4">
          <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
          <span className="text-gray-700">{restaurant.address}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">대표 메뉴</h2>
          <p className="text-gray-700">{restaurant.mainDish}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">소개</h2>
          <p className="text-gray-700">{restaurant.description}</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-6">
          {restaurant.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 예약/웹사이트 버튼 */}
        <div className="flex space-x-4 mb-6">
          {restaurant.reservationLink && (
            <Button
              className="flex-1"
              onClick={() => window.open(restaurant.reservationLink, '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              예약하기
            </Button>
          )}
          {restaurant.websiteLink && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(restaurant.websiteLink, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              웹사이트
            </Button>
          )}
        </div>
        
        {/* 뒤로가기/홈으로 이동 버튼 */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}