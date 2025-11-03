import { useParams, useLoaderData } from "react-router-dom";

type paramsType = {
  params: {
    filter: string,
    filterId: string | null;
  }
}

type keyValType = {
  [key: string]: string;
}

type responseListType {
  categories?: keyValType[]
}



export async function recipeListLoader({ params }: paramsType) {
  let filter;
  switch(params.filter) {
    case 'categories':
      filter = 'categories';
    default:
      filter = 'categories';
  }  

  let filterId;
  switch(params.filterId) {
    default:
      ''
  }  

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}${filterId}.php`) as responseListType;

  // we're always setting this, so no default. handled in first switch case.
  switch(filter) {
    case 'categories':
      return (response.categories);
  }
}


export default function RecipeListPage() {
  const recipeList = useLoaderData();


  return (
    <>
      {recipeList.map((recipe: keyValType) => (
        <div>
          <h3>{recipe.strCategory}</h3>
          <p>{recipe.strCategoryDescription}</p>
          <a>{recipe.strCategory} recipes</a>
        </div>
      ))}
    </>
  )
}