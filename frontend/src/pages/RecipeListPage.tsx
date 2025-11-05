import { useLoaderData, Link } from "react-router-dom";

type paramsType = {
  params: {
    filter: string,
    filterId: string | null;
  }
};

type keyValType = {
  [key: string]: string;
};

type recipeListObjectType = {
  categories?: keyValType[],
  meals?: keyValType[]
};

type recipeListType = keyValType[];


export async function recipeListLoader({ params }: paramsType) {
  let filter;
  switch(params.filter) {
    case 'categories':
      filter = 'categories';
      break;
    case 'category':
      filter = 'filter';
      break;
    default:
      filter = 'categories';
      break;
  }  

  console.log(`params.filter is ${params.filter}. filter is ${filter}`);

  let filterId = '';

  if(params.filter == 'category'){
    filterId = `?c=${params.filterId}`
  }

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}.php${filterId}`) as recipeListObjectType;
  return response;
}


export default function RecipeListPage() {
  const recipeListObject = useLoaderData();
  console.log(recipeListObject);
  
  let recipeList;
  if(typeof((recipeListObject as recipeListObjectType).categories) != undefined) {
    recipeList = (recipeListObject as recipeListObjectType).categories; 
  } else if(typeof((recipeListObject as recipeListObjectType).meals) != undefined) {
    recipeList = (recipeListObject as recipeListObjectType).meals;
  }
  

  return (
    <>
      <div>sample recipe - <Link to='/recipes/name/Ma%20Po%20Tofu'>Ma Po Tofu</Link></div>

      <ul>
        <li><Link to='/recipes/categories'>Categories</Link></li>

      </ul>

      {(recipeList as recipeListType).map((recipe: keyValType) => (
        <div key={recipe.idCategory}>
          <h3>{recipe.strCategory}</h3>
          <p>{recipe.strCategoryDescription}</p>

          <Link to={`/recipes/category/${recipe.strCategory}`}>{recipe.strCategory} recipes</Link>
        </div>
      ))}
    </>
  )
}