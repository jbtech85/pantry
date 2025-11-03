import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage"
import GroceryList from "./components/GroceryList/GroceryList";
import RecipeListPage, { recipeListLoader } from "./pages/RecipeListPage";
import RecipePage, { recipeLoader } from "./pages/RecipePage";


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
      element: <GroceryList />
    }, {
      path: '/recipes',
      element: <RecipeListPage />

    }, {
      path: '/recipes/list/:filter/:filterId',
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
