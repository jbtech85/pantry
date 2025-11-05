import { useParams, useLoaderData } from "react-router-dom";

type keyValType = {
  [key: string]: string;
}

type recipeInfoType = {
  meals: {
    0: keyValType[];
  }
}

type paramsType = {
  params: {
    name: string
  }
}


export async function recipeLoader({ params }: paramsType) {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + params.name);
  return response;
}


export default function RecipePage() {
  const { name } = useParams();
  const recipeInfo = useLoaderData();
  const mealInfo = (recipeInfo as recipeInfoType).meals[0];


  let dynamicVar: string = 'strMeal';
  // console.log(mealInfo[dynamicVar]);

  // console.log(mealInfo);

  const ingredients = Object.keys(mealInfo)
    .filter(function(ingredient) {
      // console.log(`a: ingredient is ${ingredient}, val is ${mealInfo[ingredient]} `);
      return (
        ingredient.indexOf('strIngredient') == 0 &&
        mealInfo[ingredient] != null &&
        mealInfo[ingredient] != ""
      )
    })
    .filter((ingredient) => {
      // console.log(`b: ingredient is ${ingredient}, val is ${mealInfo[ingredient]} `);
      return mealInfo[ingredient] != null;
    })
    .reduce((ingredientData, ingredient) => {
      // console.log(`c: ingredient is ${ingredient}, val is ${mealInfo[ingredient]} `);
      return {
        ...ingredientData,
        [ingredient]: mealInfo[ingredient]
      };
    },{});

  // console.log(ingredients);


  return (
    <>
      <h1>Recipe for {name}</h1>
      <p>Info on {mealInfo.strMeal}</p>

      <h2>Ingredients</h2>
      <ul>
        {Object.entries(ingredients).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>
    </>
  )
}


