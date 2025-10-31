import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage"
import GroceryList from "./components/GroceryList/GroceryList";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";

type paramsType = {
  params: {
    name: string
  }
}

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },  {
      path: '/grocery-list',
      element: <GroceryList />
    },  {
      path: '/recipes',
      element: <RecipeListPage />
    },  {
      path: '/recipes/:name',
      element: <RecipePage />,
      loader: async function({ params }: paramsType) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + params.name);
        return response;
      }
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
