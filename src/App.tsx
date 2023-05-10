import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginView } from "@/views/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>index</div>,
  },
  {
    path: "login",
    element: <LoginView />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
