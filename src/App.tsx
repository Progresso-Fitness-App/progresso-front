import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DASHBOARD, LOGIN, REGISTER } from './constants/routes';
import { SessionProvider } from './contexts';
import { SessionProtectedRoute } from './components';
import { Loader } from './components/fullScreenLoader';

const LoginView = lazy(() => import('@/views/login'));
const RegisterView = lazy(() => import('@/views/register'));
const DashboardView = lazy(() => import('@/views/dashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>index</div>,
  },
  {
    path: LOGIN,
    element: <LoginView />,
  },
  {
    path: REGISTER,
    element: <RegisterView />,
  },
  {
    path: DASHBOARD,
    element: (
      <SessionProtectedRoute fallbackURL={LOGIN}>
        <DashboardView />
      </SessionProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </Suspense>
  );
}

export default App;
