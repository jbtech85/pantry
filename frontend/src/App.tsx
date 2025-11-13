import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage"
import GroceryListPage from "./pages/GroceryListPage";
import RecipeListPage, { recipeListLoader } from "./pages/RecipeListPage";
import RecipePage, { recipeLoader } from "./pages/RecipePage";
import PastItemsPage from "./pages/PastItemsPage";


const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/',
      element: <HomePage />
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
    }
  ]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
