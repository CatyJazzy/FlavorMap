import { useState } from 'react';
import { Home, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabChange = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <header className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-10 max-w-md mx-auto">
      <div className="flex h-full">
        <button
          className={`flex-1 flex flex-col items-center justify-center ${
            activeTab === '/' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('/')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">홈</span>
        </button>
        <button
          className={`flex-1 flex flex-col items-center justify-center ${
            activeTab === '/favorites' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('/favorites')}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">찜한 가게</span>
        </button>
      </div>
    </header>
  );
}