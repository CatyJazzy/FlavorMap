import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/home';
import { DetailsPage } from './pages/details';
import { FavoritesPage } from './pages/favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'details/:id',
        element: <DetailsPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      }
    ],
  },
]);