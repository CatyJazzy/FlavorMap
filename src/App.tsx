import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/header';

function App() {
  const location = useLocation();
  // 상세 페이지에서는 하단 헤더 숨기기 (화면을 더 넓게 사용하기 위함)
  const isDetailsPage = location.pathname.includes('/details');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모바일 뷰에 맞게 최대 너비 제한 */}
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        <Outlet />
      </main>
      {!isDetailsPage && (
        <div className="max-w-md mx-auto">
          <Header />
        </div>
      )}
    </div>
  );
}

export default App;