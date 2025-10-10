import { useActionState } from 'react'

// function to handle saving ingredient to user pantry
const addIngredientToPantry = async () => {
  // TODO: add actual logic
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const IngredientForm = () => {
  const ingredientInputStyle = "outline-1 outline-gray-400 ml-2 focus:outline-2 focus: -outline-offset-2 focus:outline-orange-300 px-2 py-1"

  const [result, addIngredient, isPending] = useActionState(
    async (prevState, formData) => {
      const ingredient = formData.get("ingredient");

      // make sure we have an ingredient
      if(!ingredient) {
        return { 
          type: "error",
          message: "Please add an ingredient"
        };
      }

      await addIngredientToPantry();

      return {
        type: "success",
        message: "Ingredient added"
      }
    },
    null
  )

  return (
    <form action={addIngredient}
      className="mx-auto max-w-7xl px-4 py-10">
      <label htmlFor="ingredient" className="text-sm/6 text-gray-900">
        <span className="font-medium">Ingredient: </span></label>
        {/* TODO: add rotating placeholder, eg Salt, then Celery.  Maybe pull from real ingredients somewhere else? */}
        {/* TODO: Confirm versus known ingredients. Consider checking the API we eventually pull recipes from */}
        {/* TODO: Let user know they already added ingredient.  Ask if they want to add/increase quantity */}
        
      <input type="text" name="ingredient"
        className={ingredientInputStyle} />

      <button type="submit" value="Add to pantry" className="
          outline-1 outline-gray-400 ml-4 rounded-md bg-orange-200 px-3 py-1 text-orange-950 text-sm font-medium hover:bg-orange-400">Add to pantry</button>
      
    </form>
  )
}
export default IngredientForm