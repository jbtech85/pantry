export async function recipeListLoader({ params }: paramsType) {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/' + params.name);
  return response;
}

export default function RecipeListPage() {
  return (
    <div>RecipeListPage</div>
  )
}