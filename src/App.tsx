import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage"

const routes = [{
  path: '/',
  element: <HomePage />
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App
