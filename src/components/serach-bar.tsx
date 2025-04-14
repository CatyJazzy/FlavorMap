import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { RestaurantFilters } from '../types';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onOpenFilter: () => void;
  currentFilters: RestaurantFilters;
}

export function SearchBar({ onSearch, onOpenFilter, currentFilters }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.searchTerm);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full space-x-2 mb-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="레스토랑, 음식, 지역 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
      <Button variant="outline" size="icon" onClick={onOpenFilter}>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
      <Button onClick={handleSearch}>검색</Button>
    </div>
  );
}