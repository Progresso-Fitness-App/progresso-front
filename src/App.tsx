import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DASHBOARD, LOGIN, REGISTER, PROFILE } from './constants/routes';
import { SessionProvider } from './contexts';
import { SessionProtectedRoute } from './components';
import { Loader } from './components/fullScreenLoader';
import { ErrorProvider } from './contexts/errorContext';
import ProfileView from './views/profile';

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
  {
    path: PROFILE,
    element: (
      <SessionProtectedRoute fallbackURL={LOGIN}>
        <ProfileView />
      </SessionProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SessionProvider>
        <ErrorProvider>
          <RouterProvider router={router} />
        </ErrorProvider>
      </SessionProvider>
    </Suspense>
  );
}

export default App;
