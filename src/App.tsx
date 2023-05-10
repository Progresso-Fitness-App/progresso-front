import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginView } from '@/views/login.tsx';
import { RegisterView } from '@/views/register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>index</div>,
  },
  {
    path: 'login',
    element: <LoginView />,
  },
  {
    path: 'register',
    element: <RegisterView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
