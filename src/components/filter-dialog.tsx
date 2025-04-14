import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Cuisine, Location, PriceRange, RestaurantFilters } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: RestaurantFilters;
  onApplyFilters: (filters: RestaurantFilters) => void;
}

export function FilterDialog({ isOpen, onClose, currentFilters, onApplyFilters }: FilterDialogProps) {
  const [filters, setFilters] = useState<RestaurantFilters>(currentFilters);

  // 필터 변경 시 로컬 상태 업데이트
  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  // 필터 적용 핸들러
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    const resetFilters: RestaurantFilters = {
      searchTerm: filters.searchTerm, // 검색어는 유지
      cuisine: '',
      location: '',
      priceRange: '',
      minRating: 0
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const cuisineOptions: Cuisine[] = [
    '한식', '일식', '중식', '태국', '이탈리안', 
    '프렌치', '그리스', '멕시칸', '인도', '베트남',
    '카페', '브런치', '해산물', '스테이크', '베이커리',
    '햄버거', '채식', '말레이시안', '바비큐', '아시안',
    '지중해식', '모던 오스트레일리안', '레바논', '터키',
    '스위스', '스페인', '브라질리안', '중동', '스칸디나비안',
    '아르헨티나', '인도네시안', '스코티시', '오스트레일리안', '기타'
  ];

  const locationOptions: Location[] = [
    'CBD', 'Darling Harbour', 'Circular Quay', 'The Rocks', 
    'Surry Hills', 'Newtown', 'Bondi', 'Manly', 'Parramatta', 
    'Chatswood', 'Kings Cross', 'Chippendale', 'Leichhardt',
    'Strathfield', 'Cabramatta', 'Woolloomooloo', 'Chinatown'
  ];

  const priceOptions: PriceRange[] = ['$', '$$', '$$$', '$$$$'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>필터 설정</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="cuisine" className="w-full mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="cuisine">음식 종류</TabsTrigger>
            <TabsTrigger value="location">위치</TabsTrigger>
            <TabsTrigger value="price">가격대</TabsTrigger>
          </TabsList>

          <TabsContent value="cuisine" className="space-y-4">
            <ScrollArea className="h-60 pr-4">
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Button
                    key={cuisine}
                    variant={filters.cuisine === cuisine ? "default" : "outline"}
                    onClick={() => setFilters({...filters, cuisine: filters.cuisine === cuisine ? '' : cuisine})}
                    className="text-sm mb-2"
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <ScrollArea className="h-60 pr-4">
              <div className="flex flex-wrap gap-2">
                {locationOptions.map((location) => (
                  <Button
                    key={location}
                    variant={filters.location === location ? "default" : "outline"}
                    onClick={() => setFilters({...filters, location: filters.location === location ? '' : location})}
                    className="text-sm mb-2"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="price" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {priceOptions.map((price) => (
                <Button
                  key={price}
                  variant={filters.priceRange === price ? "default" : "outline"}
                  onClick={() => setFilters({...filters, priceRange: filters.priceRange === price ? '' : price})}
                  className="min-w-12 text-center"
                >
                  {price}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <Label htmlFor="rating" className="mb-1 block">최소 평점</Label>
          <div className="flex items-center space-x-2">
            <input
              id="rating"
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8 text-center">{filters.minRating}</span>
          </div>
        </div>

        <DialogFooter className="mt-6 flex space-x-2">
          <Button variant="outline" onClick={handleResetFilters} className="flex-1">초기화</Button>
          <Button onClick={handleApplyFilters} className="flex-1">적용</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}