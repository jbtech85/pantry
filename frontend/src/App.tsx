import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage"
import GroceryListPage from "./pages/GroceryListPage";
import RecipeListPage, { recipeListLoader } from "./pages/RecipeListPage";
import RecipePage, { recipeLoader } from "./pages/RecipePage";
import PastItemsPage from "./pages/PastItemsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./context/userContext";
import ErrorPage from "./pages/ErrorPage";

const routes = [{
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />
    }, {
      path: '/grocery-list',
      element: <GroceryListPage />
    }, {
      path: '/past-items',
      element: <PastItemsPage />
    }, {
      path: '/recipes/:filter?/:filterId?',
      element: <RecipeListPage />,
      loader: recipeListLoader
    }, {
      path: '/recipes/name/:name',
      element: <RecipePage />,
      loader: recipeLoader
    }, {
      path: '/signup',
      element: <SignupPage />
    }, {
      path: '/login',
      element: <LoginPage />
    }, {
      path: '*',
      element: <NotFoundPage />
    }
  ]
}]

const router = createBrowserRouter(routes as any);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>      
  );
}

export default App
